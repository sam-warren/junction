// src/app/home/HomePage.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders all 8 section anchors", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    [
      "hero",
      "capabilities",
      "how",
      "approach",
      "work",
      "stack",
      "about",
      "cta",
    ].forEach((id) => {
      expect(document.getElementById(id)).not.toBeNull();
    });
  });

  it("renders the hero headline prefix", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    // WordRotate cycles the noun after the prefix, so assert on the stable
    // half via the h1 role to avoid multi-match on bubbled textContent.
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent ?? "").toMatch(/We Build/i);
  });
});
