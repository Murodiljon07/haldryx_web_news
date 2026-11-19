"use client";

import { useMemo, useState } from "react";
import type { PlayerItem } from "@/lib/api";

export default function PlayerList({ players }: { players: PlayerItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return players;
    return players.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.games.some((g) => g.toLowerCase().includes(q)),
    );
  }, [query, players]);

  return (
    <>
      <input
        className="search"
        type="search"
        placeholder="Ism, viloyat yoki o‘yin bo‘yicha qidirish"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="O‘yinchilarni qidirish"
      />
      <p className="muted">Topildi: {filtered.length}</p>

      {filtered.length === 0 ? (
        <p className="muted" style={{ marginTop: 16 }}>
          Hech narsa topilmadi.
        </p>
      ) : (
        <div className="grid" style={{ marginTop: 16 }}>
          {filtered.map((player, index) => (
            <article key={`${player.name}-${index}`} className="card player">
              <h3>{player.name}</h3>
              <p className="muted" style={{ margin: "4px 0 12px" }}>
                {player.region}
              </p>
              <div>
                {player.games.map((game) => (
                  <span key={game} className="tag">
                    {game}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}