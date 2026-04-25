---
title: "Building a CI/CD Pipeline with GitHub Actions"
date: "2024-01-15"
tags: ["DevOps", "CI/CD", "GitHub Actions"]
slug: "cicd-pipeline-github-actions"
---

# Building a CI/CD Pipeline with GitHub Actions

Continuous Integration and Continuous Deployment (CI/CD) pipelines are the backbone of modern software delivery. In this post, we'll walk through setting up a production-ready pipeline using GitHub Actions.

## Why GitHub Actions?

GitHub Actions integrates directly into your repository, eliminating the need for external CI/CD services. Key advantages include:

- **Native integration** with GitHub events (push, PR, release)
- **Generous free tier** for public and private repositories
- **Marketplace** with thousands of pre-built actions
- **Matrix builds** for testing across multiple environments

## Pipeline Architecture

A typical CI/CD pipeline consists of several stages:

1. **Lint & Format** — Catch style issues early
2. **Build** — Compile and bundle the application
3. **Test** — Run unit, integration, and e2e tests
4. **Deploy** — Ship to staging or production

## Example Workflow

Here's a basic workflow file for a Node.js application:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - name: Deploy to production
        run: echo "Deploying to production..."
```

## Best Practices

- **Cache dependencies** to speed up builds
- **Use matrix strategies** to test across Node versions and OS
- **Pin action versions** with SHA hashes for security
- **Separate CI and CD** into distinct jobs with dependencies
- **Use environment secrets** for sensitive deployment credentials

## Monitoring Your Pipeline

Once your pipeline is running, monitor key metrics:

| Metric           | Target   |
| ---------------- | -------- |
| Build time       | < 5 min  |
| Test pass rate   | > 99%    |
| Deploy frequency | Daily    |
| Failure recovery | < 30 min |

## Conclusion

A well-designed CI/CD pipeline with GitHub Actions accelerates your development workflow while maintaining code quality. Start simple, iterate often, and automate everything you can.
