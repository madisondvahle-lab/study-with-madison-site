const calendly = {
  consultation: "https://calendly.com/studywithmadisonrn/free-consultation",
  single: "https://calendly.com/studywithmadisonrn/60-min-single-session",
  three: "https://calendly.com/studywithmadisonrn/packages/2d195e26-b850-4682-a30f-14de5c8361f2",
  five: "https://calendly.com/studywithmadisonrn/packages/274033c2-9972-4d01-9b6d-c620ed5112b2",
  eight: "https://calendly.com/studywithmadisonrn/packages/72afc34c-f344-47ad-802c-2e95db646cec",
  momentum: "https://calendly.com/studywithmadisonrn/packages/5b6fa8d0-259e-4628-a5ad-7f7006ed279c",
  intensive: "https://calendly.com/studywithmadisonrn/packages/8cd657fe-bb52-454a-9be9-ffdab8505466",
  complete: "https://calendly.com/studywithmadisonrn/packages/24aac88d-0760-484e-ad1a-d64609049825",
};

const portal = {
  readiness: "https://madisondvahle-lab.github.io/nclex-success-center/free-readiness-check.html",
  signIn: "https://madisondvahle-lab.github.io/nclex-success-center/student-login.html",
};

const packages = [
  { name: "Strategy Session", price: "$50", detail: "1 private 60-minute session", copy: "A focused review of your results, question strategy, a difficult topic, or your next steps.", href: calendly.single },
  { name: "3-Session Package", price: "$120", detail: "3 private 60-minute sessions", copy: "A clear starting point for focused content review, question strategy, and a stronger plan.", href: calendly.three },
  { name: "5-Session Package", price: "$175", detail: "5 private 60-minute sessions", copy: "More time to address patterns, practice application, and build consistency.", href: calendly.five },
  { name: "8-Session Package", price: "$260", detail: "8 private 60-minute sessions", copy: "Ongoing coaching for students who benefit from steady guidance and accountability.", href: calendly.eight },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Study With Madison, RN",
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
      <nav className="nav" aria-label="Primary navigation" style={{ flexWrap: "wrap" }}>
        <a className="brand" href="#top" aria-label="Study With Madison home"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a>
        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#services">Services</a>
          <a href="#nclex-coaching">NCLEX coaching</a>
          <a href="#student-portal">Student portal</a>
          <a href="/blog">Blog</a>
          <a href="#about">About</a>
        </div>
        <a className="button" href={portal.signIn} style={{ padding: "12px 18px", fontSize: ".82rem", whiteSpace: "nowrap", marginLeft: "auto", flexShrink: 0 }}>Student Login <span>→</span></a>
        <a className="button button-small" href={calendly.consultation}>Free consultation</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Personalized nursing tutoring · Online via Zoom</p>
          <h1>Feel prepared for the exam <em>and</em> the nurse you&apos;re becoming.</h1>
          <p className="hero-text">One-on-one nursing tutoring for students who want clearer understanding, sharper clinical judgment, and real confidence in their next step.</p>
          <div className="hero-actions">
            <a className="button" href={calendly.consultation}>Book your free consultation <span>→</span></a>
            <a className="text-link" href="#services">Explore tutoring options <span>↓</span></a>
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
          <article><span className="step-number">01</span><h3>Start with a free consult</h3><p>Tell me what feels hard, what you&apos;re preparing for, and what kind of support would help most.</p></article>
          <article><span className="step-number">02</span><h3>Get a plan made for you</h3><p>We focus on your real courses, your exam timeline, and the gaps that deserve your attention.</p></article>
          <article><span className="step-number">03</span><h3>Build confidence, session by session</h3><p>Learn to break down questions, connect concepts, and trust your clinical thinking.</p></article>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-heading service-heading">
          <p className="eyebrow">Ways to work together</p>
          <h2>Find the support<br />that moves you forward.</h2>
          <p className="section-intro">Whether you need help with one hard topic or want a complete NCLEX plan, you have a clear next step.</p>
          <a className="text-link" href={calendly.consultation}>Book a free consultation <span>→</span></a>
        </div>

        <div className="support-paths" aria-label="Choose your support path">
          <article className="support-path">
            <p className="eyebrow">For focused help</p>
            <h3>Targeted tutoring</h3>
            <p>Get clear on a difficult topic, upcoming exam, question strategy, or your next study step.</p>
            <p className="support-path-meta">Private sessions from <strong>$50</strong></p>
            <a href="#tutoring-options">Explore tutoring options <span>→</span></a>
          </article>
          <article className="support-path support-path-featured">
            <p className="eyebrow">For NCLEX candidates</p>
            <h3>Personalized NCLEX coaching</h3>
            <p>Build a study roadmap with recurring coaching, targeted practice, and accountability between sessions.</p>
            <p className="support-path-meta">12-session coaching plans from <strong>$400</strong></p>
            <a className="button button-light" href="#nclex-coaching">Compare NCLEX coaching <span>→</span></a>
          </article>
        </div>

        <div className="service-group" id="tutoring-options">
          <div className="service-group-heading">
            <div><p className="eyebrow">Targeted tutoring</p><h3>Flexible help, when you need it.</h3></div>
            <p>For course exams, content review, question strategy, or a focused next step.</p>
          </div>
          <div className="package-grid">
            {packages.map((item) => <article className="package-card" key={item.name}><p className="package-detail">{item.detail}</p><h4>{item.name}</h4><p className="package-price">{item.price}</p><p>{item.copy}</p><a className="button package-button" href={item.href}>Choose this option <span>→</span></a></article>)}
          </div>
        </div>

        <div className="service-group coaching-group" id="nclex-coaching">
          <div className="service-group-heading">
            <div><p className="eyebrow">Personalized NCLEX coaching</p><h3>More structure. More support.</h3></div>
            <p>For candidates who want a personalized study plan, consistent coaching, and progress support between sessions.</p>
          </div>
          <p className="coaching-context">Your readiness assessment, CPR, prior performance, timeline, and goals help guide the level of support that makes sense.</p>
          <p className="coaching-progression" aria-label="Coaching package progression"><span>Start with a clear plan</span><span>Build steady momentum</span><span>Get full support</span></p>
          <div className="coaching-tier-grid">
            <article className="coaching-tier">
              <p className="tier-kicker">Build your foundation</p>
              <h4>NCLEX Momentum Coaching</h4>
              <p className="tier-price">$400</p>
              <p className="tier-meta">12 private 60-minute sessions</p>
              <p className="tier-fit"><strong>Best for:</strong> creating a clear plan and staying consistent.</p>
              <p className="tier-promise"><strong>Retake-support promise:</strong> 3 complimentary 60-minute sessions if you do not pass.</p>
              <p>A structured coaching plan for students who want consistency, a clear roadmap, and meaningful progress between sessions.</p>
              <ul>
                <li>Readiness and CPR review</li>
                <li>Personalized study roadmap</li>
                <li>Targeted practice assignments</li>
                <li>Private progress portal</li>
                <li>Mid-plan check-in and adjustment</li>
              </ul>
              <a className="button" href={calendly.momentum}>Choose Momentum Coaching <span>→</span></a>
            </article>

            <article className="coaching-tier">
              <p className="tier-kicker">Build steady momentum</p>
              <h4>NCLEX Intensive Coaching</h4>
              <p className="tier-price">$840</p>
              <p className="tier-meta">12 private 90-minute sessions</p>
              <p className="tier-fit"><strong>Best for:</strong> deeper content, clinical judgment, and strategy support.</p>
              <p className="tier-promise"><strong>Retake-support promise:</strong> 5 complimentary 60-minute sessions if you do not pass.</p>
              <p>For candidates who need a tailored plan and consistent support across content, clinical judgment, and question strategy.</p>
              <ul>
                <li>12 private 90-minute coaching sessions</li>
                <li>Diagnostic and CPR review</li>
                <li>Personalized study roadmap</li>
                <li>Targeted practice assignments</li>
                <li>Private progress portal</li>
              </ul>
              <a className="button" href={calendly.intensive}>Choose Intensive Coaching <span>→</span></a>
            </article>

            <article className="coaching-tier featured">
              <span className="tier-pill">Most supported</span>
              <p className="tier-kicker">Get full support</p>
              <h4>NCLEX Complete Support + Live CAT</h4>
              <p className="tier-price">$1,350</p>
              <p className="tier-meta">Complete coaching experience</p>
              <p className="tier-value">Includes a live CAT simulation, detailed review, and priority support between sessions.</p>
              <p className="tier-fit"><strong>Best for:</strong> high-touch accountability before test day.</p>
              <p className="tier-promise"><strong>Retake-support promise:</strong> 8 complimentary 60-minute sessions if you do not pass.</p>
              <p>For candidates who want close accountability, a personalized weekly structure, and a realistic adaptive test experience before test day.</p>
              <ul>
                <li>Everything in NCLEX Intensive Coaching</li>
                <li>Personalized weekly study schedule and check-ins</li>
                <li>Priority text support between sessions, with coaching replies Monday through Friday within one business day</li>
                <li>One live adaptive CAT simulation with a detailed post-CAT plan update</li>
              </ul>
              <a className="button" href={calendly.complete}>Choose Complete Support <span>→</span></a>
            </article>
          </div>
          <p className="coaching-note">All coaching is individualized. A package is selected after reviewing your readiness assessment and goals. Retake-support sessions are available once to candidates who complete their booked coaching sessions, follow their agreed study commitments, and take the NCLEX within 90 days of their final coaching session. Retake-support sessions must be used within 6 months of a confirmed unsuccessful attempt. One live CAT appointment includes up to three reserved hours; candidates with approved testing accommodations may arrange additional reserved time in advance. Coaching does not guarantee an NCLEX outcome.</p>
        </div>
      </section>

      <section className="portal" id="student-portal">
        <div><p className="eyebrow">Free tools + student access</p><h2>Your NCLEX Success Center.</h2><p>Start with a free readiness check, then keep your personalized study priorities, resources, and tutoring progress in one private place.</p><a className="button" href={portal.readiness}>Take the free readiness check <span>→</span></a></div>
        <div className="portal-card"><p className="portal-label">Student access</p><h3>Built around your progress.</h3><ul><li>Study plans and weekly priorities</li><li>Assessment review and focus areas</li><li>Targeted resources and tutoring notes</li></ul><p className="portal-note">Current tutoring student? Sign in securely with the email you use for tutoring.</p><a className="portal-sign-in" href={portal.signIn}>Student sign in <span>→</span></a></div>
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

      <section className="final-cta"><p className="eyebrow light">Your next step can be simple</p><h2>Let&apos;s make a plan<br />that feels doable.</h2><p>Your free consultation is a no-pressure conversation about what you need and how I can help.</p><a className="button button-light" href={calendly.consultation}>Book your free consultation <span>→</span></a></section>

      <footer><a className="brand" href="#top"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a><p>Personalized nursing tutoring, online via Zoom.</p><a href={calendly.consultation}>Book a free consultation →</a></footer>
    </main>
  );
}
