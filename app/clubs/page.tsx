import type { Metadata } from "next";
import { getClubs } from "@/lib/api";

export const revalidate = 60;

export const metadata: Metadata = { title: "Klublar — HALDRYX" };

export default async function ClubsPage() {
  const clubs = await getClubs();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Klublar</h1>
          <p className="muted">HALDRYX klublari va ularning a’zolari.</p>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          {clubs.length === 0 ? (
            <p className="muted">Hozircha klublar yo‘q.</p>
          ) : (
            <div className="grid">
              {clubs.map((club) => (
                <article key={club.name} className="card player">
                  <h3>{club.name}</h3>
                  <p className="muted" style={{ margin: "4px 0" }}>
                    Lider: {club.leader}
                  </p>
                  <p
                    className="muted"
                    style={{ margin: "4px 0 0", fontSize: "0.9rem" }}
                  >
                    A’zolar: {club.members.length}
                  </p>
                  <ul className="member-list">
                    {club.members.map((member, index) => (
                      <li key={`${member.name}-${index}`}>
                        <span>{member.name}</span>
                        {member.role === "leader" && (
                          <span className="tag">lider</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}