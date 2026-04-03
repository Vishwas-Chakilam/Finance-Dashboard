import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

const LandingPage = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="app-ui min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">F</span>
            <span>FinTrack</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/features" className="hover:text-foreground">Features</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
            <Button asChild size="sm">
              <Link to="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      {children ? (
        children
      ) : (
        <div className="page-enter mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col justify-center px-6 py-10">
          <p className="mb-3 inline-flex w-fit items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            Financial Dashboard Demo
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Track income, expenses, and budgets in one place.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Production-style dashboard UX with mock authentication and protected routing for portfolio demos.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="animate-slide-up">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="animate-slide-up">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
