import Link from "next/link";

export default function NotFound() {
  return (
    <section className="block">
      <div className="container">
        <h1>Turnir topilmadi</h1>
        <p className="muted" style={{ marginBottom: 20 }}>
          Bu turnir o‘chirilgan yoki havola noto‘g‘ri.
        </p>
        <Link href="/tournaments">← Turnirlarga qaytish</Link>
      </div>
    </section>
  );
}