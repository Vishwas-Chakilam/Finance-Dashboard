import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, BarChart3, Lightbulb } from "lucide-react";

const InsightsSection = () => {
  const { transactions, totalIncome, totalExpenses } = useFinance();

  const insights = useMemo(() => {
    const expensesByCategory = new Map<string, number>();
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => expensesByCategory.set(t.category, (expensesByCategory.get(t.category) || 0) + t.amount));

    const sorted = Array.from(expensesByCategory.entries()).sort((a, b) => b[1] - a[1]);
    const highestCategory = sorted[0];
    const lowestCategory = sorted[sorted.length - 1];
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0;
    const avgExpense = transactions.filter(t => t.type === "expense").length > 0
      ? totalExpenses / transactions.filter(t => t.type === "expense").length
      : 0;

    return [
      {
        title: "Highest Spending",
        value: highestCategory ? highestCategory[0] : "N/A",
        detail: highestCategory ? `$${highestCategory[1].toLocaleString()} total` : "No expenses",
        icon: AlertTriangle,
        color: "text-warning",
        bg: "bg-warning/10",
      },
      {
        title: "Savings Rate",
        value: `${savingsRate.toFixed(1)}%`,
        detail: savingsRate >= 20 ? "Great! Above recommended 20%" : "Try to save at least 20%",
        icon: TrendingUp,
        color: savingsRate >= 20 ? "text-success" : "text-destructive",
        bg: savingsRate >= 20 ? "bg-success/10" : "bg-destructive/10",
      },
      {
        title: "Avg. Expense",
        value: `$${avgExpense.toFixed(0)}`,
        detail: `Across ${transactions.filter(t => t.type === "expense").length} transactions`,
        icon: BarChart3,
        color: "text-primary",
        bg: "bg-primary/10",
      },
      {
        title: "Lowest Spending",
        value: lowestCategory ? lowestCategory[0] : "N/A",
        detail: lowestCategory ? `$${lowestCategory[1].toLocaleString()} total` : "No expenses",
        icon: Lightbulb,
        color: "text-success",
        bg: "bg-success/10",
      },
    ];
  }, [transactions, totalIncome, totalExpenses]);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Insights</CardTitle>
        <p className="text-xs text-muted-foreground">Key observations from your financial data</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className={`p-2 rounded-lg ${insight.bg} flex-shrink-0`}>
                <insight.icon className={`h-4 w-4 ${insight.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{insight.title}</p>
                <p className="font-semibold text-card-foreground text-sm">{insight.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{insight.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
