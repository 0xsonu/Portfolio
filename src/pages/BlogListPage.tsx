import { Link } from "react-router-dom";
import { getAllBlogs } from "../data/blogs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

export default function BlogListPage() {
  const blogs = getAllBlogs();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-6 pt-24 pb-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-10 font-mono text-3xl font-bold text-accent-cyan md:text-4xl">
            Blog
          </h1>

          {blogs.length === 0 ? (
            <p className="text-center text-text-secondary">
              No blog posts available
            </p>
          ) : (
            <div className="grid gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog.slug}
                  to={`/blog/${blog.slug}`}
                  className="group block rounded-xl border border-white/5 bg-bg-card p-6 transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-glow-cyan hover:-translate-y-0.5"
                >
                  <h2 className="font-mono text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent-cyan">
                    {blog.title}
                  </h2>

                  <p className="mt-2 font-mono text-sm text-text-secondary">
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
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
