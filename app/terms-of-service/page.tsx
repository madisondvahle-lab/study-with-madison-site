import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/app/brand-logo";
import "./../legal.css";

const email = "studywithmadisonrn@gmail.com";
const strategySupportEmail = "support@studywithmadison.com";

export const metadata: Metadata = {
  title: "Terms of Service | Study With Madison",
  description: "Review the terms for Study With Madison tutoring, scheduling, payments, and educational services.",
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: "Terms of Service | Study With Madison",
    description: "Terms for tutoring, scheduling, payments, and educational services.",
    url: "https://studywithmadison.com/terms-of-service",
    type: "website",
  },
};

export default function TermsOfServicePage() {
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
      <p className="eyebrow">Clear expectations, supportive learning</p>
      <h1>Terms of <em>service.</em></h1>
      <p>These terms explain the basics of using the Study With Madison website and booking tutoring services.</p>
    </header>
    <article className="legal-content">
      <p><strong>Last updated: October 27, 2026</strong></p>
      <section>
        <h2>About these terms</h2>
        <p>These terms apply to the public Study With Madison website and tutoring services provided by Madison Vahle under the Study With Madison name. By using this website or purchasing or booking a service, you agree to these terms. If you have a question, contact <a href={`mailto:${email}`}>{email}</a>.</p>
      </section>
      <section>
        <h2>Tutoring services</h2>
        <p>Tutoring and coaching provide educational support for nursing coursework, exam preparation, and study strategy. Services are not medical care, legal advice, or a substitute for instruction from your school or official licensing authorities. Tutoring does not guarantee a particular course grade, exam result, or NCLEX outcome. You remain responsible for your learning, decisions, and exam registration.</p>
        <p>Descriptions, available formats, prices, and included services are shown on the website or at checkout and may be updated for future purchases. The details presented when you purchase apply to that transaction.</p>
      </section>
      <section>
        <h2>Booking, changes, and attendance</h2>
        <p>Sessions are scheduled through the booking instructions provided after purchase. Please use the rescheduling or cancellation link in your booking confirmation and give at least 24 hours&apos; notice to change or cancel an appointment. A cancellation or rescheduling request made with less than 24 hours&apos; notice, or a missed appointment without prior communication, may be treated as a completed session. Contact Madison as soon as possible if an unexpected circumstance affects your appointment.</p>
      </section>
      <section>
        <h2>Package sessions and expiration</h2>
        <p>Unless the purchase details say otherwise, package validity begins on the purchase date. Unused sessions must be scheduled within the applicable period and expire when that period ends:</p>
        <ul>
          <li>3-session packages: 60 days from purchase.</li>
          <li>5-session packages: 90 days from purchase.</li>
          <li>Nursing School Semester Support: 4 months from purchase.</li>
          <li>Flexible NCLEX 8-session package: 120 days from purchase.</li>
        </ul>
        <p>Structured NCLEX coaching is individualized around your preparation timeline; no fixed expiration period is currently specified for those programs. Contact Madison before a package expires if illness, an exam-date change, or another significant circumstance affects your ability to schedule. Extensions are not automatic and are considered individually.</p>
      </section>
      <section>
        <h2>Payments, Klarna, and refunds</h2>
        <p>Payment is due as shown at checkout. Payment plans or buy-now-pay-later options, when available, are subject to the provider&apos;s own approval and terms. For eligible Klarna package purchases, a separate $0.50 booking charge may be required by credit or debit card before booking links can be issued; details are shown in the purchase information and <Link href="/faq#payments-packages">payment FAQ</Link>.</p>
        <p>After sessions in a package have begun, package purchases are not refundable. Requests concerning unused sessions are reviewed individually; email <a href={`mailto:${email}`}>{email}</a> with your purchase details. Any non-waivable rights under applicable law remain unaffected.</p>
        <p>If you purchase a tutoring package within seven days of an eligible $40 NCLEX Strategy Session, the $40 session fee is refunded to the original payment method after the package purchase. To request this credit, email <a href={`mailto:${strategySupportEmail}`}>{strategySupportEmail}</a> with your package confirmation.</p>
      </section>
      <section>
        <h2>Materials and acceptable use</h2>
        <p>Website text, study resources, and other materials are provided for your personal educational use. Do not copy, redistribute, publish, or sell them without permission. Do not use the website or services to submit another person&apos;s confidential or identifiable patient information, or to violate another person&apos;s rights or applicable law.</p>
      </section>
      <section>
        <h2>Third-party services and links</h2>
        <p>Scheduling, payment, and linked external resources may be provided by third parties, including Calendly, Stripe, and Klarna. Their services are governed by their own terms and privacy policies. Study With Madison is not responsible for the operation or content of third-party websites.</p>
      </section>
      <section>
        <h2>Limitation of liability</h2>
        <p>To the extent permitted by law, Study With Madison is not responsible for indirect or consequential losses arising from use of the website or educational services. Nothing in these terms limits liability or consumer rights that cannot legally be excluded.</p>
      </section>
      <section>
        <h2>Governing law and updates</h2>
        <p>These terms are governed by the laws of the State of Missouri, without limiting any mandatory consumer protections that apply where you live. These terms may be updated as services or legal requirements change. The current version and revision date will be posted on this page.</p>
      </section>
      <aside className="legal-note">Questions about these terms? <a href={`mailto:${email}`}>Email Madison</a>. See the <Link href="/privacy-policy">Privacy Policy</Link> for information about personal information.</aside>
    </article>
    <footer>
      <BrandLogo />
      <p>Personalized nursing tutoring, online via Zoom.</p>
      <Link className="footer-faq-link" href="/privacy-policy">Privacy</Link>
      <Link className="footer-faq-link" href="/terms-of-service" aria-current="page">Terms</Link>
      <Link className="footer-faq-link" href="/contact">Contact</Link>
      <a href={`mailto:${email}`}>Email Madison →</a>
    </footer>
  </main>;
}
