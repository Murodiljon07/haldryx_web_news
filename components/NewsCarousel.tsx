"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NewsItem } from "@/lib/api";
import { excerpt, formatDateTime } from "@/lib/format";

const INTERVAL_MS = 6000;

export default function NewsCarousel({ items }: { items: NewsItem[] }) {
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count < 2 || paused) return;
    const t = setInterval(() => {
      setIndex((v) => (v + 1) % count);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [count, paused]);

  if (count === 0) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <div
      className="news-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="karusel"
    >
      <div
        className="news-carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((item) => (
          <div className="news-carousel-slide" key={item.code}>
            <div className="banner">
              {item.photoFileId ? (
                <img
                  src={`/media/${item.photoFileId}`}
                  alt={item.title}
                  loading="eager"
                />
              ) : (
                <span>HALDRYX</span>
              )}
            </div>
            <div className="card-body">
              {item.createdAt && (
                <p
                  className="muted"
                  style={{ margin: 0, fontSize: "0.82rem", letterSpacing: 0.5 }}
                >
                  🗓 {formatDateTime(item.createdAt)}
                </p>
              )}
              <h3>{item.title}</h3>
              <p className="excerpt">{excerpt(item.body, 220)}</p>
              <div className="carousel-cta">
                <Link href={`/news/${item.code}`}>Batafsil o‘qish →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="news-carousel-nav prev"
            aria-label="Oldingi yangilik"
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="news-carousel-nav next"
            aria-label="Keyingi yangilik"
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
          <div className="news-carousel-dots">
            {items.map((n, i) => (
              <button
                key={n.code}
                type="button"
                aria-label={`${i + 1}-yangilik`}
                aria-current={i === index}
                className={i === index ? "active" : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}