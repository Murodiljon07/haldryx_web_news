import type { Metadata } from "next";
import { getPlayers } from "@/lib/api";
import PlayerList from "@/components/PlayerList";

export const revalidate = 60;

export const metadata: Metadata = { title: "O‘yinchilar — HALDRYX" };

export default async function PlayersPage() {
  const players = await getPlayers();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>O‘yinchilar</h1>
          <p className="muted">
            Ro‘yxatdan o‘tgan o‘yinchilar. Qidiruv: ism, viloyat yoki o‘yin
            bo‘yicha.
          </p>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <PlayerList players={players} />
        </div>
      </section>
    </>
  );
}