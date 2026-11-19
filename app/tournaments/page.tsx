import type { Metadata } from "next";
import { getTournaments } from "@/lib/api";
import TournamentCard from "@/components/TournamentCard";

export const revalidate = 60;

export const metadata: Metadata = { title: "Turnirlar — HALDRYX" };

export default async function TournamentsPage() {
  const tournaments = await getTournaments();
  const live = tournaments.filter((t) => t.status === "started");
  const open = tournaments.filter((t) => t.status === "open");

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Turnirlar</h1>
          <p className="muted">Boshlangan va ariza ochiq turnirlar bir joyda.</p>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>Hozir o‘ynalayotgan turnirlar</h2>
          {live.length === 0 ? (
            <p className="muted">Hozircha bunday turnir yo‘q.</p>
          ) : (
            <div className="grid">
              {live.map((t) => (
                <TournamentCard key={t.code} item={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>Ariza ochiq turnirlar</h2>
          {open.length === 0 ? (
            <p className="muted">Hozircha ariza ochiq turnir yo‘q.</p>
          ) : (
            <div className="grid">
              {open.map((t) => (
                <TournamentCard key={t.code} item={t} />
              ))}
            </div>
          )}
          <p className="muted" style={{ marginTop: 28 }}>
            Ariza topshirish va to‘liq qoidalar uchun HALDRYX Telegram botidan
            foydalaning.
          </p>
        </div>
      </section>
    </>
  );
}