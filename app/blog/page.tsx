import type { Metadata } from "next";
import { listPublishedPosts } from "@/lib/blog";
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

function readTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export default async function BlogPage() {
  const storedPosts = await listPublishedPosts();
  const posts = storedPosts.length ? storedPosts : [legacyPost];

  return <main>
    <nav className="nav" aria-label="Primary navigation">
      <a className="brand" href="/"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a>
      <div className="nav-links"><a href="/#how-it-works">How it works</a><a href="/#services">Services</a><a href="/blog">Blog</a><a href="/#about">About</a></div>
      <a className="button button-small" href="/#choose-session">Get Started</a>
    </nav>
    <section className="blog-hero"><div><p className="eyebrow">NCLEX study strategy</p><h1>Practical guidance for your next step.</h1><p>Clear, focused study strategy for nursing students and NCLEX test-takers.</p></div></section>
    <section className="post-list" aria-label="Published blog posts">
      {posts.map((post) => <article className="featured-post" key={post.id}>
        <p className="post-label">NCLEX study strategy</p>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <p className="article-meta">By {post.author} · {readTime(post.content)} min read</p>
        <a className="button" href={`/blog/${post.slug}`}>Read article <span>→</span></a>
      </article>)}
    </section>
    <section className="article-cta"><p className="eyebrow light">Need a real plan?</p><h2>Let&apos;s figure out<br />what comes next.</h2><p>Bring your questions, CAT results, and goals. We&apos;ll identify what&apos;s getting in your way and build a plan you can actually follow.</p><a className="button button-light" href="/#choose-session">Explore Your Options <span>→</span></a></section>
    <footer><a className="brand" href="/"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a><p>Personalized nursing tutoring, online via Zoom.</p><a href="/#choose-session">Explore your options →</a></footer>
  </main>;
}
