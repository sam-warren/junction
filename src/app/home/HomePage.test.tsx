// src/app/home/HomePage.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders all 7 section anchors", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    ["hero", "capabilities", "how", "work", "stack", "about", "cta"].forEach((id) => {
      expect(document.getElementById(id)).not.toBeNull();
    });
  });

  it("renders the hero headline prefix", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    // WordRotate cycles the noun after the prefix, so assert on the stable half.
    expect(screen.getByText(/We Build/i)).toBeInTheDocument();
  });
});
