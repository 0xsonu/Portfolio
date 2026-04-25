import { useRef, useEffect, useState, type ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function SectionWrapper({
  id,
  title,
  children,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <h2 className="mb-8 font-mono text-2xl font-bold text-accent-cyan sm:text-3xl">
        <span className="text-accent-green mr-2">{">"}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
