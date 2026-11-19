import Link from "next/link";
import { getNews, getTournaments } from "@/lib/api";
import TournamentCarousel from "@/components/TournamentCarousel";
import NewsCarousel from "@/components/NewsCarousel";
import NewsCard from "@/components/NewsCard";

export const revalidate = 60;

export default async function HomePage() {
  const [tournaments, news] = await Promise.all([
    getTournaments(),
    getNews(12),
  ]);

  const featured = news.slice(0, 5);
  const rest = news.slice(5, 11);

  return (
    <>
      {featured.length > 0 && (
        <section style={{ paddingTop: 40, paddingBottom: 0 }} className="fade-up">
          <div className="container">
            <NewsCarousel items={featured} />
          </div>
        </section>
      )}

      <section className="hero">
        <div className="container">
          <h1>HALDRYX turnirlari</h1>
          <p className="muted">
            Ochiq arizalar, hozir o‘ynalayotgan turnirlar va so‘nggi
            yangiliklar — bir joyda.
          </p>
          <span className="gold-rule" aria-hidden="true" />
        </div>
      </section>

      <section className="block">
        <div className="container">
          <div className="row" style={{ marginBottom: 24 }}>
            <h2 style={{ marginBottom: 0 }}>Turnirlar</h2>
            <Link href="/tournaments">Barcha turnirlar →</Link>
          </div>
          {tournaments.length > 0 ? (
            <TournamentCarousel items={tournaments} />
          ) : (
            <p className="muted">Hozircha faol turnir yo‘q.</p>
          )}
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row" style={{ marginBottom: 24 }}>
            <h2 style={{ marginBottom: 0 }}>Yangiliklar</h2>
            <Link href="/news">Barcha yangiliklar →</Link>
          </div>
          {rest.length > 0 ? (
            <div className="grid">
              {rest.map((item) => (
                <NewsCard key={item.code} item={item} />
              ))}
            </div>
          ) : (
            <p className="muted">Hozircha yangiliklar yo‘q.</p>
          )}
        </div>
      </section>
    </>
  );
}