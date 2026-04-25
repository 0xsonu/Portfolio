# Developer Portfolio

A content-driven developer portfolio built with Vite, React, TypeScript, and Tailwind CSS. All personal data is managed in structured data files and Markdown — update your content without touching any UI code.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The production build is output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Content Update Guide

All portfolio content lives in two places:

| Content Type                                                             | File                  |
| ------------------------------------------------------------------------ | --------------------- |
| Personal info, education, experience, skills, social links, system stats | `src/data/profile.ts` |
| Blog posts                                                               | `src/data/blogs/*.md` |

After making changes, the portfolio reflects them on the next dev server reload or production build. No UI component changes are needed.

---

### Personal Info

Edit the top-level fields in the `profileData` object in `src/data/profile.ts`:

```typescript
export const profileData: ProfileData = {
  name: "Your Name",
  title: "Your Job Title",
  tagline: "A short tagline about you.",
  location: "City, Country",
  email: "you@example.com",
  // ...
};
```

| Field      | Type   | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| `name`     | string | Your full name, displayed in the hero section |
| `title`    | string | Your professional title                       |
| `tagline`  | string | A short one-liner shown below your title      |
| `location` | string | Where you're based                            |
| `email`    | string | Contact email, shown in the contact section   |

---

### Social Links

Social links are in the `socials` field of `profileData` in `src/data/profile.ts`. Each key is a platform name and each value is a URL.

```typescript
socials: {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  hashnode: "https://hashnode.com/@yourusername",
  devto: "https://dev.to/yourusername",
},
```

**Supported platforms:** `github`, `linkedin`, `twitter`, `hashnode`, `devto`

**Add a platform:** Add a new key-value pair using one of the supported platform names.

**Remove a platform:** Delete the line for that platform. The icon will no longer appear — no placeholder is rendered.

**Change a URL:** Update the URL string for the platform.

> Only the five platforms listed above have icon mappings. Other keys are silently ignored.

---

### Education

Education entries are in the `education` array of `profileData` in `src/data/profile.ts`.

```typescript
education: [
  {
    degree: "B.Tech in Computer Science",
    institution: "Stanford University",
    year: "2016 - 2020",
    details:
      "Focused on distributed systems and cloud computing. Led the university's open-source club.",
  },
],
```

| Field         | Type   | Description                                    |
| ------------- | ------ | ---------------------------------------------- |
| `degree`      | string | Degree name or certification                   |
| `institution` | string | School or university name                      |
| `year`        | string | Time period (e.g. "2016 - 2020")               |
| `details`     | string | Additional info about coursework, achievements |

**Add an entry:** Add a new object to the `education` array.

**Edit an entry:** Modify the fields of an existing object.

**Remove an entry:** Delete the object from the array.

**Hide the section entirely:** Set `education` to an empty array `[]`. The section won't render.

---

### Experience

Experience entries are in the `experience` array of `profileData` in `src/data/profile.ts`.

```typescript
experience: [
  {
    role: "Senior DevOps Engineer",
    company: "CloudScale Inc.",
    duration: "2022 - Present",
    description: [
      "Architected Kubernetes clusters serving 50k+ requests/sec",
      "Built CI/CD pipelines reducing deployment time by 70%",
      "Implemented infrastructure-as-code with Terraform",
    ],
    tech: ["Kubernetes", "Docker", "Terraform", "AWS", "GitHub Actions"],
  },
],
```

| Field         | Type     | Description                                         |
| ------------- | -------- | --------------------------------------------------- |
| `role`        | string   | Job title                                           |
| `company`     | string   | Company name                                        |
| `duration`    | string   | Time period (e.g. "2022 - Present")                 |
| `description` | string[] | Array of bullet points describing your achievements |
| `tech`        | string[] | Tech stack displayed as badges                      |

**Add an entry:** Add a new object to the `experience` array.

**Edit an entry:** Modify the fields of an existing object.

**Remove an entry:** Delete the object from the array.

**Hide the section entirely:** Set `experience` to an empty array `[]`. The section won't render.

---

### Skills

Skills are in the `skills` field of `profileData` in `src/data/profile.ts`. Each key is a category name and each value is an array of skill names.

```typescript
skills: {
  Frontend: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  Backend: ["Node.js", "Rust", "Go", "Kafka", "PostgreSQL"],
  DevOps: ["Kubernetes", "Docker", "Terraform", "Ansible", "Helm"],
  Cloud: ["AWS", "GCP", "Azure", "Cloudflare"],
  "CI/CD": ["GitHub Actions", "Jenkins", "ArgoCD", "GitLab CI"],
  Monitoring: ["Prometheus", "Grafana", "Datadog", "ELK Stack"],
},
```

**Add a category:** Add a new key with an array of skill strings.

```typescript
skills: {
  // existing categories...
  Security: ["Vault", "OPA", "Falco"],
},
```

**Add a skill to an existing category:** Append a string to the category's array.

**Remove a skill:** Remove the string from the category's array.

**Remove a category:** Delete the key-value pair.

**Hide the section entirely:** Set `skills` to an empty object `{}`. The section won't render.

---

### System Stats

System stats are in the `systemStats` field of `profileData` in `src/data/profile.ts`. This section shows what you're currently focused on and learning.

```typescript
systemStats: {
  currentFocus: [
    "Cloud-native architecture",
    "Rust systems programming",
    "Platform engineering",
  ],
  currentlyLearning: ["WebAssembly", "eBPF", "Nix"],
  githubUsername: "yourusername",
},
```

| Field               | Type     | Required | Description                                             |
| ------------------- | -------- | -------- | ------------------------------------------------------- |
| `currentFocus`      | string[] | Yes      | Topics you're currently working on                      |
| `currentlyLearning` | string[] | Yes      | Technologies or skills you're actively learning         |
| `githubUsername`    | string   | No       | Your GitHub username for activity display; omit to hide |

**Update focus areas:** Edit the strings in the `currentFocus` array.

**Update learning topics:** Edit the strings in the `currentlyLearning` array.

**Enable GitHub activity:** Set `githubUsername` to your GitHub username.

**Disable GitHub activity:** Remove the `githubUsername` field or set it to `undefined`.

---

### Blog Posts

Blog posts are Markdown files stored in `src/data/blogs/`. Each file uses frontmatter for metadata.

#### Creating a New Blog Post

1. Create a new `.md` file in `src/data/blogs/`, for example `src/data/blogs/my-new-post.md`.
2. Add frontmatter at the top of the file with the required fields:

```markdown
---
title: "My New Blog Post"
date: "2024-06-15"
tags: ["DevOps", "Kubernetes"]
slug: "my-new-post"
---

Your blog content goes here. You can use full **Markdown** syntax
including code blocks, tables, lists, and more.
```

| Frontmatter Field | Type     | Required | Description                                    |
| ----------------- | -------- | -------- | ---------------------------------------------- |
| `title`           | string   | Yes      | Blog post title                                |
| `date`            | string   | Yes      | Publication date in `YYYY-MM-DD` format        |
| `tags`            | string[] | No       | Array of topic tags                            |
| `slug`            | string   | Yes      | URL-friendly identifier, used in `/blog/:slug` |

3. Write your content below the frontmatter using standard Markdown. Code blocks get automatic syntax highlighting.

That's it. The blog list page picks up new files automatically on the next build or dev server reload. Posts are sorted by date with the most recent first.

#### Editing a Blog Post

Open the `.md` file and edit the frontmatter or content directly.

#### Removing a Blog Post

Delete the `.md` file from `src/data/blogs/`.

> Files missing required frontmatter fields (`title`, `date`, `slug`) are skipped with a console warning.

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ContactSection.tsx
│   ├── EducationSection.tsx
│   ├── ExperienceSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── MarkdownRenderer.tsx
│   ├── Navbar.tsx
│   ├── SectionWrapper.tsx
│   ├── SkillsSection.tsx
│   ├── SocialLinks.tsx
│   ├── SystemStatsSection.tsx
│   └── Timeline.tsx
├── data/                # Content data layer
│   ├── profile.ts       # All personal data (edit this!)
│   └── blogs/           # Blog post Markdown files
│       ├── index.ts     # Blog loading utilities
│       └── *.md         # Individual blog posts
├── pages/               # Page-level components
│   ├── HomePage.tsx
│   ├── BlogListPage.tsx
│   ├── BlogDetailPage.tsx
│   └── NotFoundPage.tsx
├── App.tsx              # Router configuration
├── main.tsx             # App entry point
└── index.css            # Global styles and Tailwind directives
```

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4 with custom dark theme
- **Routing:** React Router
- **Markdown:** react-markdown + rehype-highlight + remark-gfm
- **Icons:** react-icons
- **Testing:** Vitest + React Testing Library + fast-check
