import type { Metadata } from "next";
import { BrandLogo } from "@/app/brand-logo";
import { CopyButton } from "@/app/copy-prompt";
import { promptCategories } from "@/lib/prompt-library";

export const metadata: Metadata = {
  title: "NCLEX AI Study Prompt Library | Study With Madison, RN",
  description:
    "Free AI prompts written by an RN tutor to help you strengthen clinical judgment, review missed questions, and plan your NCLEX study time.",
  alternates: { canonical: "/prompts" },
  openGraph: {
    title: "The NCLEX AI Study Prompt Library",
    description: "Free, copyable AI prompts to help you study smarter for the NCLEX.",
    url: "https://studywithmadison.com/prompts",
    type: "website",
  },
};

export default function PromptLibrary() {
  return <main>
    <nav className="nav" aria-label="Primary navigation">
      <BrandLogo />
      <div className="nav-links"><a href="/#how-it-works">How it works</a><a href="/#services">Services</a><a href="/blog">Blog</a><a href="/prompts">Prompts</a><a href="/#about">About</a></div>
      <a className="button button-small" href="/#choose-session">Get Started</a>
    </nav>
    <section className="blog-hero"><div><p className="eyebrow">Free resource</p><h1>The NCLEX AI Study Prompt Library</h1><p>Free AI prompts designed by an RN tutor to help you strengthen clinical judgment and make the most of your study time. Copy one, paste it into ChatGPT, Gemini, or another AI tool, and fill in the brackets.</p></div></section>
    <div className="prompt-library">
      <blockquote className="prompt-note"><strong>Check the clinical content.</strong> AI can sound confident and still be wrong, including about medications, lab values, and priorities. Verify anything questionable against a reliable nursing reference and the current <a href="https://www.nclex.com/test-plans.page" target="_blank" rel="noopener noreferrer">NCSBN NCLEX test plan</a>. Do not enter identifiable patient information, and do not paste copyrighted question-bank content without permission.</blockquote>
      <nav className="prompt-jump" aria-label="Prompt categories">
        {promptCategories.map((category) => <a key={category.id} href={`#${category.id}`}>{category.title}</a>)}
      </nav>
      <section className="prompt-compare" aria-labelledby="ask-better">
        <h2 id="ask-better">Ask AI better</h2>
        <div className="prompt-box prompt-box-weak"><div className="prompt-box-head"><span>Instead of</span></div><pre className="prompt-box-text">Explain heart failure.</pre></div>
        <div className="prompt-box"><div className="prompt-box-head"><span>Try</span></div><pre className="prompt-box-text">I&apos;m studying heart failure for the NCLEX. Explain how decreased cardiac output leads to fluid retention, connect those changes to clinical assessment findings, and then test whether I can tell left-sided from right-sided heart failure using patient scenarios. Don&apos;t reveal the answers until I respond.</pre></div>
      </section>
      {promptCategories.map((category) => <section key={category.id} id={category.id} className="prompt-category" aria-labelledby={`${category.id}-title`}>
        <h2 id={`${category.id}-title`}>{category.title}</h2>
        <p>{category.goal}</p>
        <div className="prompt-grid">
          {category.prompts.map((item) => <div className="prompt-box" key={item.title}>
            <div className="prompt-box-head"><span>{item.title}</span><CopyButton text={item.prompt} /></div>
            <pre className="prompt-box-text">{item.prompt}</pre>
          </div>)}
        </div>
      </section>)}
      <p className="prompt-more">Want the reasoning behind these? Start with <a href="/blog/how-to-use-chatgpt-to-study-for-the-nclex">How to Use ChatGPT to Study for the NCLEX</a>.</p>
    </div>
    <section className="article-cta"><p className="eyebrow light">Need a real plan?</p><h2>Let&apos;s figure out<br />what comes next.</h2><p>AI can help you practice. A tutor can help you see what is getting in your way and build a plan you can follow.</p><a className="button button-light" href="/#choose-session">Explore Your Options <span>→</span></a></section>
    <footer><BrandLogo /><p>Personalized nursing tutoring, online via Zoom.</p><a href="/#choose-session">Explore your options →</a></footer>
  </main>;
}
