import { BrandLogo } from "./brand-logo";
import Link from "next/link";
import { SessionOptions } from "./session-options";
import { FREE_CONSULTATION_URL, STRATEGY_SESSION_URL } from "../lib/booking";
import TutoringOptions from "./tutoring-options";
import HomeNavigation from "./home-navigation";

const portal = {
  signIn: "https://madisondvahle-lab.github.io/nclex-success-center/student-login.html",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Study With Madison",
    url: "https://studywithmadison.com/",
    description: "Personalized online nursing tutoring for exam preparation, HESI/TEAS, and NCLEX strategy.",
    provider: {
      "@type": "Person",
      name: "Madison Vahle",
      jobTitle: "Registered Nurse and Nursing Tutor",
    },
    areaServed: "US",
    serviceType: ["NCLEX tutoring", "Nursing tutoring", "HESI preparation", "TEAS preparation"],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="nav home-nav" aria-label="Primary navigation">
        <BrandLogo href="#top" />
        <HomeNavigation />
        <a className="button" href={portal.signIn} style={{ padding: "12px 18px", fontSize: ".82rem", whiteSpace: "nowrap", marginLeft: "auto", flexShrink: 0 }}>Student Login <span>→</span></a>
        <a className="button button-small" href="#choose-session">Get Started</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Personalized nursing tutoring · Online via Zoom</p>
          <h1>Feel prepared for the exam <em>and</em> the nurse you&apos;re becoming.</h1>
          <p className="hero-text">One-on-one nursing tutoring for students who want clearer understanding, sharper clinical judgment, and real confidence in their next step.</p>
          <div className="hero-actions">
            <a className="button" href="#choose-session">Explore Your Options <span>→</span></a>
            <a className="text-link" href="#how-it-works">How Tutoring Works <span>↓</span></a>
          </div>
          <div className="trust-row" aria-label="Credentials">
            <div><strong>17 years</strong><span>RN experience</span></div>
            <div><strong>1:1</strong><span>personalized support</span></div>
            <div><strong>Zoom</strong><span>meet from anywhere</span></div>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="portrait-shape" />
          <img className="hero-portrait" src="/madison-headshot.png" alt="Madison, registered nurse and nursing tutor" />
          <div className="portrait-note"><span className="quote-mark">“</span>We&apos;ll make the hard stuff make sense.<span className="quote-mark quote-close">”</span></div>
        </div>
      </section>

      <section className="intro-band" aria-label="Tutoring focus areas">
        <p>I help nursing students with</p>
        <div><span>NCLEX strategy</span><span>HESI / TEAS prep</span><span>Exam preparation</span><span>Clinical judgment</span></div>
      </section>

      <section className="blog-preview" aria-labelledby="blog-title">
        <div><p className="eyebrow">From the blog</p><h2 id="blog-title">Less overwhelm.<br /><em>More strategy.</em></h2><p>Practical NCLEX study guidance for the moments you are tempted to buy one more resource instead of making a clear plan.</p><a className="text-link" href="/blog">Visit the blog <span>→</span></a></div>
        <article className="featured-post"><p className="post-label">Featured article · 7 min read</p><h3>You Don&apos;t Need Another Q Bank — You Need a Plan.</h3><p>More questions are not automatically the answer. Learn how to turn the study tools you already have into a plan that actually moves you forward.</p><a className="button" href="/blog">Read the article <span>→</span></a></article>
      </section>

      <section className="section how" id="how-it-works">
        <div className="section-heading"><p className="eyebrow">A calmer way to get support</p><h2>Know what to study.<br />Know <em>why</em> it matters.</h2></div>
        <div className="steps">
          <article><span className="step-number">01</span><h3>Start with a conversation</h3><p>Tell me what feels hard, what you&apos;re preparing for, and what kind of support would help most.</p></article>
          <article><span className="step-number">02</span><h3>Get a plan made for you</h3><p>We focus on your real courses, your exam timeline, and the gaps that deserve your attention.</p></article>
          <article><span className="step-number">03</span><h3>Build confidence, session by session</h3><p>Learn to break down questions, connect concepts, and trust your clinical thinking.</p></article>
        </div>
      </section>

      <SessionOptions />

      <TutoringOptions />

      <section className="portal" id="student-portal">
        <div><p className="eyebrow">Tutoring options + student access</p><h2>Choose your next step.</h2><p>Exploring tutoring? Start with a free 15-minute consultation. Want individualized review of your NCLEX performance reports and recommendations? Book a 45-minute Strategy Session for $40.</p><div className="portal-actions"><a className="button" href={FREE_CONSULTATION_URL}>Book free consultation <span>→</span></a><a className="text-link" href={STRATEGY_SESSION_URL}>Book the $40 Strategy Session <span>→</span></a></div></div>
        <div className="portal-card"><p className="portal-label">Student access</p><h3>Support for your next step.</h3><ul><li>Supplemental study guides and educational resources</li><li>Targeted remediation materials</li><li>Personalized learning support</li></ul><p className="portal-note">Resources are shared individually or through the learning portal, as applicable to your needs and purchased services. Current tutoring student? Sign in with the email you use for tutoring.</p><a className="portal-sign-in" href={portal.signIn}>Student sign in <span>→</span></a></div>
      </section>

      <section className="section about" id="about">
        <div className="about-photo"><img src="/madison-headshot.png" alt="Madison smiling" /></div>
        <div className="about-copy"><p className="eyebrow">Meet Madison</p><h2>You deserve a tutor who understands the pressure.</h2><p>I&apos;m an RN with 17 years of experience spanning ICU, cardiac care, emergency nursing, clinical education, and nursing leadership.</p><p>I&apos;ve worked extensively with nursing students, new graduate nurses, and preceptors—including developing a nurse residency and preceptor program to support nurses as they transitioned into practice.</p><p>Now, while pursuing my PMHNP degree, I provide personalized tutoring that helps nursing students simplify complex concepts, strengthen critical thinking, and gain confidence in their abilities.</p><figure className="graduation-photo"><img src="/madison-nursing-school.png" alt="Madison at her nursing school graduation" /></figure></div>
      </section>

      <section className="testimonials">
        <p className="eyebrow">Kind words from students</p><h2>Support that stays with you<br />after the session ends.</h2>
        <div className="testimonial-grid">
          <figure><blockquote>“She asks for your study materials to ensure we&apos;re covering exactly what you&apos;re going over in class. Her study guides are easy to remember and very beneficial.”</blockquote><figcaption>Jack M. <span>· Nursing Student</span></figcaption></figure>
          <figure className="featured-quote"><blockquote>“An amazing teacher—super patient, helpful, and always makes sure everything is fully understood. Definitely a 10/10.”</blockquote><figcaption>Lauren C. <span>· HESI Prep</span></figcaption></figure>
          <figure><blockquote>“She breaks down content in a way that makes sense and makes sure you&apos;re comfortable asking questions.”</blockquote><figcaption>Hayden H. <span>· Nurse</span></figcaption></figure>
          <figure><blockquote>“On my first attempt I clicked way too many answers and probably lost points. This time, I did what you told me: I didn&apos;t select answers I wasn&apos;t familiar with. Thank you so much—I couldn&apos;t have done it without you.”</blockquote><figcaption>Mimi <span>· NCLEX Prep</span></figcaption></figure>
        </div>
      </section>

      <section className="final-cta"><p className="eyebrow light">Your next step can be simple</p><h2>Let&apos;s make a plan<br />that feels doable.</h2><p>Not everyone needs ongoing tutoring. Sometimes you just need help figuring out what&apos;s keeping you from making progress. Pick the option that fits.</p><a className="button button-light" href="#choose-session">Get Started <span>→</span></a></section>

      <footer><BrandLogo href="#top" /><p>Personalized nursing tutoring, online via Zoom.</p><Link className="footer-faq-link" href="/faq">FAQ</Link><Link className="footer-faq-link" href="/contact">Contact</Link><Link className="footer-faq-link" href="/privacy-policy">Privacy</Link><Link className="footer-faq-link" href="/terms-of-service">Terms</Link><a href="#choose-session">Explore your options →</a></footer>
    </main>
  );
}
