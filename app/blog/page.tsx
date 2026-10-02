import type { Metadata } from "next";
import { getPublishedPost, renderBlogContent } from "@/lib/blog";
import { legacyPost } from "@/lib/legacy-post";

export const metadata: Metadata = {
  title: "NCLEX Study Strategy | Study With Madison, RN",
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
const consultation = "https://calendly.com/studywithmadisonrn/free-consultation";

function readTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export default async function BlogPage() {
  const post = await getPublishedPost(legacyPost.slug) ?? legacyPost;

  return <main>
    <nav className="nav" aria-label="Primary navigation">
      <a className="brand" href="/"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a>
      <div className="nav-links"><a href="/#how-it-works">How it works</a><a href="/#services">Services</a><a href="/blog">Blog</a><a href="/#about">About</a></div>
      <a className="button button-small" href={consultation}>Free consultation</a>
    </nav>
    <section className="blog-hero"><div><p className="eyebrow">NCLEX study strategy</p><h1>{post.title}</h1><p>{post.description}</p><p className="article-meta">By {post.author} · {readTime(post.content)} min read</p></div></section>
    <article className="article-content" dangerouslySetInnerHTML={{ __html: renderBlogContent(post.content) }} />
    <section className="article-cta"><p className="eyebrow light">Need a real plan?</p><h2>Let&apos;s figure out<br />what comes next.</h2><p>Bring your questions, CAT results, and goals. We&apos;ll identify what&apos;s getting in your way and build a plan you can actually follow.</p><a className="button button-light" href={consultation}>Book a free consultation <span>→</span></a></section>
    <footer><a className="brand" href="/"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a><p>Personalized nursing tutoring, online via Zoom.</p><a href={consultation}>Book a free consultation →</a></footer>
  </main>;
}
