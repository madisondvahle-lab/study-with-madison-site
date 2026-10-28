import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/app/brand-logo";
import "./contact.css";

const email = "studywithmadisonrn@gmail.com";
const consultation = "https://calendly.com/studywithmadisonrn/free-consultation";
const tiktok = "https://www.tiktok.com/@studywithmadison0";

export const metadata: Metadata = {
  title: "Contact Madison | Study With Madison",
  description: "Get in touch with Madison about nursing tutoring, NCLEX preparation, booking, or payment questions.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Madison | Study With Madison",
    description: "Questions about tutoring or your next step? Get in touch with Madison.",
    url: "https://studywithmadison.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <main className="contact-page" id="top">
    <nav className="nav" aria-label="Primary navigation">
      <BrandLogo />
      <div className="nav-links">
        <Link href="/#services">Tutoring</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/contact" aria-current="page">Contact</Link>
      </div>
      <a className="button button-small" href={consultation}>Free consultation</a>
    </nav>

    <header className="contact-hero">
      <div className="contact-hero-copy">
        <p className="eyebrow">A real person, ready to help</p>
        <h1>Let&apos;s talk about <em>what you need.</em></h1>
        <p className="contact-lead">Have a question about tutoring, NCLEX prep, or getting started? Send me a note. I&apos;d love to hear what you&apos;re working toward.</p>
        <a className="button" href={`mailto:${email}?subject=${encodeURIComponent("Question for Study With Madison")}`}>
          Email Madison <span aria-hidden="true">→</span>
        </a>
        <p className="contact-email"><a href={`mailto:${email}`}>{email}</a></p>
        <p className="contact-social"><a href={tiktok} target="_blank" rel="noopener noreferrer">Follow along on TikTok <span aria-hidden="true">↗</span></a></p>
      </div>
      <aside className="contact-note" aria-label="A note from Madison">
        <span className="contact-note-mark" aria-hidden="true">✦</span>
        <p>Every next step starts with a conversation.</p>
        <span className="contact-note-caption">No pressure. Just a little clarity.</span>
      </aside>
    </header>

    <section className="contact-details" aria-labelledby="contact-details-title">
      <div className="contact-details-intro">
        <p className="eyebrow">How can I help?</p>
        <h2 id="contact-details-title">A good place to <em>start.</em></h2>
        <p>Share a little about your question and I&apos;ll point you in the right direction.</p>
      </div>
      <div className="contact-topic-grid">
        <article>
          <span className="contact-topic-number">01</span>
          <h3>Finding the right support</h3>
          <p>Tell me what you&apos;re studying and what kind of help you&apos;re looking for. We can figure out which tutoring option makes sense.</p>
        </article>
        <article>
          <span className="contact-topic-number">02</span>
          <h3>Booking or payment questions</h3>
          <p>Need help with scheduling, a package, or a booking link? Include the email you used to book so I can help faster.</p>
        </article>
        <article>
          <span className="contact-topic-number">03</span>
          <h3>Ready to get started?</h3>
          <p>For a relaxed first conversation, book a free consultation and we&apos;ll talk through your goals together.</p>
          <a className="text-link" href={consultation}>Choose a time <span aria-hidden="true">→</span></a>
        </article>
      </div>
      <p className="contact-privacy-note">Please don&apos;t include private medical, student, or payment details in your email.</p>
    </section>

    <section className="contact-cta">
      <p className="eyebrow light">Whenever you&apos;re ready</p>
      <h2>Your next step can start <em>right here.</em></h2>
      <a className="button button-light" href={`mailto:${email}?subject=${encodeURIComponent("Question for Study With Madison")}`}>
        Write an email <span aria-hidden="true">→</span>
      </a>
    </section>

    <footer>
      <BrandLogo />
      <p>Personalized nursing tutoring, online via Zoom.</p>
      <Link className="footer-faq-link" href="/faq">FAQ</Link>
      <Link className="footer-faq-link" href="/contact" aria-current="page">Contact</Link>
      <a className="footer-faq-link" href={tiktok} target="_blank" rel="noopener noreferrer">TikTok ↗</a>
      <a href={consultation}>Book a free consultation →</a>
    </footer>
  </main>;
}
