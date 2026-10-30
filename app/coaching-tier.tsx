import type { CoachingProgram } from "@/lib/coaching-programs";

export default function CoachingTier({ program }: { program: CoachingProgram }) {
  return (
    <article
      className={`coaching-tier${program.id === "intensive" ? " featured" : ""}`}
      id={`nclex-${program.id}`}
      aria-labelledby={`${program.id}-title`}
    >
      <div className="tier-label-space">
        {program.label ? <span className="tier-pill">{program.label}</span> : null}
      </div>
      <h4 id={`${program.id}-title`}>{program.name}</h4>
      <p className="tier-price">{program.price}</p>
      <p className="tier-meta">
        <strong>{program.hours} private coaching hours</strong>
        <span className="tier-hours">{program.hours} &times; 60-minute sessions</span>
        <span className="tier-hours">{program.scheduling}</span>
        {program.catHours > 0 ? (
          <span className="tier-live-total">+ one 3-hour Live CAT &middot; 27 total live hours</span>
        ) : null}
      </p>
      <p className="tier-fit">{program.fit}</p>
      <ul>{program.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
      {program.retakeSessions > 0 ? (
        <p className="tier-promise">
          <strong>Conditional retake support:</strong> {program.retakeSessions} complimentary 60-minute sessions if you do not pass.{" "}
          <a href="#retake-support-terms">Eligibility conditions apply.</a>
        </p>
      ) : null}
      {program.catHours > 0 ? (
        <p className="tier-booking-note">
          Madison personally provides booking instructions for your one included Live CAT after purchase.
          Post-CAT review uses regular coaching hours.
        </p>
      ) : null}
      <a className="button" href={program.href} aria-label={`Choose ${program.shortName}: ${program.price}, ${program.hours} private coaching hours${program.catHours > 0 ? " plus one 3-hour Live CAT" : ""}`}>
        Choose {program.shortName} <span aria-hidden="true">&rarr;</span>
      </a>
    </article>
  );
}
