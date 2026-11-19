import Link from "next/link";
import type { NewsItem } from "@/lib/api";
import { excerpt, formatDateTime } from "@/lib/format";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.code}`} className="card-link">
      <article className="card">
        {item.photoFileId && (
          <div className="banner">
            <img
              src={`/media/${item.photoFileId}`}
              alt={item.title}
              loading="lazy"
            />
          </div>
        )}
        <div className="card-body">
          {item.createdAt && (
            <p className="muted" style={{ margin: 0, fontSize: "0.82rem" }}>
              {formatDateTime(item.createdAt)}
            </p>
          )}
          <h3 style={{ marginTop: 6 }}>{item.title}</h3>
          <p className="excerpt">{excerpt(item.body, 140)}</p>
        </div>
      </article>
    </Link>
  );
}