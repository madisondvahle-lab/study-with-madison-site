"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const links = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#services", label: "Tutoring" },
  { href: "#nclex-coaching", label: "NCLEX Coaching" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "#about", label: "About" },
];

export default function HomeNavigation() {
  const [open, setOpen] = useState(false);
  const summary = useRef<HTMLElement>(null);

  function closeOnEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      summary.current?.focus();
    }
  }

  function navigationLinks() {
    return links.map(({ href, label }) => (
      <a href={href} key={href} onClick={() => setOpen(false)} onKeyDown={closeOnEscape}>{label}</a>
    ));
  }

  return (
    <>
      <div className="nav-links">{navigationLinks()}</div>
      <details
        className="home-mobile-menu"
        open={open}
      >
        <summary
          ref={summary}
          onKeyDown={closeOnEscape}
          onClick={(event) => {
            event.preventDefault();
            setOpen(!open);
          }}
        >
          Menu
        </summary>
        <div className="home-mobile-links">{navigationLinks()}</div>
      </details>
    </>
  );
}
