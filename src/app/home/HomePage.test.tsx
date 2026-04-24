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

  it("renders the hero headline copy", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Modernize without rewriting/i)).toBeInTheDocument();
  });
});
