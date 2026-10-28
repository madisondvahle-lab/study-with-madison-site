import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/app/brand-logo";
import { getPublishedPost, renderBlogContent } from "@/lib/blog";
import { ArticlePromptCopy } from "@/app/copy-prompt";
import ArticleReadingRail from "./reading-rail";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

const CPR_WORKSHEET_PATH = "/downloads/cpr-study-planning-worksheet.pdf";

function readTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

function ensureCprWorksheetDownload(contentHtml: string): string {
  const worksheetHeading =
    /<h2 id="(?:copy-and-complete-this-cpr-worksheet|get-the-printable-cpr-worksheet)">[\s\S]*?<\/h2>/;
  const withoutOldFields = contentHtml.replace(
    /<p>(?:<strong>)?(?:Test date and exam type|CPR area and performance label|What I noticed in unfamiliar practice questions|One example of my reasoning error in my own words|What I need to review or practice|My next study task and the time I will set aside|How I will check this again with fresh questions|Review date and what changed):[\s\S]*?<\/p>/g,
    "",
  );
  if (withoutOldFields.includes(`href="${CPR_WORKSHEET_PATH}"`)) return withoutOldFields;

  const download = `<div class="article-download"><p>Download and print the one-page worksheet to plan one area at a time. Keep the report label exactly as it appears on your CPR.</p><a href="${CPR_WORKSHEET_PATH}" download>Download the printable CPR study-planning worksheet (PDF)</a></div>`;
  return withoutOldFields.replace(worksheetHeading, (heading) => `${heading}${download}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | Study With Madison`,
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
  const contentHtml = post.slug === "how-to-read-nclex-cpr-report"
    ? ensureCprWorksheetDownload(renderBlogContent(post.content))
    : renderBlogContent(post.content);
  const sections = Array.from(
    contentHtml.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g),
    ([, id, title]) => ({
      id: id ?? "",
      title: (title ?? "").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0*39;/g, "'"),
    }),
  );

  return <main>
    <nav className="nav" aria-label="Primary navigation">
      <BrandLogo />
      <div className="nav-links"><a href="/#how-it-works">How it works</a><a href="/#services">Services</a><a href="/blog">Blog</a><a href="/contact">Contact</a><a href="/#about">About</a></div>
    </nav>
    <section className="blog-hero"><div><p className="eyebrow">NCLEX study strategy</p><h1>{post.title}</h1><p>{post.description}</p><p className="article-meta">By {post.author} · {readTime(post.content)} min read</p></div></section>
    <div className={`article-layout${sections.length > 1 ? "" : " article-layout-solo"}`}>
      {sections.length > 1 && <ArticleReadingRail sections={sections} />}
      <article className="article-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <ArticlePromptCopy />
    </div>
    <section className="article-cta"><p className="eyebrow light">Need a real plan?</p><h2>Let&apos;s figure out<br />what comes next.</h2><p>Bring your questions, CAT results, and goals. We&apos;ll identify what&apos;s getting in your way and build a plan you can actually follow.</p><a className="button button-light" href="/#choose-session">Explore Your Options <span>→</span></a></section>
    <footer><BrandLogo /><p>Personalized nursing tutoring, online via Zoom.</p><Link className="footer-faq-link" href="/faq">FAQ</Link><Link className="footer-faq-link" href="/contact">Contact</Link><Link className="footer-faq-link" href="/privacy-policy">Privacy</Link><Link className="footer-faq-link" href="/terms-of-service">Terms</Link><a href="/#choose-session">Explore your options →</a></footer>
  </main>;
}
