import type { Metadata } from "next";
import { BrandLogo } from "@/app/brand-logo";
import { listPublishedPosts } from "@/lib/blog";
import { categorizePost } from "@/lib/blog-categories";
import { legacyPost } from "@/lib/legacy-post";
import { BlogIndex } from "./blog-index";
import "./blog-index.css";

export const metadata: Metadata = {
  title: "NCLEX Study Strategy | Study With Madison",
  description: legacyPost.description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: legacyPost.title,
    description: legacyPost.description,
    url: "https://studywithmadison.com/blog",
    type: "article",
  },
};

export const dynamic = "force-dynamic";

const FEATURED_SLUG = "why-do-i-keep-failing-the-nclex";

function readTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export default async function BlogPage() {
  const storedPosts = await listPublishedPosts();
  const posts = (storedPosts.length ? storedPosts : [legacyPost]).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    author: post.author,
    minutes: readTime(post.content),
    category: categorizePost(post),
  }));

  return <main>
    <nav className="nav" aria-label="Primary navigation">
      <BrandLogo />
      <div className="nav-links"><a href="/#how-it-works">How it works</a><a href="/#services">Services</a><a href="/blog">Blog</a><a href="/#about">About</a></div>
      <a className="button button-small" href="/#choose-session">Get Started</a>
    </nav>
    <header className="bx-masthead">
      <div className="bx-masthead-inner">
        <h1>Nursing education, made clear.</h1>
        <p>Practical, clinically grounded guides on NCLEX strategy, clinical judgment, and study planning for nursing students and test-takers, written by Madison.</p>
      </div>
    </header>
    <BlogIndex posts={posts} featuredSlug={FEATURED_SLUG} />
    <section className="bx-resources" aria-labelledby="bx-resources-title">
      <div className="bx-resources-inner">
        <h2 id="bx-resources-title">Free resources</h2>
        <ul>
          <li><a href="/blog/prompts"><span><strong>NCLEX AI Study Prompt Library</strong>Copyable prompts for quizzing yourself, reviewing missed questions, and planning your study time.</span><span aria-hidden="true">→</span></a></li>
          <li><a href="/downloads/cpr-study-planning-worksheet.pdf" download><span><strong>CPR study-planning worksheet</strong>A one-page PDF for turning your Candidate Performance Report into a focused plan.</span><span aria-hidden="true">↓</span></a></li>
        </ul>
      </div>
    </section>
    <section className="bx-cta" aria-labelledby="bx-cta-title">
      <div className="bx-cta-inner">
        <h2 id="bx-cta-title">Reading is the start. A plan is what moves you forward.</h2>
        <p>Bring your questions, results, and exam date. We&apos;ll work out what is getting in your way and build a plan you can follow.</p>
        <div className="bx-cta-actions">
          <a className="button button-light" href="/#choose-session">Explore your options <span>→</span></a>
          <a className="bx-cta-link" href="/#how-it-works">How tutoring works</a>
        </div>
      </div>
    </section>
    <footer><BrandLogo /><p>Personalized nursing tutoring, online via Zoom.</p><a href="/#choose-session">Explore your options →</a></footer>
  </main>;
}
