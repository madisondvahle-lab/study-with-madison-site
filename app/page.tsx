const calendly = {
  consultation: "https://calendly.com/studywithmadisonrn/free-consultation",
  single: "https://calendly.com/studywithmadisonrn/60-min-single-session",
  three: "https://calendly.com/studywithmadisonrn/packages/2d195e26-b850-4682-a30f-14de5c8361f2",
  five: "https://calendly.com/studywithmadisonrn/packages/274033c2-9972-4d01-9b6d-c620ed5112b2",
  eight: "https://calendly.com/studywithmadisonrn/packages/72afc34c-f344-47ad-802c-2e95db646cec",
  intensive: "https://calendly.com/studywithmadisonrn/packages/5b6fa8d0-259e-4628-a5ad-7f7006ed279c",
};

const portal = {
  readiness: "https://madisondvahle-lab.github.io/nclex-success-center/free-readiness-check.html",
  signIn: "https://madisondvahle-lab.github.io/nclex-success-center/student-login.html",
};

const packages = [
  { name: "Single Session", price: "$50", detail: "60 minutes", copy: "A focused 1:1 session for a difficult topic, an upcoming exam, or a study-strategy reset.", href: calendly.single },
  { name: "Starter Pack", price: "$120", detail: "3 sessions · $40/session", copy: "A supportive starting point for building momentum and a clear plan.", href: calendly.three },
  { name: "Momentum Pack", price: "$175", detail: "5 sessions · $35/session", copy: "Consistent support for a challenging unit, exam preparation, or stronger routines.", href: calendly.five },
  { name: "8-Session Package", price: "$260", detail: "8 sessions · $32.50/session", copy: "For students who want steady guidance and time to build confidence across several topics.", href: calendly.eight },
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation" style={{ flexWrap: "wrap" }}>
        <a className="brand" href="#top" aria-label="Study With Madison home"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a>
        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#services">Services</a>
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
        <div className="section-heading service-heading"><p className="eyebrow">Choose your level of support</p><h2>Tutoring that meets you<br />where you are.</h2><p className="section-intro">Not sure which option fits? Begin with a free consultation and we&apos;ll decide together.</p><a className="text-link" href={calendly.consultation}>Book a free consultation <span>→</span></a></div>
        <div className="package-grid">
          {packages.map((item) => <article className="package-card" key={item.name}><p className="package-detail">{item.detail}</p><h3>{item.name}</h3><p className="package-price">{item.price}</p><p>{item.copy}</p><a href={item.href}>Book this option <span>→</span></a></article>)}
        </div>
      </section>

      <section className="intensive">
        <div><p className="eyebrow light">High-touch NCLEX support</p><h2>NCLEX Intensive<br /><em>12 sessions · $400</em></h2><p>This is more than occasional tutoring. It&apos;s a personalized, accountability-centered program for students who want a clear plan and consistent guidance as they prepare for NCLEX.</p><a className="button button-light" href={calendly.intensive}>Learn about the Intensive <span>→</span></a></div>
        <ul><li><span>✓</span> Twelve private 60-minute Zoom sessions</li><li><span>✓</span> Personalized test-day roadmap, updated as you progress</li><li><span>✓</span> 24/7 direct text support for your personalized NCLEX plan</li><li><span>✓</span> Priority booking with preferred coaching-session availability</li><li><span>✓</span> Flexible rescheduling and complimentary cancellation options</li><li><span>✓</span> Shared review of assessments, trends, and weak areas</li><li><span>✓</span> Priority coaching support between sessions, with replies within 24 hours</li></ul>
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
