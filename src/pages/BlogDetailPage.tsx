import { Link, useParams } from "react-router-dom";
import { getBlogBySlug } from "../data/blogs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MarkdownRenderer from "../components/MarkdownRenderer";

const tagColors = [
  "bg-accent-cyan/15 text-accent-cyan",
  "bg-accent-purple/15 text-accent-purple",
  "bg-accent-green/15 text-accent-green",
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? getBlogBySlug(slug) : undefined;

  if (!blog) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 pt-24 pb-16 text-center">
          <h1 className="font-mono text-3xl font-bold text-accent-cyan">
            Post not found
          </h1>
          <p className="mt-4 text-text-secondary">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-block rounded-lg border border-accent-cyan/30 px-6 py-2 font-mono text-sm text-accent-cyan transition-all duration-300 hover:bg-accent-cyan/10 hover:shadow-glow-cyan"
          >
            ← Back to Blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-6 pt-24 pb-16">
        <article className="mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="mb-8 inline-block font-mono text-sm text-text-secondary transition-colors duration-300 hover:text-accent-cyan"
          >
            ← Back to Blog
          </Link>

          <header className="mb-10">
            <h1 className="font-mono text-3xl font-bold text-text-primary md:text-4xl">
              {blog.title}
            </h1>

            <p className="mt-3 font-mono text-sm text-text-secondary">
              {formatDate(blog.date)}
            </p>

            {blog.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3 py-1 font-mono text-xs ${tagColors[i % tagColors.length]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="border-t border-white/5 pt-8">
            <MarkdownRenderer content={blog.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
