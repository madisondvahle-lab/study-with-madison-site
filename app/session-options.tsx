import { CHOOSE_SESSION_ID, FREE_CONSULTATION_URL, STRATEGY_SESSION_URL } from "../lib/booking";

export function SessionOptions({ packagesHref = "#services" }: { packagesHref?: string }) {
  return (
    <section className="session-options" id={CHOOSE_SESSION_ID} aria-labelledby="session-options-title">
      <div className="session-options-head">
        <p className="eyebrow">Explore your options</p>
        <h2 id="session-options-title">Not sure which session to book?</h2>
        <p>Not everyone needs ongoing tutoring. Sometimes you just need help figuring out what&apos;s keeping you from making progress.</p>
      </div>
      <div className="session-grid">
        <article className="session-card">
          <p className="session-meta">15 minutes · Free</p>
          <h3>Free Consultation</h3>
          <ul>
            <li>Introductory conversation</li>
            <li>Discuss your goals and challenges</li>
            <li>Learn about tutoring options</li>
            <li>Decide whether tutoring is a good fit</li>
          </ul>
          <a className="button" href={FREE_CONSULTATION_URL}>Book free consultation <span>→</span></a>
        </article>
        <article className="session-card session-card-featured">
          <p className="session-meta">45 minutes · $40</p>
          <h3>NCLEX Strategy Session</h3>
          <ul>
            <li>Detailed review of available performance reports (CPR, CAT, readiness)</li>
            <li>Guided question analysis</li>
            <li>Identification of potential performance patterns</li>
            <li>Individualized recommendations</li>
            <li>No tutoring commitment required</li>
            <li>Eligible for a $40 tutoring package credit if you purchase within seven days</li>
          </ul>
          {STRATEGY_SESSION_URL ? (
            <a className="button" href={STRATEGY_SESSION_URL}>Book strategy session <span>→</span></a>
          ) : (
            <span className="button session-pending" aria-disabled="true">Booking link coming soon</span>
          )}
        </article>
      </div>
      <p className="session-footnote">The free consultation is a brief introduction, not a performance review or study-planning session. <a className="text-link" href={packagesHref}>View tutoring packages <span>↓</span></a></p>
      <p className="session-footnote">Strategy Session credit: if you purchase a tutoring package within seven days of your session, the $40 session fee is refunded to your original payment method after your package purchase. Just email support@studywithmadison.com with your package confirmation.</p>
    </section>
  );
}
