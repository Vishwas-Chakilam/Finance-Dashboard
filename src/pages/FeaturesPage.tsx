const features = [
  { title: "Role-aware UI", description: "Switch between admin and viewer behavior to demonstrate access-aware interfaces." },
  { title: "Financial Insights", description: "Track balances, income, expenses, and category-level breakdowns with responsive charts." },
  { title: "Data Tools", description: "Export transaction data and manage profile/settings for a practical product-like workflow." },
];

const FeaturesPage = () => {
  return (
    <div className="page-enter mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Features</h1>
      <p className="mt-3 text-muted-foreground">Built to demonstrate modern frontend engineering for dashboard products.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-lg border bg-card p-5">
            <h2 className="font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
