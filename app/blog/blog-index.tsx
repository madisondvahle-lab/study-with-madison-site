"use client";

import { useMemo, useState } from "react";
import { blogCategories, type BlogCategory, type BlogCategoryId } from "@/lib/blog-categories";

export type IndexPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  minutes: number;
  category: BlogCategory;
};

function Glyph({ id }: { id: BlogCategoryId }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg className="bx-glyph" viewBox="0 0 120 80" aria-hidden="true" focusable="false">
      {id === "retake" && <g {...shared}><path d="M78 24a26 26 0 1 0 6 20" /><path d="M80 10v16H64" /></g>}
      {id === "clinical" && <g {...shared}><path d="M8 44h26l8-24 14 48 12-36 7 12h37" /></g>}
      {id === "planning" && <g {...shared}><rect x="22" y="14" width="76" height="56" /><path d="M22 30h76M42 8v12M78 8v12M38 44h10M56 44h10M74 44h10M38 56h10M56 56h10" /></g>}
      {id === "exam" && <g {...shared}><rect x="34" y="10" width="52" height="62" /><path d="M50 10v-4h20v4M44 30l5 5 9-10M44 52l5 5 9-10M66 32h12M66 54h12" /></g>}
      {id === "ai" && <g {...shared}><path d="M22 14h76v42H54L36 70V56H22z" /><path d="M44 35h32M44 27h20M44 43h24" /></g>}
      {id === "strategy" && <g {...shared}><circle cx="60" cy="40" r="30" /><circle cx="60" cy="40" r="18" /><circle cx="60" cy="40" r="5" /><path d="M60 4v14M60 62v14M24 40h14M82 40h14" /></g>}
    </svg>
  );
}

function Plate({ category, large = false }: { category: BlogCategory; large?: boolean }) {
  return (
    <div className={`bx-plate bx-tone-${category.tone}${large ? " bx-plate-large" : ""}`} aria-hidden="true">
      <Glyph id={category.id} />
    </div>
  );
}

function Meta({ post }: { post: IndexPost }) {
  return (
    <p className="bx-meta">
      <span>{post.category.label}</span>
      <span aria-hidden="true">·</span>
      <span>{post.minutes} min read</span>
    </p>
  );
}

export function BlogIndex({ posts, featuredSlug }: { posts: IndexPost[]; featuredSlug: string }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<BlogCategoryId | "all">("all");

  const presentCategories = useMemo(
    () => blogCategories.filter((category) => posts.some((post) => post.category.id === category.id)),
    [posts],
  );
  const featured = posts.find((post) => post.slug === featuredSlug) ?? posts[0];
  const filtering = active !== "all" || query.trim() !== "";

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((post) => {
      if (active !== "all" && post.category.id !== active) return false;
      const haystack = `${post.title} ${post.description} ${post.category.label}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [posts, query, active]);

  const showFeatured = !filtering && featured;
  const gridPosts = showFeatured ? results.filter((post) => post.id !== featured.id) : results;

  return (
    <>
      <div className="bx-toolbar">
        <div className="bx-toolbar-inner">
          <form className="bx-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="bx-search-input" className="sr-only">Search articles</label>
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4.5 4.5" /></svg>
            <input
              id="bx-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics, e.g. CPR, pharmacology, UWorld"
              autoComplete="off"
              enterKeyHint="search"
            />
          </form>
          <div className="bx-chips" role="group" aria-label="Filter by topic">
            <button type="button" aria-pressed={active === "all"} onClick={() => setActive("all")}>All topics</button>
            {presentCategories.map((category) => (
              <button type="button" key={category.id} aria-pressed={active === category.id} onClick={() => setActive(category.id)}>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filtering ? `${results.length} ${results.length === 1 ? "article" : "articles"} found` : ""}
      </p>

      {showFeatured && (
        <section className="bx-featured" aria-labelledby="bx-featured-title">
          <a className="bx-featured-link" href={`/blog/${featured.slug}`}>
            <Plate category={featured.category} large />
            <div className="bx-featured-copy">
              <p className="bx-featured-flag">Start here</p>
              <Meta post={featured} />
              <h2 id="bx-featured-title">{featured.title}</h2>
              <p className="bx-featured-desc">{featured.description}</p>
              <span className="bx-read">Read the article <span aria-hidden="true">→</span></span>
            </div>
          </a>
        </section>
      )}

      <section className="bx-grid-section" aria-label={filtering ? "Search results" : "All articles"}>
        {!filtering && <h2 className="bx-section-title">All articles</h2>}
        {filtering && (
          <p className="bx-count">
            {results.length} {results.length === 1 ? "article" : "articles"}
            {active !== "all" && <> in {blogCategories.find((category) => category.id === active)?.label}</>}
            {query.trim() && <> matching &ldquo;{query.trim()}&rdquo;</>}
            <button type="button" className="bx-clear" onClick={() => { setQuery(""); setActive("all"); }}>Clear filters</button>
          </p>
        )}
        {gridPosts.length > 0 ? (
          <ul className="bx-grid">
            {gridPosts.map((post) => (
              <li key={post.id}>
                <a className="bx-card" href={`/blog/${post.slug}`}>
                  <Plate category={post.category} />
                  <div className="bx-card-body">
                    <Meta post={post} />
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <span className="bx-read">Read <span aria-hidden="true">→</span></span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bx-empty">
            <p>No articles match that search.</p>
            <p>Try a broader word like &ldquo;CPR&rdquo; or &ldquo;study plan&rdquo;, or browse all topics.</p>
            <button type="button" className="bx-clear" onClick={() => { setQuery(""); setActive("all"); }}>Show all articles</button>
          </div>
        )}
      </section>
    </>
  );
}
