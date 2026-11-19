"use client";

import { useEffect, useState } from "react";
import type { TournamentItem } from "@/lib/api";
import {
  capacityText,
  excerpt,
  formatDateTime,
  modeLabel,
  statusLabel,
} from "@/lib/format";
import Link from "next/dist/client/link";

const INTERVAL_MS = 6000;

export default function TournamentCarousel({
  items,
}: {
  items: TournamentItem[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = items.length;
  const current = count > 0 ? index % count : 0;

  useEffect(() => {
    if (count < 2 || paused) return;
    const t = setInterval(() => {
      setIndex((v) => (v + 1) % count);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [count, paused]);

  if (count === 0) return null;
  const item = items[current];

  return (
  <div
    className="carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)}
    onBlur={() => setPaused(false)}
    aria-roledescription="karusel"
  >
    <Link href={`/tournaments/${item.code}`} className="card-link">
      <article className="card carousel-slide" aria-live="polite">
        <div className="banner">
          {item.bannerFileId ? (
            <img
              src={`/media/${item.bannerFileId}`}
              alt={item.name}
              loading="eager"
            />
          ) : (
            <span>{item.game}</span>
          )}
        </div>
        <div className="card-body">
          <span className={`badge ${item.status}`}>
            {statusLabel(item.status)}
          </span>
          <h3>{item.name}</h3>
          <p className="muted">
            {item.game} · {modeLabel(item.mode)} · {capacityText(item)}
          </p>
          {item.scheduledStart && (
            <p>🕒 {formatDateTime(item.scheduledStart)}</p>
          )}
          <p className="excerpt" style={{ marginTop: 14 }}>
            {excerpt(item.description, 260)}
          </p>
          <p className="muted" style={{ fontSize: "0.85rem", marginTop: 18 }}>
            Kod: <code>{item.code}</code> · Batafsil →
          </p>
        </div>
      </article>
    </Link>

    {count > 1 && (
      <div className="carousel-controls">
        {items.map((t, i) => (
          <button
            key={t.code}
            type="button"
            aria-label={`${i + 1}-turnir`}
            aria-current={i === current}
            className={i === current ? "active" : undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    )}
  </div>
);
}