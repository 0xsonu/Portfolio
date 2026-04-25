import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Tag, X, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { blogPosts, BlogPost } from "../../data/blogs";

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  const filteredPosts = selectedTag
    ? blogPosts.filter((post) => post.tags.includes(selectedTag))
    : blogPosts;

  return (
    <section
      id="blog"
      className="min-h-screen py-20 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-neon-green to-primary bg-clip-text text-transparent">
            Engineering Blog
          </h2>
          <p className="text-xl text-muted-foreground">
            Deep dives into distributed systems, performance, and infrastructure
          </p>
        </motion.div>

        <div className="mb-8 overflow-x-auto md:overflow-x-visible scrollbar-hide">
          <div className="flex items-center gap-3 md:flex-wrap md:justify-center w-max md:w-auto mx-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                selectedTag === null
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  : "bg-muted border-border text-foreground hover:border-primary/50"
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  selectedTag === tag
                    ? "bg-secondary text-secondary-foreground border-secondary shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "bg-muted border-border text-foreground hover:border-secondary/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
            >
              <div className="flex items-start gap-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-muted border border-border"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-muted border border-border">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-8 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[95vh] md:max-h-[85vh] overflow-y-auto bg-card border border-border rounded-lg shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-start justify-between p-4 md:p-6 bg-card border-b border-border">
                <div className="flex-1 pr-4">
                  <h2 className="text-lg md:text-2xl mb-2">
                    {selectedPost.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      {new Date(selectedPost.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 md:p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs md:text-sm rounded-full bg-muted border border-border"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-invert prose-sm md:prose-lg max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {selectedPost.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
