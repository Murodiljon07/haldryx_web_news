"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/news", label: "Yangiliklar" },
  { href: "/tournaments", label: "Turnirlar" },
  { href: "/clubs", label: "Klublar" },
  { href: "/players", label: "O‘yinchilar" },
  { href: "/about", label: "Biz haqimizda" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <Link href="/" className="brand">
          HALDRYX
        </Link>
        <nav className="nav">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}