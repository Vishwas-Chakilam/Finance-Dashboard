import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "@/App";

describe("mock authentication flow", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, "", "/");
  });

  it("shows landing page on root route", () => {
    render(<App />);
    expect(screen.getByText(/Financial Dashboard Demo/i)).toBeInTheDocument();
  });

  it("redirects protected routes to login when unauthenticated", () => {
    window.history.pushState({}, "", "/dashboard");
    render(<App />);
    expect(screen.getByText(/Sign in to FinTrack/i)).toBeInTheDocument();
  });

  it("allows login and opens dashboard", () => {
    window.history.pushState({}, "", "/login");
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    expect(screen.getByRole("heading", { name: /Dashboard/i })).toBeInTheDocument();
  });
});
