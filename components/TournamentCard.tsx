import Link from "next/link";
import type { TournamentItem } from "@/lib/api";
import {
  capacityText,
  excerpt,
  formatDateTime,
  modeLabel,
  statusLabel,
} from "@/lib/format";

export default function TournamentCard({ item }: { item: TournamentItem }) {
  return (
    <Link href={`/tournaments/${item.code}`} className="card-link">
      <article className="card">
        <div className="banner">
          {item.bannerFileId ? (
            <img
              src={`/media/${item.bannerFileId}`}
              alt={item.name}
              loading="lazy"
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
          <p className="muted" style={{ margin: "4px 0" }}>
            {item.game} · {modeLabel(item.mode)}
          </p>
          <p style={{ margin: "4px 0", color: "var(--text-soft)" }}>
            {capacityText(item)}
          </p>
          {item.scheduledStart && (
            <p style={{ margin: "4px 0", color: "var(--text-soft)" }}>
              🕒 {formatDateTime(item.scheduledStart)}
            </p>
          )}
          <p className="excerpt" style={{ marginTop: 10 }}>
            {excerpt(item.description, 160)}
          </p>
          <p className="muted" style={{ marginTop: 14, fontSize: "0.85rem" }}>
            Kod: <code>{item.code}</code>
          </p>
        </div>
      </article>
    </Link>
  );
}