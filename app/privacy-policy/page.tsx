import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/app/brand-logo";
import "./../legal.css";

const email = "studywithmadisonrn@gmail.com";
const tiktok = "https://www.tiktok.com/@studywithmadison0";

export const metadata: Metadata = {
  title: "Privacy Policy | Study With Madison",
  description: "Learn what information Study With Madison collects, how it is used, and the choices you have.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Study With Madison",
    description: "Learn how Study With Madison handles personal information.",
    url: "https://studywithmadison.com/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <main className="legal-page">
    <nav className="nav" aria-label="Primary navigation">
      <BrandLogo />
      <div className="nav-links">
        <Link href="/contact">Contact</Link>
        <Link href="/faq">FAQ</Link>
      </div>
      <Link className="button button-small" href="/">Home</Link>
    </nav>
    <header className="legal-hero">
      <p className="eyebrow">Your information matters</p>
      <h1>Privacy <em>policy.</em></h1>
      <p>How Study With Madison handles information when you visit this website, contact Madison, or book tutoring.</p>
    </header>
    <article className="legal-content">
      <p><strong>Last updated: October 27, 2026</strong></p>
      <section>
        <h2>Who this policy covers</h2>
        <p>This policy applies to the public Study With Madison website at <a href="https://studywithmadison.com">studywithmadison.com</a> and information collected in connection with its public tutoring and educational services. Study With Madison is operated by Madison Vahle. For privacy questions, email <a href={`mailto:${email}`}>{email}</a>.</p>
        <p>This website does not contain a contact form. If you choose to email Madison, your email provider and Madison&apos;s email provider will handle that message.</p>
      </section>
      <section>
        <h2>Information that may be collected</h2>
        <p>Depending on how you interact with the site and services, information may include:</p>
        <ul>
          <li>Contact details and the contents of messages you choose to send by email.</li>
          <li>Booking details you enter through Calendly, such as your name, email address, appointment, and scheduling information.</li>
          <li>Purchase and transaction details handled through the checkout or payment provider, such as the item purchased, amount, payment status, and receipt information. Full payment card or bank-account credentials are handled by the payment provider and are not stored by this website.</li>
          <li>Basic technical information processed by website hosting and security services, such as an IP address, browser/device information, requested pages, and server logs.</li>
        </ul>
        <p>Please do not send private medical, patient, or payment-card information by email or through third-party booking tools.</p>
      </section>
      <section>
        <h2>How information is used</h2>
        <p>Information may be used to respond to questions, schedule and provide tutoring, fulfill purchases, send booking or service communications, keep business and transaction records, maintain and secure the website, and comply with legal obligations.</p>
      </section>
      <section>
        <h2>Service providers and sharing</h2>
        <p>Information may be processed by providers that support the site and services, including website hosting, Calendly for scheduling, and payment providers such as Stripe or Klarna when offered at checkout. These providers handle information under their own privacy terms and instructions. Study With Madison does not sell personal information.</p>
        <p>Information may also be disclosed when reasonably necessary to fulfill a requested service, comply with law, protect rights and safety, or respond to a valid legal request. External websites linked from this site, including <a href={tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>, have their own privacy practices.</p>
      </section>
      <section>
        <h2>Cookies, analytics, and external resources</h2>
        <p>This website currently does not use analytics tools or advertising pixels. Hosting and security providers may process technical logs needed to deliver and protect the site. The site loads fonts from Google Fonts, which may receive technical request information when your browser retrieves those fonts; review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s privacy policy</a> for information about Google&apos;s practices.</p>
      </section>
      <section>
        <h2>Retention and security</h2>
        <p>Information is kept for as long as reasonably needed to respond to you, provide services, maintain business and tax records, resolve disputes, and meet legal obligations. Reasonable safeguards are used to protect information, but no website, email, or internet transmission can be guaranteed completely secure.</p>
      </section>
      <section>
        <h2>Your choices and privacy questions</h2>
        <p>You may contact Madison to request access to, correction of, or deletion of information you have provided, subject to records that must be retained for legal, accounting, or service purposes. Depending on your location, you may have additional privacy rights under applicable law. To make a request or ask a question, email <a href={`mailto:${email}`}>{email}</a>.</p>
      </section>
      <section>
        <h2>Changes to this policy</h2>
        <p>This policy may be updated when the website, services, or applicable requirements change. The updated version and revision date will be posted on this page.</p>
      </section>
      <aside className="legal-note">For service terms, including scheduling, package expiration, and refunds, see the <Link href="/terms-of-service">Terms of Service</Link>.</aside>
    </article>
    <footer>
      <BrandLogo />
      <p>Personalized nursing tutoring, online via Zoom.</p>
      <Link className="footer-faq-link" href="/privacy-policy" aria-current="page">Privacy</Link>
      <Link className="footer-faq-link" href="/terms-of-service">Terms</Link>
      <Link className="footer-faq-link" href="/contact">Contact</Link>
      <a href={`mailto:${email}`}>Email Madison →</a>
    </footer>
  </main>;
}
