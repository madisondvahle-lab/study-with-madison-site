import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/app/brand-logo";
import type { ReactNode } from "react";
import { klarnaAnswer } from "@/lib/klarna";
import { coachingPrograms } from "@/lib/coaching-programs";
import "./faq.css";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Study With Madison",
  description: "Answers about tutoring, package booking, Klarna payments, NCLEX preparation, and student resources.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Study With Madison",
    description: "Clear answers to help you plan your tutoring and next steps.",
    url: "https://studywithmadison.com/faq",
    type: "website",
  },
};

type FaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
  proposed?: boolean;
};

type FaqCategory = {
  id: string;
  title: string;
  intro: string;
  items: FaqItem[];
};

const categories: FaqCategory[] = [
  {
    id: "booking-scheduling",
    title: "Booking & Scheduling",
    intro: "From choosing your first session to planning ongoing support.",
    items: [
      {
        id: "book-tutoring",
        question: "How do I book an individual session or a tutoring package?",
        answer: <p>Choose an option from the <Link href="/#services">tutoring packages</Link> and follow its existing booking link. Individual sessions are private, 60-minute appointments. Packages offer multiple sessions for ongoing support. If you are unsure which option fits, the <a href="https://calendly.com/studywithmadisonrn/free-consultation">free consultation</a> can help you decide.</p>,
      },
      {
        id: "package-booking-links",
        question: "How will I receive and use my package booking link?",
        answer: <p>For standard package purchases, Calendly automatically sends your package booking link after payment. Use that link to schedule the sessions included in your package, and keep it for future bookings. Klarna purchases follow a separate process: see <a href="#payments-packages">Klarna payment and booking details</a> below.</p>,
      },
      {
        id: "multiple-sessions",
        question: "Can I schedule multiple sessions at once?",
        answer: <p>Yes. Use your package booking link to schedule your included sessions all at once or individually over time. You do not need to book every session at the time of purchase. Existing Semester Support agreements do not require weekly appointments.</p>,
      },
      {
        id: "rescheduling-cancellations",
        question: "How do I reschedule or cancel a session?",
        answer: <>
          <p>Use the rescheduling or cancellation links in your Calendly booking confirmation email.</p>
          <p>Please give at least 24 hours&apos; notice for cancellations or rescheduling. Changes made with less than 24 hours&apos; notice, or a missed appointment without prior communication, may be treated as a completed session. Contact Madison as soon as possible if an unexpected circumstance affects your appointment.</p>
        </>,
      },
    ],
  },
  {
    id: "payments-packages",
    title: "Payments & Tutoring Packages",
    intro: "Flexible payments and receiving your package booking links.",
    items: [
      {
        id: "package-expiration",
        question: "When do tutoring packages expire?",
        answer: <>
          <p>Unless the purchase details say otherwise, package validity begins on the purchase date:</p>
          <ul>
            <li>3-session packages: 60 days.</li>
            <li>5-session packages: 90 days.</li>
            <li>Previously purchased Nursing School Semester Support: 4 months.</li>
            <li>Previously purchased Flexible NCLEX 8-session package: 120 days.</li>
          </ul>
          <p>Unused sessions must be scheduled within the applicable period and expire when it ends. If illness, an exam-date change, or another significant circumstance affects your ability to schedule, contact Madison before the package expires. Extensions are considered individually and are not automatic.</p>
          <p>Structured NCLEX coaching is individualized around your preparation timeline; no fixed expiration period is currently specified for those programs.</p>
        </>,
      },
      {
        id: "package-refunds",
        question: "Are tutoring packages refundable?",
        answer: <p>After sessions in a package have begun, the package purchase is not refundable. Requests concerning unused sessions are reviewed individually. Email <a href="mailto:studywithmadisonrn@gmail.com">studywithmadisonrn@gmail.com</a> with your purchase details. Any non-waivable rights under applicable law remain unaffected.</p>,
      },
      {
        id: "klarna",
        question: "Can I pay with Klarna?",
        answer: <>{klarnaAnswer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p>For help with missing booking links, email <a href="mailto:studywithmadisonrn@gmail.com">studywithmadisonrn@gmail.com</a>.</p></>,
      },
      {
        id: "klarna-booking-charge",
        question: "What is the separate $0.50 Klarna booking charge?",
        answer: <p>It is a required payment per package purchase, not per tutoring session. After your initial Klarna purchase is processed, Madison sends a separate $0.50 payment link. Pay it by credit or debit card, not Klarna. This step must be completed before your package booking link can be issued.</p>,
      },
      {
        id: "missing-klarna-links",
        question: "I paid with Klarna but have not received my booking links. What should I do?",
        answer: <p>Email <a href="mailto:studywithmadisonrn@gmail.com">studywithmadisonrn@gmail.com</a> so Madison can help you complete any remaining booking step and send your links. Klarna booking links are sent separately, not automatically, and the separate $0.50 credit or debit card payment is required first.</p>,
      },
    ],
  },
  {
    id: "tutoring-nclex",
    title: "Tutoring & NCLEX Preparation",
    intro: "Personalized support for your courses, clinical judgment, and next exam.",
    items: [
      {
        id: "nursing-school-or-nclex",
        question: "What is the difference between nursing school tutoring and NCLEX preparation?",
        answer: <p>Private Nursing Tutoring supports nursing coursework, exam preparation, and focused NCLEX review. NCLEX Coaching Programs add an individualized study roadmap, clinical judgment development, and performance review appropriate to the selected program. Candidates preparing for a retake may benefit from structured coaching rather than a small tutoring package. Compare the <Link href="/#services">available tutoring options</Link> to find the right fit.</p>,
      },
      {
        id: "structured-coaching",
        question: "How is structured NCLEX coaching different from flexible tutoring?",
        answer: <p>Flexible tutoring provides targeted help without a comprehensive preparation program. Structured coaching includes a personalized study roadmap and ongoing support appropriate to the selected program. Progress is evaluated through individualized feedback, practice question review, existing assessment results, and identification of areas needing improvement—not an automated performance dashboard. See the <Link href="/#nclex-coaching">coaching package descriptions</Link> for specific benefits and retake-support conditions. Tutoring does not guarantee an NCLEX outcome.</p>,
      },
      {
        id: "coaching-session-formats",
        question: "How long are NCLEX coaching sessions, and what does each program include?",
        answer: <>
          <p>All newly offered private coaching sessions are 60 minutes.</p>
          <ul>{coachingPrograms.map((program) => <li key={program.id}>{program.name}: {program.hours} private coaching hours for {program.price}{program.catHours > 0 ? ", plus one 3-hour Live CAT: 27 total live hours" : ""}.</li>)}</ul>
          <p>Complete includes 24 private coaching hours and one separate 3-hour Live CAT appointment. The CAT is included in the 27 total live hours, not added to 27 coaching sessions. Detailed post-CAT review and study-plan adjustments take place during regular coaching sessions and count toward the 24 coaching hours. Review covers performance patterns, clinical judgment, and priority weaknesses.</p>
          <p>After purchase, Madison personally provides eligible Complete students with CAT booking instructions. CAT booking access is provided manually, not automatically. Madison tracks completion so each student uses only their one included simulation. For help, <a href="mailto:studywithmadisonrn@gmail.com?subject=Complete%20Support%20CAT%20booking%20access">email Madison</a>. Existing payment and booking requirements, including the separate $0.50 card payment for Klarna package purchases, still apply.</p>
          <p>Previously purchased packages retain their original session format, coaching hours, benefits, and booking access. The new offerings do not change existing agreements.</p>
        </>,
      },
      {
        id: "coaching-support",
        question: "What between-session support and retake support are included?",
        answer: <>
          <p>Starter includes its listed progress review, not between-session messaging. Momentum and Intensive include brief study-question support Monday through Friday with replies within one business day. Complete receives priority handling within that same response window. Unlimited messaging, on-demand tutoring, and urgent clinical guidance are not included.</p>
          <p>Following an unsuccessful attempt, Starter includes 3, Momentum includes 5, Intensive includes 7, and Complete includes 9 complimentary 60-minute retake sessions. These allowances are not cumulative across tiers. Eligibility requires completing booked coaching sessions, following agreed study commitments, and taking the NCLEX within 90 days of the final coaching session. Retake support is available once and must be used within 6 months of a confirmed unsuccessful attempt. Coaching does not guarantee an NCLEX outcome.</p>
        </>,
      },
      {
        id: "first-session",
        question: "What should I expect during my first tutoring session?",
        answer: <p>Your first paid session is individualized around your goals, current performance, and areas of difficulty. For NCLEX students, we may work through targeted practice questions to explore how you interpret questions, recognize clinical cues, prioritize information, and choose an answer. Nursing school sessions may include concept review, practice questions, clinical reasoning, test-taking strategies, or targeted remediation. There is no single required first-session format.</p>,
      },
      {
        id: "prepare-for-tutoring",
        question: "How should I prepare for a tutoring session?",
        answer: <>
          <p>For NCLEX tutoring, share any existing question bank performance, CAT or readiness results, flagged questions, and a Candidate Performance Report (CPR) if you have previously tested. A recent CAT or readiness assessment is helpful if you have access to one, but it is not mandatory.</p>
          <p>For nursing school tutoring, useful materials include your syllabus, exam blueprint or study guide, upcoming exam topics, relevant assessment results, and areas of concern.</p>
          <p>Sending relevant materials before your appointment helps us make the most of our time together. You do not need to have everything available to get started. Sessions take place online via Zoom.</p>
        </>,
      },
    ],
  },
  {
    id: "resources-student-access",
    title: "Learning Resources & Student Access",
    intro: "What is available now, what to bring, and where to find support.",
    items: [
      {
        id: "question-bank-subscriptions",
        question: "Do I need a question bank subscription?",
        answer: <p>External resources such as UWorld, Archer, and NCLEX Bootcamp are recommended but generally not required. If you choose to use one, you purchase the subscription separately. Tutoring can use your existing practice results, assessment data, and flagged questions to guide targeted review. You do not need multiple subscriptions.</p>,
      },
      {
        id: "practice-exams",
        question: "Are practice exams or an adaptive CAT included?",
        answer: <p>Complete Support includes 24 private coaching hours plus one 3-hour Live CAT: 27 total live hours. Madison personally provides CAT booking instructions after purchase; access is not delivered automatically. Post-CAT review takes place within the 24 coaching hours. Other programs do not include a Live CAT, but Madison can review external CAT and readiness results you already have. Previously purchased packages keep their original CAT and coaching entitlements. The separate proprietary question bank and self-service adaptive CAT system are still in development; access to those tools is not included, and no launch date is promised.</p>,
      },
      {
        id: "student-resources",
        question: "How do I access the NCLEX Success Center and private study resources?",
        answer: <p>Private educational resources are provided according to your individual needs and the services you have purchased. They may include supplemental study guides, NCLEX cheat sheets, remediation materials, practice questions, clinical judgment exercises, and personalized recommendations or assignments. Materials are shared individually through existing student communications or the learning portal, as applicable. Access is not promised automatically after purchase. Current students can use the existing <a href="https://madisondvahle-lab.github.io/nclex-success-center/student-login.html">student sign-in</a> with the email they use for tutoring.</p>,
      },
      {
        id: "free-readiness-check",
        question: "Can I use the free readiness check without purchasing tutoring?",
        answer: <p>Yes. The <a href="https://madisondvahle-lab.github.io/nclex-success-center/free-readiness-check.html">free NCLEX readiness check</a> is publicly available and does not require a tutoring purchase. It is separate from the proprietary question bank and adaptive CAT tools that are still in development.</p>,
      },
    ],
  },
];

export default function FaqPage() {
  return <main className="faq-page" id="top">
    <a className="faq-skip-link" href="#faq-content">Skip to questions</a>
    <nav className="nav" aria-label="Primary navigation">
      <BrandLogo />
      <Link className="text-link" href="/#services">Tutoring options</Link>
      <a className="button button-small" href="https://calendly.com/studywithmadisonrn/free-consultation">Free consultation</a>
    </nav>
    <header className="faq-hero">
      <p className="eyebrow">A little clarity for your next step</p>
      <h1>Frequently asked <em>questions.</em></h1>
      <p>Thoughtful answers about tutoring, booking, payments, and the resources that support your learning.</p>
    </header>
    <div className="faq-content" id="faq-content">
      <nav className="faq-categories" aria-label="FAQ categories">
        {categories.map((category) => <a href={`#${category.id}`} key={category.id}>{category.title}</a>)}
      </nav>
      {categories.map((category) => <section className="faq-category" id={category.id} aria-labelledby={`${category.id}-title`} key={category.id}>
        <div className="faq-category-heading">
          <h2 id={`${category.id}-title`}>{category.title}</h2>
          <p>{category.intro}</p>
        </div>
        <div className="faq-questions">
          {category.items.filter((item) => !item.proposed).map((item) => <details className="faq-item" id={item.id} key={item.id}>
            <summary><h3>{item.question}</h3></summary>
            <div className="faq-answer">
              {item.answer}
            </div>
          </details>)}
        </div>
      </section>)}
      <div className="faq-contact">
        <h2>Still have a question?</h2>
        <p>Email <a href="mailto:studywithmadisonrn@gmail.com">studywithmadisonrn@gmail.com</a> for help with tutoring or booking links.</p>
      </div>
    </div>
    <footer>
      <BrandLogo />
      <p>Personalized nursing tutoring, online via Zoom.</p>
      <Link className="footer-faq-link" href="/faq" aria-current="page">FAQ</Link>
      <Link className="footer-faq-link" href="/contact">Contact</Link>
      <Link className="footer-faq-link" href="/privacy-policy">Privacy</Link>
      <Link className="footer-faq-link" href="/terms-of-service">Terms</Link>
      <a href="https://calendly.com/studywithmadisonrn/free-consultation">Book a free consultation →</a>
    </footer>
  </main>;
}
