"use client";

import { useState, type FormEvent } from "react";
import { waLink } from "@/lib/whatsapp";

export function ContactForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) {
      setError("Write a short message so we know how to help.");
      document.getElementById("message")?.focus();
      return;
    }
    setError("");
    const text = `Hi Naipack, ${message.trim()}${name.trim() ? `\n\n${name.trim()}` : ""}`;
    window.open(waLink(whatsappNumber, text), "_blank", "noopener");
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="contact-name">
          Your name <span className="opt">(optional)</span>
        </label>
        <input
          id="contact-name"
          className="input"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="message">Your message</label>
        <textarea
          id="message"
          className="textarea tall"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "err-message" : undefined}
        />
        {error && (
          <p className="err" id="err-message" role="alert">
            {error}
          </p>
        )}
      </div>
      <button className="btn btn-forest" type="submit">
        Send on WhatsApp
      </button>
    </form>
  );
}
