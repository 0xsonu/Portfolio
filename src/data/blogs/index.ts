export interface BlogEntry {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  content: string; // raw Markdown content
}

/**
 * Parse YAML-like frontmatter from a raw Markdown string.
 * This is a lightweight browser-compatible parser that handles
 * the simple frontmatter format used by blog posts (strings, arrays).
 * Replaces gray-matter which depends on Node.js Buffer.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const frontmatterBlock = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of frontmatterBlock.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes(":")) continue;

    const colonIndex = trimmed.indexOf(":");
    const key = trimmed.slice(0, colonIndex).trim();
    let value: string | string[] = trimmed.slice(colonIndex + 1).trim();

    // Handle quoted strings
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Handle JSON-style arrays like ["a", "b", "c"]
    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          data[key] = parsed;
          continue;
        }
      } catch {
        // Not valid JSON, treat as string
      }
    }

    data[key] = value;
  }

  return { data, content };
}

/**
 * Sort blog entries by date in descending order (most recent first).
 * Exported separately so sorting logic can be tested independently.
 */
export function sortBlogsByDate(blogs: BlogEntry[]): BlogEntry[] {
  return [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Load all Markdown files from /src/data/blogs/ using Vite's import.meta.glob,
 * parse frontmatter, validate required fields, and return sorted blog entries
 * (most recent first).
 */
export function getAllBlogs(): BlogEntry[] {
  const modules = import.meta.glob<string>("./*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });

  const entries: BlogEntry[] = [];

  for (const [filePath, raw] of Object.entries(modules)) {
    const { data, content } = parseFrontmatter(raw);

    if (!data.title || !data.date || !data.slug) {
      console.warn(
        `[Blog] Skipping "${filePath}": missing required frontmatter fields (title, date, slug).`,
      );
      continue;
    }

    entries.push({
      title: data.title as string,
      date: String(data.date),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      slug: data.slug as string,
      content,
    });
  }

  return sortBlogsByDate(entries);
}

/**
 * Find a single blog entry by its slug.
 * Returns undefined if no matching entry is found.
 */
export function getBlogBySlug(slug: string): BlogEntry | undefined {
  return getAllBlogs().find((entry) => entry.slug === slug);
}
