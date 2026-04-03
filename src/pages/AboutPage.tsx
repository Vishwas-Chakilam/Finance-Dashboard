import DeveloperCard from "@/components/DeveloperCard";

const AboutPage = () => {
  return (
    <div className="page-enter mx-auto max-w-4xl px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About FinTrack</h1>
        <p className="mt-4 text-muted-foreground">
          FinTrack is a frontend-first finance dashboard demo focused on clear data visualization, accessible UI, and smooth
          interactions. It was designed and implemented as a portfolio project by Vishwas Chakilam.
        </p>
      </div>

      <DeveloperCard />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-5">
          <h2 className="font-semibold">What this demo shows</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Dashboard cards, transaction management, budgets, charts, and settings with mock authentication and protected routes.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Tech focus</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Reusable components, consistent styling, transitions and motion, routing, and tests for the core authentication flow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
