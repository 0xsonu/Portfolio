import { describe, it, expect } from "vitest";

describe("Project Setup", () => {
  it("should have a working test environment", () => {
    expect(true).toBe(true);
  });

  it("should support jsdom environment", () => {
    expect(document).toBeDefined();
    expect(document.createElement).toBeDefined();
  });
});
