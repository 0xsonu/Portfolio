import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Timeline from "../../components/Timeline";

describe("Timeline", () => {
  const educationItems = [
    {
      title: "B.Tech in Computer Science",
      subtitle: "Stanford University",
      period: "2016 - 2020",
      details: "Focused on distributed systems and cloud computing.",
    },
  ];

  const experienceItems = [
    {
      title: "Senior DevOps Engineer",
      subtitle: "CloudScale Inc.",
      period: "2022 - Present",
      details: [
        "Managed Kubernetes clusters serving 50k+ requests/sec",
        "Built CI/CD pipelines with GitHub Actions",
      ],
      tags: ["Kubernetes", "Docker", "React"],
    },
  ];

  it("renders title for each item", () => {
    render(<Timeline items={educationItems} />);
    expect(screen.getByText("B.Tech in Computer Science")).toBeInTheDocument();
  });

  it("renders subtitle for each item", () => {
    render(<Timeline items={educationItems} />);
    expect(screen.getByText("Stanford University")).toBeInTheDocument();
  });

  it("renders period with accent styling", () => {
    render(<Timeline items={educationItems} />);
    const period = screen.getByText("2016 - 2020");
    expect(period).toBeInTheDocument();
    expect(period.className).toContain("text-accent-green");
  });

  it("renders string details as a paragraph", () => {
    render(<Timeline items={educationItems} />);
    const detail = screen.getByText(
      "Focused on distributed systems and cloud computing.",
    );
    expect(detail.tagName).toBe("P");
  });

  it("renders array details as a bulleted list", () => {
    render(<Timeline items={experienceItems} />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(
      screen.getByText("Managed Kubernetes clusters serving 50k+ requests/sec"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Built CI/CD pipelines with GitHub Actions"),
    ).toBeInTheDocument();
  });

  it("renders tags as styled badges", () => {
    render(<Timeline items={experienceItems} />);
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("applies distinct accent styling to backend/infrastructure badges", () => {
    render(<Timeline items={experienceItems} />);
    const k8sBadge = screen.getByText("Kubernetes");
    const dockerBadge = screen.getByText("Docker");
    // Backend/infra badges get purple accent
    expect(k8sBadge.className).toContain("text-accent-purple");
    expect(dockerBadge.className).toContain("text-accent-purple");
  });

  it("applies default accent styling to non-infrastructure badges", () => {
    render(<Timeline items={experienceItems} />);
    const reactBadge = screen.getByText("React");
    // Non-infra badges get cyan accent
    expect(reactBadge.className).toContain("text-accent-cyan");
  });

  it("does not render tags section when tags are absent", () => {
    render(<Timeline items={educationItems} />);
    // Education items have no tags, so no tag badge elements should appear
    // Dot markers also use rounded-full, so check for tag-specific classes
    const tagBadges = document.querySelectorAll(
      "[class*='rounded-full'][class*='px-3']",
    );
    expect(tagBadges).toHaveLength(0);
  });

  it("renders multiple items", () => {
    const items = [
      {
        title: "Role A",
        subtitle: "Company A",
        period: "2020 - 2022",
        details: "Did things at A.",
      },
      {
        title: "Role B",
        subtitle: "Company B",
        period: "2022 - Present",
        details: "Did things at B.",
      },
    ];
    render(<Timeline items={items} />);
    expect(screen.getByText("Role A")).toBeInTheDocument();
    expect(screen.getByText("Role B")).toBeInTheDocument();
    expect(screen.getByText("Company A")).toBeInTheDocument();
    expect(screen.getByText("Company B")).toBeInTheDocument();
  });

  it("renders the vertical connecting line", () => {
    render(<Timeline items={educationItems} />);
    const line = document.querySelector("[class*='bg-accent-cyan']");
    expect(line).toBeInTheDocument();
  });

  it("renders dot markers for each item", () => {
    const items = [
      {
        title: "Entry 1",
        subtitle: "Place 1",
        period: "2020",
        details: "Details 1",
      },
      {
        title: "Entry 2",
        subtitle: "Place 2",
        period: "2021",
        details: "Details 2",
      },
    ];
    render(<Timeline items={items} />);
    const dots = document.querySelectorAll(
      "[class*='rounded-full'][class*='border-accent-cyan']",
    );
    expect(dots).toHaveLength(2);
  });

  it("renders items with bg-card background", () => {
    render(<Timeline items={educationItems} />);
    const card = document.querySelector("[class*='bg-bg-card']");
    expect(card).toBeInTheDocument();
  });
});
