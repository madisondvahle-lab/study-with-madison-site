"use client";

import { useState, type ReactNode } from "react";

type CoachingTierProps = {
  id: "intensive" | "complete";
  name: string;
  kicker: string;
  price: string;
  totalHours: 18 | 21;
  checkoutLinks: Record<60 | 90, string>;
  buttonText: string;
  featured?: boolean;
  children: ReactNode;
};

export default function CoachingTier({
  id,
  name,
  kicker,
  price,
  totalHours,
  checkoutLinks,
  buttonText,
  featured = false,
  children,
}: CoachingTierProps) {
  const [duration, setDuration] = useState<60 | 90>(60);
  const formatId = `${id}-session-format`;
  const sessionCount = totalHours * 60 / duration;

  return (
    <article className={`coaching-tier${featured ? " featured" : ""}`}>
      {featured ? <span className="tier-pill">Most Supported</span> : null}
      <p className="tier-kicker">{kicker}</p>
      <h4>{name}</h4>
      <p className="tier-price">{price}</p>
      <fieldset className="session-format" aria-describedby="coaching-format-explanation">
        <legend>Session format</legend>
        <div className="session-format-options">
          {([60, 90] as const).map((minutes) => (
            <label className="session-format-option" key={minutes}>
              <input
                type="radio"
                name={formatId}
                value={minutes}
                checked={duration === minutes}
                onChange={() => setDuration(minutes)}
              />
              <span>{minutes}-Minute Sessions</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="tier-meta" aria-live="polite" aria-atomic="true">
        {sessionCount} private {duration}-minute sessions
        <span className="tier-hours">{totalHours} total private coaching hours</span>
      </p>
      {children}
      {featured ? (
        <p className="tier-booking-note" id={`${formatId}-cat`}>
          After purchase, Madison personally provides booking instructions for your one included Live CAT simulation. CAT booking access is provided manually, not automatically.
        </p>
      ) : null}
      <a
        className="button"
        href={checkoutLinks[duration]}
        aria-label={`${buttonText}: ${sessionCount} ${duration}-minute sessions for ${price}`}
        aria-describedby={featured ? `${formatId}-cat` : undefined}
      >
        {buttonText} <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
