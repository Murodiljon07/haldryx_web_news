import Link from "next/link";

export default function NotFound() {
  return (
    <section className="block">
      <div className="container">
        <h1>Yangilik topilmadi</h1>
        <p className="muted" style={{ marginBottom: 20 }}>
          Bu yangilik o‘chirilgan yoki havola noto‘g‘ri.
        </p>
        <Link href="/news">← Yangiliklarga qaytish</Link>
      </div>
    </section>
  );
}