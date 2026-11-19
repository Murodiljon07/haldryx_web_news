import type { Metadata } from "next";
import { getNews } from "@/lib/api";
import NewsCard from "@/components/NewsCard";
import NewsCarousel from "@/components/NewsCarousel";

export const revalidate = 60;

export const metadata: Metadata = { title: "Yangiliklar — HALDRYX" };

export default async function NewsPage() {
  const news = await getNews(100);
  const featured = news.slice(0, 5);
  const rest = news.slice(5);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Yangiliklar</h1>
          <p className="muted">So‘nggi e’lonlar va xabarlar.</p>
        </div>
      </section>

      {featured.length > 0 && (
        <section style={{ paddingBottom: 40 }} className="fade-up">
          <div className="container">
            <NewsCarousel items={featured} />
          </div>
        </section>
      )}

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          {rest.length === 0 ? (
            <p className="muted">Hozircha boshqa yangiliklar yo‘q.</p>
          ) : (
            <div className="grid">
              {rest.map((item) => (
                <NewsCard key={item.code} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}