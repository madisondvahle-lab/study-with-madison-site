import Link from "next/link";
import { coachingPrograms, type CoachingProgram } from "@/lib/coaching-programs";
import { klarnaAnswer, klarnaBookingDisclosure, klarnaDescription } from "@/lib/klarna";
import CoachingTier from "./coaching-tier";

const tutoringPackages = [
  {
    name: "Single Tutoring Session",
    price: "$75",
    sessions: 1,
    value: "One focused session, shaped around you.",
    href: "https://calendly.com/studywithmadisonrn/60-min-session",
    benefits: ["One 60-minute private session", "Personalized instruction", "Focused content review", "Clinical judgment and question-solving strategies"],
  },
  {
    name: "3-Session Tutoring Package",
    price: "$210",
    sessions: 3,
    value: "$70 per session",
    href: "https://calendly.com/studywithmadisonrn/packages/2d195e26-b850-4682-a30f-14de5c8361f2",
    benefits: ["Three 60-minute private sessions", "Save $15 compared with three individual $75 sessions", "Targeted instruction across selected learning needs"],
  },
  {
    name: "5-Session Tutoring Package",
    price: "$325",
    sessions: 5,
    value: "$65 per session",
    href: "https://calendly.com/studywithmadisonrn/packages/274033c2-9972-4d01-9b6d-c620ed5112b2",
    benefits: ["Five 60-minute private sessions", "Save $50 compared with five individual $75 sessions", "Additional time for focused review and skill development"],
  },
];

const comparisonFeatures: { label: string; value: (program: CoachingProgram) => string }[] = [
  { label: "Price", value: (program) => program.price },
  { label: "Total private coaching hours", value: (program) => `${program.hours} hours (${program.hours} × 60 minutes)` },
  { label: "Initial performance evaluation", value: () => "Included" },
  { label: "Individualized study roadmap", value: () => "Included" },
  { label: "Targeted practice assignments", value: () => "Included" },
  { label: "Clinical judgment coaching", value: (program) => program.judgment },
  { label: "Performance monitoring", value: (program) => program.monitoring },
  { label: "Accountability and support", value: (program) => program.support },
  { label: "Live CAT experience", value: (program) => program.catHours > 0 ? "One 3-hour Live CAT; 27 total live hours including 24 coaching hours" : "Not included" },
  { label: "Conditional retake support", value: (program) => program.retakeSessions > 0 ? `${program.retakeSessions} complimentary 60-minute sessions; eligibility conditions apply` : "Not included" },
];

export default function TutoringOptions() {
  return (
    <section className="section services redesigned-services" id="services" aria-labelledby="services-title">
      <div className="section-heading service-heading">
        <p className="eyebrow">Two paths. Personalized support.</p>
        <h2 id="services-title">The right support<br />for your next step.</h2>
        <p className="section-intro">Focus on a challenging topic or build a structured NCLEX preparation plan. Start with the level of support that fits your needs.</p>
      </div>
      <div className="support-paths" aria-label="Choose your support path">
        <article className="support-path">
          <p className="eyebrow">Focused learning needs</p>
          <h3>Private Nursing Tutoring</h3>
          <p>For nursing exams, challenging content, and targeted NCLEX review.</p>
          <a className="text-link" href="#nursing-school-support">Explore private tutoring <span aria-hidden="true">&darr;</span></a>
        </article>
        <article className="support-path support-path-featured">
          <p className="eyebrow">A structured preparation plan</p>
          <h3>NCLEX Coaching Programs</h3>
          <p>For individualized planning, consistent coaching, and performance review, especially when preparing for a retake.</p>
          <a className="button button-light" href="#nclex-coaching">Explore NCLEX coaching <span aria-hidden="true">&darr;</span></a>
        </article>
      </div>

      <section className="service-group nursing-school-group" id="nursing-school-support" aria-labelledby="private-tutoring-title">
        <div className="service-group-heading">
          <div><p className="eyebrow">Targeted, one-on-one learning</p><h3 id="private-tutoring-title">Private Nursing Tutoring</h3></div>
          <p>Personalized, one-on-one tutoring designed to strengthen your nursing knowledge, build clinical confidence, and help you master challenging concepts.</p>
        </div>
        <p className="service-context">For nursing students preparing for exams, students working on specific content areas, and NCLEX candidates seeking focused review.</p>
        <p className="service-note">{klarnaBookingDisclosure} <a className="text-link" href="#klarna-payment-options">Payment details</a></p>
        <div className="package-grid tutoring-package-grid">
          {tutoringPackages.map((item) => (
            <article className="package-card" key={item.name} aria-label={item.name}>
              <p className="package-detail">{item.sessions} &times; 60-minute private {item.sessions === 1 ? "session" : "sessions"}</p>
              <h4>{item.name}</h4>
              <p className="package-price">{item.price}</p>
              <p className="package-value">{item.value}</p>
              <ul>{item.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
              <a className="button package-button" href={item.href} aria-label={`Choose ${item.name} for ${item.price}`}>
                Choose {item.sessions === 1 ? "1 Session" : `${item.sessions} Sessions`} <span aria-hidden="true">&rarr;</span>
              </a>
            </article>
          ))}
        </div>
        <aside className="retaker-guidance" aria-labelledby="retaker-guidance-title">
          <h4 id="retaker-guidance-title">Preparing for an NCLEX retake?</h4>
          <p>While private tutoring is available for targeted review, students who have been unsuccessful on previous attempts may benefit from a more structured preparation plan. Explore our NCLEX Coaching Programs for individualized study planning, consistent coaching, and ongoing performance monitoring.</p>
          <a className="text-link" href="#nclex-coaching">Explore NCLEX Coaching Programs <span aria-hidden="true">&rarr;</span></a>
        </aside>
        <p className="service-note">Private tutoring provides targeted review, not a comprehensive NCLEX preparation program. It does not include a full NCLEX roadmap, formal performance monitoring, or complimentary retake sessions.</p>
        <p className="service-note">Package students may send brief study questions for clarification and guidance. Topics requiring extensive teaching or review belong in a tutoring session, not a message.</p>
      </section>

      <section className="service-group coaching-group structured-coaching-group" id="nclex-coaching" aria-labelledby="coaching-title">
        <div className="service-group-heading">
          <div><p className="eyebrow">A plan. A coach. A clearer direction.</p><h3 id="coaching-title">NCLEX Coaching Programs</h3></div>
          <p>More than tutoring. A structured, individualized approach to NCLEX preparation focused on identifying knowledge gaps, strengthening clinical judgment, and building the skills needed to approach exam questions with confidence.</p>
        </div>
        <p className="service-context" id="coaching-format-explanation">All new private coaching sessions are 60 minutes. Choose by your preparation needs, not just the number of hours. Your previous attempts, CPR, practice results, timeline, and goals help guide the right fit.</p>
        <p className="service-note">{klarnaBookingDisclosure} <a className="text-link" href="#klarna-payment-options">Payment details</a></p>
        <div className="coaching-tier-grid">
          {coachingPrograms.map((program) => <CoachingTier key={program.id} program={program} />)}
        </div>

        <section className="coaching-comparison" aria-labelledby="coaching-comparison-title">
          <h4 id="coaching-comparison-title">Compare your coaching options</h4>
          <p className="comparison-hint">See how planning, coaching time, and support differ. Retake support is conditional, not a guarantee of success.</p>
          <table className="coaching-comparison-table">
            <caption className="visually-hidden">NCLEX coaching program benefits and prices</caption>
            <thead><tr><th scope="col">Included</th>{coachingPrograms.map((program) => <th scope="col" key={program.id}>{program.shortName}</th>)}</tr></thead>
            <tbody>{comparisonFeatures.map((feature) => (
              <tr key={feature.label}><th scope="row">{feature.label}</th>{coachingPrograms.map((program) => <td key={program.id}>{feature.value(program)}</td>)}</tr>
            ))}</tbody>
          </table>
          <div className="coaching-comparison-mobile">
            {coachingPrograms.map((program) => (
              <details key={program.id}>
                <summary>{program.shortName} <span>{program.price} / {program.hours} coaching hours</span></summary>
                <dl>{comparisonFeatures.map((feature) => <div key={feature.label}><dt>{feature.label}</dt><dd>{feature.value(program)}</dd></div>)}</dl>
              </details>
            ))}
          </div>
        </section>

        <div className="coaching-policies">
          <div id="coaching-support-boundaries">
            <h4>Support with clear boundaries</h4>
            <p>Momentum and Intensive include brief study-question support Monday through Friday, with replies within one business day. Complete receives priority handling within that same response window. Unlimited messaging, on-demand tutoring, and urgent clinical guidance are not included. Starter includes its listed progress review, not between-session messaging.</p>
            <p>Momentum, Intensive, and Complete retain applicable supplemental resources, shared individually or through the student portal. Access is not provisioned automatically. Progress review is instructor-guided, not an automated monitoring dashboard.</p>
          </div>
          <div id="retake-support-terms">
            <h4>Conditional retake support</h4>
            <p>Momentum includes 3, Intensive includes 5, and Complete includes 8 complimentary 60-minute sessions following an unsuccessful attempt. These are each program&apos;s total retake allowance, not cumulative benefits across tiers. Starter does not include complimentary retake sessions.</p>
            <p>Retake-support sessions are available once to candidates who complete their booked coaching sessions, follow their agreed study commitments, and take the NCLEX within 90 days of their final coaching session. Retake-support sessions must be used within 6 months of a confirmed unsuccessful attempt. Coaching does not guarantee an NCLEX outcome.</p>
          </div>
        </div>
        <p className="service-note">Complete includes 24 private coaching hours plus one 3-hour Live CAT: 27 total live hours, not 27 coaching sessions plus a CAT. CAT booking access is provided manually, not automatically; post-CAT review and study-plan adjustments take place within the 24 coaching hours.</p>
        <p className="service-note">Already purchased a package? Your original purchase agreement, included benefits, session format, and booking access remain unchanged.</p>
      </section>

      <aside className="consultation-callout">
        <div><p className="eyebrow">Find your starting point</p><h3>Not sure which path fits?</h3><p>Compare the free 15-minute consultation and the $40 NCLEX Strategy Session for individualized performance review. No ongoing tutoring commitment is required.</p></div>
        <a className="button" href="#choose-session">Explore consultation options <span aria-hidden="true">&rarr;</span></a>
      </aside>
      <div className="payment-options" id="klarna-payment-options">
        <h3 className="payment-options-label">Payment and booking</h3>
        <p className="payment-options-context">{klarnaDescription}</p>
        <p className="payment-options-context">{klarnaBookingDisclosure}</p>
        <details className="payment-faq">
          <summary>How do Klarna booking links work?</summary>
          {klarnaAnswer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p><a href="mailto:studywithmadisonrn@gmail.com">Email Madison about missing booking links</a></p>
        </details>
        <p className="service-note">Purchased an eligible $40 Strategy Session? If you purchase a tutoring or coaching package within seven days, request a $40 refund to your original payment method by emailing <a href="mailto:support@studywithmadison.com">support@studywithmadison.com</a> with your package confirmation.</p>
        <p><Link className="text-link" href="/faq#payments-packages">Payment and booking FAQs</Link></p>
      </div>
    </section>
  );
}
