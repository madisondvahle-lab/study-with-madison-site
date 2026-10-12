"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  title: string;
};

export default function ArticleReadingRail({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const headings = sections
      .map(({ id }) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => heading instanceof HTMLElement);
    if (!headings.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="article-rail" aria-label="In this article">
      <p className="article-rail-title">In this article</p>
      <ol>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={activeId === section.id ? "location" : undefined}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
