"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type SlideData = {
  key: string;
  title: string;
  tagline: string;
  href: string;
  /** A drawing, used when there is no photo. */
  art: ReactNode;
  /** A photo uploaded in the Studio. Takes the place of the drawing. */
  image?: { src: string; alt: string };
};

const SLIDE_MS = 5000;

export function HeroSlider({ slides }: { slides: SlideData[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const swipeStart = useRef<number | null>(null);

  const playing = count > 1 && !userPaused && !hovering && !keyboardFocus && !tabHidden && !reducedMotion;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setTabHidden(document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [playing, index, count]);

  if (count === 0) return null;

  const go = (next: number) => setIndex((next + count) % count);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") go(index - 1);
    if (event.key === "ArrowRight") go(index + 1);
  };

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="What we print"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={(event) => {
        if (event.target.matches(":focus-visible")) setKeyboardFocus(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false);
      }}
      onKeyDown={onKeyDown}
    >
      <div
        className="slides"
        aria-live={playing ? "off" : "polite"}
        onPointerDown={(event) => {
          swipeStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (swipeStart.current === null) return;
          const distance = event.clientX - swipeStart.current;
          swipeStart.current = null;
          if (Math.abs(distance) > 40) go(distance < 0 ? index + 1 : index - 1);
        }}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.key}
            className={`slide${i === index ? " is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            inert={i !== index}
          >
            <div className="slide-art">
              {slide.image ? (
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 560px"
                  priority={i === 0}
                  className="slide-photo"
                />
              ) : (
                slide.art
              )}
            </div>
            <div className="slide-cap">
              <div>
                <strong>{slide.title}</strong>
                <span>{slide.tagline}</span>
              </div>
              <Link className="cap-link" href={slide.href}>
                See details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="slider-bar">
          <div className="dots" role="group" aria-label="Choose a slide">
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                className={`dot${i === index ? " is-active" : ""}`}
                aria-label={`Show slide ${i + 1}: ${slide.title}`}
                aria-current={i === index}
                onClick={() => go(i)}
              >
                <span className="track">
                  {/* A new key restarts the fill animation each time the slide changes or autoplay resumes. */}
                  <span
                    key={`${index}-${playing}`}
                    className={`bar${i === index && playing ? " is-running" : ""}${i === index && !playing ? " is-full" : ""}`}
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                  />
                </span>
              </button>
            ))}
          </div>
          <div className="ctrls">
            <button type="button" className="ctrl" aria-label="Previous slide" onClick={() => go(index - 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            {!reducedMotion && (
              <button
                type="button"
                className="ctrl"
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                aria-pressed={userPaused}
                onClick={() => setUserPaused((paused) => !paused)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {userPaused ? (
                    <path className="solid" d="M8 5v14l11-7z" />
                  ) : (
                    <>
                      <rect className="solid" x="6.5" y="5" width="4" height="14" rx="1" />
                      <rect className="solid" x="13.5" y="5" width="4" height="14" rx="1" />
                    </>
                  )}
                </svg>
              </button>
            )}
            <button type="button" className="ctrl" aria-label="Next slide" onClick={() => go(index + 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
