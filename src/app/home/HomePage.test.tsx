import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders each section", () => {
    render(<HomePage />);
    ["top", "work", "services", "about", "contact"].forEach((id) => {
      expect(document.getElementById(id)).not.toBeNull();
    });
  });

  it("renders the headline", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(
      /full-stack engineering/i,
    );
  });
});

describe("yearsOfExperience", () => {
  it("counts whole years from May 2018", async () => {
    const { yearsOfExperience } = await import("@/content/site");
    expect(yearsOfExperience(new Date(2025, 3, 30))).toBe("six");
    expect(yearsOfExperience(new Date(2025, 4, 1))).toBe("seven");
    expect(yearsOfExperience(new Date(2026, 10, 16))).toBe("eight");
  });
});
