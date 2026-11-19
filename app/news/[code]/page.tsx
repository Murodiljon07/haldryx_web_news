import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/api";
import { formatDateTime } from "@/lib/format";

export const revalidate = 60;

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const item = await getNewsItem(code);
  return {
    title: item ? `${item.title} — HALDRYX` : "Yangilik topilmadi — HALDRYX",
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { code } = await params;
  const item = await getNewsItem(code);
  if (!item) notFound();

  return (
    <>
      <section className="page-head">
        <div className="container" style={{ maxWidth: 820 }}>
          <Link href="/news">← Yangiliklarga qaytish</Link>
          <h1 style={{ marginTop: 20 }}>{item.title}</h1>
          {item.createdAt && (
            <p className="muted">🗓 {formatDateTime(item.createdAt)}</p>
          )}
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          {item.photoFileId && (
            <img
              className="news-photo"
              src={`/media/${item.photoFileId}`}
              alt={item.title}
              width={820}
            />
          )}
          {item.body && <div className="news-body">{item.body}</div>}
        </div>
      </section>
    </>
  );
}