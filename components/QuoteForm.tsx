"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { waLink } from "@/lib/whatsapp";

export type QuoteProduct = {
  slug: string;
  title: string;
  tagline: string;
  options: { label: string; choices: string[] }[];
};

type Errors = { product?: string; qty?: string; biz?: string };

function formatDate(value: string) {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function QuoteForm({
  products,
  whatsappNumber,
  initialSlug,
}: {
  products: QuoteProduct[];
  whatsappNumber: string;
  initialSlug?: string;
}) {
  const [slug, setSlug] = useState(products.some((p) => p.slug === initialSlug) ? (initialSlug as string) : "");
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [qty, setQty] = useState("");
  const [needed, setNeeded] = useState("");
  const [art, setArt] = useState("");
  const [delivery, setDelivery] = useState("");
  const [notes, setNotes] = useState("");
  const [biz, setBiz] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sentMessage, setSentMessage] = useState("");
  const [status, setStatus] = useState("");
  const [minDate, setMinDate] = useState<string | undefined>();

  // Set after load so the server and browser agree on the first render.
  useEffect(() => setMinDate(new Date().toISOString().slice(0, 10)), []);

  const product = products.find((p) => p.slug === slug);

  const message = useMemo(() => {
    const lines = ["Hi Naipack, I'd like a quote.", `Item: ${product?.title ?? "Not chosen"}`];
    if (qty.trim()) lines.push(`Quantity: ${qty.trim()}`);
    const chosen = (product?.options ?? []).filter((o) => picks[o.label]).map((o) => `${o.label}: ${picks[o.label]}`);
    if (chosen.length) lines.push(`Options: ${chosen.join(", ")}`);
    if (needed) lines.push(`Needed by: ${formatDate(needed)}`);
    if (art) lines.push(`Logo or design: ${art}`);
    if (delivery) lines.push(`Order: ${delivery}`);
    if (notes.trim()) lines.push(`Details: ${notes.trim()}`);
    if (biz.trim()) lines.push(`Business: ${biz.trim()}`);
    if (name.trim()) lines.push(`Name: ${name.trim()}`);
    return lines.join("\n");
  }, [product, picks, qty, needed, art, delivery, notes, biz, name]);

  const summary: [string, string][] = [
    ["Item", product?.title ?? ""],
    ["Options", (product?.options ?? []).filter((o) => picks[o.label]).map((o) => `${o.label}: ${picks[o.label]}`).join(", ")],
    ["Quantity", qty.trim()],
    ["Needed by", formatDate(needed)],
    ["Logo or design", art],
    ["Order", delivery],
    ["Business", biz.trim()],
    ["Name", name.trim()],
    ["Details", notes.trim()],
  ];
  const required = new Set(["Item", "Quantity", "Business"]);

  function choose(next: string) {
    setSlug(next);
    setPicks({});
    setErrors((e) => ({ ...e, product: undefined }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Errors = {};
    if (!product) next.product = "Choose what you need.";
    if (!/^\d+$/.test(qty.trim()) || Number(qty) < 1) next.qty = "Enter the number you need, for example 200.";
    if (!biz.trim()) next.biz = "Enter your business name so we know who to reply to.";
    setErrors(next);
    const firstBad = next.product ? "product-0" : next.qty ? "qty" : next.biz ? "biz" : null;
    if (firstBad) {
      document.getElementById(firstBad)?.focus();
      return;
    }
    window.open(waLink(whatsappNumber, message), "_blank", "noopener");
    setSentMessage(message);
    setTimeout(() => document.getElementById("sent")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Message copied.");
    } catch {
      setStatus("Copy did not work. Select the text in the box below the form instead.");
      setSentMessage(message);
    }
  }

  return (
    <div className="wrap layout-quote">
      <form id="quote-form" onSubmit={onSubmit} noValidate>
        <fieldset className="group">
          <legend>
            <span className="badge-n">1</span> What do you need?
          </legend>
          <p className="hint">Pick one. You can ask about more in the chat afterwards.</p>
          <div className="choices">
            {products.map((p, i) => (
              <label className="choice" key={p.slug}>
                <input
                  id={`product-${i}`}
                  type="radio"
                  name="product"
                  value={p.slug}
                  checked={slug === p.slug}
                  onChange={() => choose(p.slug)}
                />
                <span className="choice-tile">
                  <strong>{p.title}</strong>
                  {p.tagline && <span>{p.tagline}</span>}
                </span>
              </label>
            ))}
          </div>
          {errors.product && (
            <p className="err" role="alert">
              {errors.product}
            </p>
          )}
        </fieldset>

        <fieldset className="group">
          <legend>
            <span className="badge-n">2</span> Choose your options
          </legend>
          <p className="hint">Not sure about something? Leave it and we will advise.</p>
          {product && product.options.length > 0 ? (
            <div className="grid-2">
              {product.options.map((option) => (
                <div className="field" key={option.label}>
                  <label htmlFor={`opt-${option.label}`}>{option.label}</label>
                  <select
                    id={`opt-${option.label}`}
                    className="select"
                    value={picks[option.label] ?? ""}
                    onChange={(e) => setPicks((prev) => ({ ...prev, [option.label]: e.target.value }))}
                  >
                    <option value="">Not sure yet</option>
                    {option.choices.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ) : (
            <p className="options-empty">
              {product ? "Tell us what you need in the notes below." : "Choose a product above to see its options."}
            </p>
          )}
        </fieldset>

        <fieldset className="group">
          <legend>
            <span className="badge-n">3</span> About your order
          </legend>
          <div className="grid-2">
            <div className="field">
              <label htmlFor="qty">Quantity</label>
              <input
                id="qty"
                className="input"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 200"
                autoComplete="off"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                aria-invalid={errors.qty ? true : undefined}
                aria-describedby={errors.qty ? "err-qty" : undefined}
              />
              {errors.qty && (
                <p className="err" id="err-qty" role="alert">
                  {errors.qty}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="needed">
                Needed by <span className="opt">(optional)</span>
              </label>
              <input
                id="needed"
                className="input"
                type="date"
                min={minDate}
                value={needed}
                onChange={(e) => setNeeded(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <span className="label" id="art-label">
              Do you have a logo or design ready?
            </span>
            <div className="radio-row" role="radiogroup" aria-labelledby="art-label">
              {[
                ["Yes, I will send it on WhatsApp", "Yes, I'll send it"],
                ["No, I need advice", "No, I need advice"],
              ].map(([value, label]) => (
                <label className="pill" key={value}>
                  <input type="radio" name="art" value={value} checked={art === value} onChange={() => setArt(value)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <span className="label" id="get-label">
              How will you get your order?
            </span>
            <div className="radio-row" role="radiogroup" aria-labelledby="get-label">
              {["Collect from the shop", "Ask about delivery"].map((value) => (
                <label className="pill" key={value}>
                  <input
                    type="radio"
                    name="delivery"
                    value={value}
                    checked={delivery === value}
                    onChange={() => setDelivery(value)}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="notes">
              Anything else? <span className="opt">(optional)</span>
            </label>
            <textarea
              id="notes"
              className="textarea"
              placeholder="Colours, wording, sizes, or a reference you like"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="group">
          <legend>
            <span className="badge-n">4</span> Your details
          </legend>
          <div className="grid-2">
            <div className="field">
              <label htmlFor="biz">Business name</label>
              <input
                id="biz"
                className="input"
                type="text"
                autoComplete="organization"
                value={biz}
                onChange={(e) => setBiz(e.target.value)}
                aria-invalid={errors.biz ? true : undefined}
                aria-describedby={errors.biz ? "err-biz" : undefined}
              />
              {errors.biz && (
                <p className="err" id="err-biz" role="alert">
                  {errors.biz}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="name">
                Your name <span className="opt">(optional)</span>
              </label>
              <input
                id="name"
                className="input"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="submit-row">
            <button className="btn btn-forest" type="submit">
              Send on WhatsApp
            </button>
          </div>
          <p className="form-note">
            WhatsApp opens with your request filled in. Attach your logo in the chat before you send it.
          </p>
        </fieldset>

        {sentMessage && (
          <div className="confirm" id="sent">
            <h3>Your request is ready in WhatsApp</h3>
            <p>If WhatsApp did not open, copy this message and send it to us.</p>
            <pre>{sentMessage}</pre>
          </div>
        )}
      </form>

      <aside className="summary" aria-label="Your request">
        <h2>Your request</h2>
        <dl>
          {summary
            .filter(([label, value]) => value || required.has(label))
            .map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd className={value ? undefined : "empty"}>{value || "Not filled in yet"}</dd>
              </div>
            ))}
        </dl>
        <button className="btn btn-kraft" type="submit" form="quote-form">
          Send on WhatsApp
        </button>
        <button className="btn btn-outline copy" type="button" onClick={copy}>
          Copy message
        </button>
        <p className="status" role="status">
          {status}
        </p>
      </aside>
    </div>
  );
}
