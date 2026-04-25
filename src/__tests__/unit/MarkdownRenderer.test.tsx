import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MarkdownRenderer from "../../components/MarkdownRenderer";

describe("MarkdownRenderer", () => {
  it("renders a heading from markdown", () => {
    render(<MarkdownRenderer content="## Hello World" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Hello World" }),
    ).toBeInTheDocument();
  });

  it("renders a paragraph from markdown", () => {
    render(<MarkdownRenderer content="This is a paragraph." />);
    expect(screen.getByText("This is a paragraph.")).toBeInTheDocument();
  });

  it("renders links with correct attributes", () => {
    render(<MarkdownRenderer content="[Click here](https://example.com)" />);
    const link = screen.getByRole("link", { name: "Click here" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders unordered lists", () => {
    const md = ["- Item A", "- Item B", "- Item C"].join("\n");
    render(<MarkdownRenderer content={md} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("Item C")).toBeInTheDocument();
  });

  it("renders inline code with accent styling", () => {
    render(<MarkdownRenderer content="Use `npm install` to install." />);
    const code = screen.getByText("npm install");
    expect(code.tagName).toBe("CODE");
    expect(code.className).toContain("bg-bg-card");
  });

  it("renders code blocks inside a pre element", () => {
    const md = "```js\nconsole.log('hi');\n```";
    render(<MarkdownRenderer content={md} />);
    const pre = document.querySelector("pre");
    expect(pre).toBeInTheDocument();
    expect(pre?.className).toContain("bg-bg-card");
    expect(pre?.className).toContain("font-mono");
  });

  it("renders GFM tables", () => {
    const md = "| Name | Age |\n| --- | --- |\n| Alice | 30 |\n| Bob | 25 |";
    render(<MarkdownRenderer content={md} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("renders blockquotes", () => {
    render(<MarkdownRenderer content="> This is a quote" />);
    const blockquote = document.querySelector("blockquote");
    expect(blockquote).toBeInTheDocument();
    expect(blockquote?.textContent).toContain("This is a quote");
  });

  it("renders empty content without errors", () => {
    const { container } = render(<MarkdownRenderer content="" />);
    expect(container.querySelector(".markdown-content")).toBeInTheDocument();
  });
});
