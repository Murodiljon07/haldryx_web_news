import type { Metadata } from "next";

export const metadata: Metadata = { title: "Biz haqimizda — HALDRYX" };

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Biz haqimizda</h1>
        </div>
      </section>

      <section className="block about" style={{ paddingTop: 0 }}>
        <div className="container">
          <p>
            HALDRYX — o‘zbekistonlik o‘yinchilar uchun turnirlarni tashkil etish
            va kuzatish platformasi. Bizda yakka va jamoaviy turnirlar, klublar
            hamda o‘yinchilar bitta joyda jamlangan.
          </p>
          <p>
            Turnirlarga ariza topshirish, jamoa tuzish va profilingizni
            boshqarish uchun HALDRYX Telegram botidan foydalaning. Sayt orqali
            faqat yangiliklar, turnirlar, klublar va o‘yinchilar haqida
            ma’lumot olasiz.
          </p>
          <p>
            Savollar va takliflar bo‘lsa, Telegram botimiz orqali biz bilan
            bog‘laning.
          </p>
        </div>
      </section>
    </>
  );
}