import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getTournamentDetail,
  getTournaments,
  type TournamentDetail,
} from "@/lib/api";
import {
  capacityText,
  formatDateTime,
  modeLabel,
  statusLabel,
} from "@/lib/format";

export const revalidate = 30;

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const t = await loadTournament(code);
  return {
    title: t ? `${t.name} — HALDRYX` : "Turnir topilmadi — HALDRYX",
  };
}

async function loadTournament(code: string): Promise<TournamentDetail | null> {
  const detail = await getTournamentDetail(code);
  if (detail) return detail;

  // Fallback: umumiy ro'yxatdan topish
  const all = await getTournaments();
  const found = all.find((t) => t.code === code);
  if (!found) return null;
  return found as TournamentDetail;
}

export default async function TournamentDetailPage({ params }: Props) {
  const { code } = await params;
  const t = await loadTournament(code);
  if (!t) notFound();

  const participants = t.participants ?? [];
  const matches = t.matches ?? [];
  const liveMatches = matches.filter((m) => m.status === "live");
  const upcoming = matches
    .filter((m) => m.status === "pending")
    .slice(0, 6);
  const finished = matches
    .filter((m) => m.status === "finished")
    .slice(-6)
    .reverse();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="page-head tournament-hero">
        <div className="container">
          <Link href="/tournaments" className="back-link">
            ← Turnirlarga qaytish
          </Link>

          <div className="tournament-hero-grid">
            <div className="tournament-hero-media">
              <div className="banner">
                {t.bannerFileId ? (
                  <img
                    src={`/media/${t.bannerFileId}`}
                    alt={t.name}
                    loading="eager"
                  />
                ) : (
                  <span>{t.game}</span>
                )}
              </div>
            </div>

            <div className="tournament-hero-info">
              <span className={`badge ${t.status}`}>
                {statusLabel(t.status)}
              </span>
              <h1>{t.name}</h1>
              <p className="muted" style={{ marginTop: 6 }}>
                {t.game} · {modeLabel(t.mode)} · {capacityText(t)}
              </p>

              <div className="meta-grid">
                {t.scheduledStart && (
                  <div className="meta-item">
                    <span className="meta-label">Boshlanish</span>
                    <span className="meta-value">
                      🕒 {formatDateTime(t.scheduledStart)}
                    </span>
                  </div>
                )}
                {t.currentRound && (
                  <div className="meta-item">
                    <span className="meta-label">Joriy bosqich</span>
                    <span className="meta-value">{t.currentRound}</span>
                  </div>
                )}
                {t.totalRounds != null && (
                  <div className="meta-item">
                    <span className="meta-label">Bosqichlar</span>
                    <span className="meta-value">
                      {t.totalRounds} ta
                    </span>
                  </div>
                )}
                <div className="meta-item">
                  <span className="meta-label">Kod</span>
                  <span className="meta-value">
                    <code>{t.code}</code>
                  </span>
                </div>
              </div>

              {t.prize && (
                <p className="prize-line">
                  🏆 <strong>Mukofot:</strong> {t.prize}
                </p>
              )}

              {t.streamUrl && (
                <a
                  className="btn-gold"
                  href={t.streamUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Jonli translyatsiya
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- JONLI HOLAT ---------- */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>Turnir qanday ketyapti</h2>

          <div className="live-grid">
            <div className="live-card">
              <div className="live-card-head">
                <span className="badge started">Jonli</span>
                <span className="muted" style={{ fontSize: "0.85rem" }}>
                  {liveMatches.length} ta o‘yin
                </span>
              </div>
              {liveMatches.length === 0 ? (
                <p className="muted" style={{ marginTop: 10 }}>
                  Hozircha jonli o‘yin yo‘q.
                </p>
              ) : (
                <ul className="match-list">
                  {liveMatches.map((m) => (
                    <MatchRow key={m.id} match={m} highlight />
                  ))}
                </ul>
              )}
            </div>

            <div className="live-card">
              <div className="live-card-head">
                <span className="badge open">Navbatda</span>
                <span className="muted" style={{ fontSize: "0.85rem" }}>
                  {upcoming.length} ta o‘yin
                </span>
              </div>
              {upcoming.length === 0 ? (
                <p className="muted" style={{ marginTop: 10 }}>
                  Rejalashtirilgan o‘yin yo‘q.
                </p>
              ) : (
                <ul className="match-list">
                  {upcoming.map((m) => (
                    <MatchRow key={m.id} match={m} />
                  ))}
                </ul>
              )}
            </div>

            <div className="live-card">
              <div className="live-card-head">
                <span className="badge">Yakunlangan</span>
                <span className="muted" style={{ fontSize: "0.85rem" }}>
                  {finished.length} ta o‘yin
                </span>
              </div>
              {finished.length === 0 ? (
                <p className="muted" style={{ marginTop: 10 }}>
                  Hali yakunlangan o‘yin yo‘q.
                </p>
              ) : (
                <ul className="match-list">
                  {finished.map((m) => (
                    <MatchRow key={m.id} match={m} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- QOIDALAR ---------- */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>Qoidalar</h2>
          <div className="rules-card">
            {t.format && (
              <div className="rules-row">
                <span className="rules-label">Format</span>
                <span>{t.format}</span>
              </div>
            )}
            <div className="rules-row">
              <span className="rules-label">Rejim</span>
              <span>{modeLabel(t.mode)}</span>
            </div>
            <div className="rules-row">
              <span className="rules-label">Sig‘im</span>
              <span>{capacityText(t)}</span>
            </div>
            {t.rules ? (
              <div className="rules-body">{t.rules}</div>
            ) : (
              <p className="muted" style={{ marginTop: 14 }}>
                Bu turnir uchun batafsil qoidalar hali kiritilmagan. Ariza
                topshirish va to‘liq qoidalar uchun HALDRYX Telegram botidan
                foydalaning.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ---------- O'YINCHILAR / JAMOALAR ---------- */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row" style={{ marginBottom: 20 }}>
            <h2 style={{ marginBottom: 0 }}>
              Kimlar o‘ynayapti{" "}
              <span className="muted" style={{ fontSize: "1rem" }}>
                ({participants.length})
              </span>
            </h2>
          </div>

          {participants.length === 0 ? (
            <p className="muted">
              Hozircha ro‘yxatdan o‘tgan o‘yinchi yo‘q.
            </p>
          ) : (
            <div className="participant-grid">
              {participants.map((p, i) => (
                <div key={p.id ?? `${p.name}-${i}`} className="participant-card">
                  <div className="participant-avatar">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="participant-info">
                    <strong>{p.name}</strong>
                    <span className="muted" style={{ fontSize: "0.85rem" }}>
                      {[p.region, p.club].filter(Boolean).join(" · ") ||
                        "—"}
                    </span>
                    {p.seed != null && (
                      <span className="tag" style={{ marginTop: 6 }}>
                        Seed #{p.seed}
                      </span>
                    )}
                  </div>
                  <div className="participant-stats">
                    {p.wins != null && p.losses != null && (
                      <span className="stat">
                        {p.wins}W · {p.losses}L
                      </span>
                    )}
                    {p.status === "winner" && (
                      <span className="badge open">G‘olib</span>
                    )}
                    {p.status === "eliminated" && (
                      <span className="badge">Chiqdi</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- BRACKET LINK ---------- */}
      {t.bracketUrl && (
        <section className="block" style={{ paddingTop: 0 }}>
          <div className="container">
            <a
              className="btn-gold"
              href={t.bracketUrl}
              target="_blank"
              rel="noreferrer"
            >
              📊 To‘liq jadvalni ko‘rish
            </a>
          </div>
        </section>
      )}
    </>
  );
}

function MatchRow({
  match,
  highlight = false,
}: {
  match: {
    id: string;
    playerA: string;
    playerB: string;
    scoreA?: number | null;
    scoreB?: number | null;
    status: "pending" | "live" | "finished";
    scheduledStart?: string | null;
  };
  highlight?: boolean;
}) {
  return (
    <li className={`match-row${highlight ? " is-live" : ""}`}>
      <div className="match-side">
        <span className="match-name">{match.playerA}</span>
        <span className="match-score">{match.scoreA ?? "–"}</span>
      </div>
      <div className="match-side">
        <span className="match-name">{match.playerB}</span>
        <span className="match-score">{match.scoreB ?? "–"}</span>
      </div>
      {match.scheduledStart && match.status === "pending" && (
        <span className="match-time">🕒 {formatDateTime(match.scheduledStart)}</span>
      )}
      {match.status === "live" && <span className="match-live">LIVE</span>}
    </li>
  );
}