import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPost, renderBlogContent } from "@/lib/blog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };


function readTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | Study With Madison, RN`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://studywithmadison.com/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function PublishedPost({ params }: Props) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();

  return <main>
    <nav className="nav" aria-label="Primary navigation">
      <a className="brand" href="/"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a>
      <div className="nav-links"><a href="/#how-it-works">How it works</a><a href="/#services">Services</a><a href="/blog">Blog</a><a href="/#about">About</a></div>
    </nav>
    <section className="blog-hero"><div><p className="eyebrow">NCLEX study strategy</p><h1>{post.title}</h1><p>{post.description}</p><p className="article-meta">By {post.author} · {readTime(post.content)} min read</p></div></section>
    <article className="article-content" dangerouslySetInnerHTML={{ __html: renderBlogContent(post.content) }} />
    <section className="article-cta"><p className="eyebrow light">Need a real plan?</p><h2>Let&apos;s figure out<br />what comes next.</h2><p>Bring your questions, CAT results, and goals. We&apos;ll identify what&apos;s getting in your way and build a plan you can actually follow.</p><a className="button button-light" href="/#choose-session">Explore Your Options <span>→</span></a></section>
    <footer><a className="brand" href="/"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a><p>Personalized nursing tutoring, online via Zoom.</p><a href="/#choose-session">Explore your options →</a></footer>
  </main>;
}
