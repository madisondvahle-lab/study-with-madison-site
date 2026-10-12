export function renderBlogContent(content: string): string {
  if (/<(?:p|h[1-6]|strong|em|ul|ol|blockquote|a)\b/i.test(content)) {
    return formatRichText(sanitizeRichText(content));
  }

  const prompts: { label: string; weak: boolean; body: string }[] = [];
  const source = content.replace(
    /^:::prompt(-weak)?(?: ([^\n]+))?\n([\s\S]*?)\n:::$/gm,
    (_match, weak: string | undefined, label: string | undefined, body: string) => {
      prompts.push({ weak: Boolean(weak), label: label ?? (weak ? "Instead of" : "Try this prompt"), body });
      return `\n\n@@PROMPT${prompts.length - 1}@@\n\n`;
    },
  );
  const blocks = source.split(/\n{2,}/);
  const headingCounts = new Map<string, number>();
  return blocks
    .map((block, index) => {
      const lines = block.trim().split("\n");
      const promptIndex = block.trim().match(/^@@PROMPT(\d+)@@$/)?.[1];
      if (promptIndex !== undefined) return renderPromptBox(prompts[Number(promptIndex)]);
      if (lines.every((line) => /^> /.test(line))) {
        return `<blockquote>${formatInline(lines.map((line) => line.slice(2)).join("\n")).replace(/\n/g, "<br />")}</blockquote>`;
      }

      if (lines.every((line) => /^- /.test(line))) {
        return `<ul>${lines.map((line) => `<li>${formatInline(line.slice(2))}</li>`).join("")}</ul>`;
      }

      if (lines.every((line) => /^\d+\. /.test(line))) {
        return `<ol>${lines.map((line) => `<li>${formatInline(line.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`;
      }

      if (isMarkdownTable(lines)) {
        return renderMarkdownTable(lines);
      }

      const heading = lines.join(" ").match(/^(#{1,3}) (.+)$/);
      if (heading) {
        const id = uniqueHeadingId(heading[2], headingCounts);
        return `<h${heading[1].length} id="${id}">${formatInline(heading[2])}</h${heading[1].length}>`;
      }
      const className = index === 0 ? ' class="article-lead"' : "";
      return `<p${className}>${formatInline(lines.join("\n")).replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}

function renderPromptBox({ label, weak, body }: { label: string; weak: boolean; body: string }): string {
  const button = weak
    ? ""
    : '<button type="button" class="prompt-copy" data-copy-prompt>Copy prompt</button>';
  return `<div class="prompt-box${weak ? " prompt-box-weak" : ""}"><div class="prompt-box-head"><span>${escapeHtml(label)}</span>${button}</div><pre class="prompt-box-text">${escapeHtml(body)}</pre></div>`;
}

function isMarkdownTable(lines: string[]): boolean {
  const separator = lines[1]?.trim().replace(/^\|/, "").replace(/\|$/, "");
  return Boolean(
    lines.length > 2 &&
      lines[0].includes("|") &&
      separator &&
      separator.split("|").every((cell) => /^:?-{3,}:?$/.test(cell.trim())),
  );
}

function renderMarkdownTable(lines: string[]): string {
  const rows = lines.map((line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim()),
  );
  const [headers, , ...body] = rows;
  return `<div class="article-table-wrap" role="region" aria-label="Comparison table" tabindex="0"><table><thead><tr>${headers
    .map((cell) => `<th scope="col">${formatInline(cell)}</th>`)
    .join("")}</tr></thead><tbody>${body
    .map((row) => `<tr>${row.map((cell) => `<td>${formatInline(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

function formatRichText(html: string): string {
  const headingCounts = new Map<string, number>();
  let formatted = html.replace(/^(?:<br>|\s)+/gi, "").replace(
    /<p>((?:Step|Part)\s+\d+\s*:[\s\S]*?)<\/p>/gi,
    "<h2>$1</h2>",
  );
  if (formatted.startsWith("<p>")) {
    formatted = formatted.replace(/^<p>/, '<p class="article-lead">');
  }
  return formatted.replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (_match, level: string, text: string) => {
    const id = uniqueHeadingId(text.replace(/<[^>]*>/g, ""), headingCounts);
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
}

function uniqueHeadingId(value: string, counts: Map<string, number>): string {
  const base = headingId(value);
  const count = (counts.get(base) ?? 0) + 1;
  counts.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}

function headingId(value: string): string {
  const normalized = value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/gi, " and ")
    .replace(/&[^;]+;/g, " ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || "article-section";
}

export function sanitizeRichText(html: string): string {
  const allowedTags = new Set(["p", "br", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "blockquote", "a"]);
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\s*\/?\s*([a-z0-9]+)(?:\s[^>]*)?>/gi, (tag, name: string) => {
      const normalizedName = name.toLowerCase();
      if (!allowedTags.has(normalizedName)) return "";
      if (tag.startsWith("</")) return `</${normalizedName}>`;
      if (normalizedName !== "a") return `<${normalizedName}>`;
      const href = tag.match(/\bhref\s*=\s*["'](https?:\/\/[^"']+)["']/i)?.[1];
      return href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">` : "<a>";
    });
}

function formatInline(value: string): string {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/(?!\/))[^\s)]+)\)/gi, (_match, label: string, href: string) => {
      const external = /^https?:\/\//i.test(href);
      const attributes = external
        ? ' target="_blank" rel="noopener noreferrer"'
        : href.toLowerCase().endsWith(".pdf")
          ? " download"
          : "";
      return `<a href="${href}"${attributes}>${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
