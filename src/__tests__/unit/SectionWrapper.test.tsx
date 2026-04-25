import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SectionWrapper from "../../components/SectionWrapper";

let observerCallback: IntersectionObserverCallback;
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
let observerOptions: IntersectionObserverInit | undefined;

beforeEach(() => {
  mockObserve.mockClear();
  mockUnobserve.mockClear();

  vi.stubGlobal(
    "IntersectionObserver",
    class MockIntersectionObserver {
      constructor(
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit,
      ) {
        observerCallback = callback;
        observerOptions = options;
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = vi.fn();
      root = null;
      rootMargin = "";
      thresholds = [];
      takeRecords = vi.fn();
    },
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("SectionWrapper", () => {
  it("renders the section with the correct id", () => {
    render(
      <SectionWrapper id="education" title="Education">
        <p>Content</p>
      </SectionWrapper>,
    );

    const section = document.getElementById("education");
    expect(section).toBeInTheDocument();
  });

  it("renders the title as a heading", () => {
    render(
      <SectionWrapper id="skills" title="Skills">
        <p>Content</p>
      </SectionWrapper>,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Skills",
    );
  });

  it("renders children content", () => {
    render(
      <SectionWrapper id="test" title="Test Section">
        <p>Child content here</p>
      </SectionWrapper>,
    );

    expect(screen.getByText("Child content here")).toBeInTheDocument();
  });

  it("starts with opacity-0 and translate-y-5 classes (hidden state)", () => {
    render(
      <SectionWrapper id="test" title="Test">
        <p>Content</p>
      </SectionWrapper>,
    );

    const section = document.getElementById("test");
    expect(section?.className).toContain("opacity-0");
    expect(section?.className).toContain("translate-y-5");
  });

  it("applies visible classes when intersection observer fires", () => {
    render(
      <SectionWrapper id="test" title="Test">
        <p>Content</p>
      </SectionWrapper>,
    );

    const section = document.getElementById("test");

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(section?.className).toContain("opacity-100");
    expect(section?.className).toContain("translate-y-0");
  });

  it("does not apply visible classes when not intersecting", () => {
    render(
      <SectionWrapper id="test" title="Test">
        <p>Content</p>
      </SectionWrapper>,
    );

    const section = document.getElementById("test");

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(section?.className).toContain("opacity-0");
    expect(section?.className).toContain("translate-y-5");
  });

  it("creates an IntersectionObserver with threshold 0.1", () => {
    render(
      <SectionWrapper id="test" title="Test">
        <p>Content</p>
      </SectionWrapper>,
    );

    expect(observerOptions).toEqual({ threshold: 0.1 });
  });

  it("observes the section element", () => {
    render(
      <SectionWrapper id="test" title="Test">
        <p>Content</p>
      </SectionWrapper>,
    );

    expect(mockObserve).toHaveBeenCalledTimes(1);
  });

  it("unobserves after becoming visible", () => {
    render(
      <SectionWrapper id="test" title="Test">
        <p>Content</p>
      </SectionWrapper>,
    );

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(mockUnobserve).toHaveBeenCalled();
  });

  it("applies transition classes for animation", () => {
    render(
      <SectionWrapper id="test" title="Test">
        <p>Content</p>
      </SectionWrapper>,
    );

    const section = document.getElementById("test");
    expect(section?.className).toContain("transition-all");
    expect(section?.className).toContain("duration-700");
    expect(section?.className).toContain("ease-out");
  });

  it("renders the terminal-style prompt character before the title", () => {
    render(
      <SectionWrapper id="test" title="My Section">
        <p>Content</p>
      </SectionWrapper>,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toContain(">");
    expect(heading.textContent).toContain("My Section");
  });
});
