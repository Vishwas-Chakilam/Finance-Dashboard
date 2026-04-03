import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses, transactions } = useFinance();

  const recentTxCount = transactions.filter(t => {
    const d = new Date(t.date);
    const now = new Date("2024-03-15");
    return (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= 7;
  }).length;

  const cards = [
    {
      title: "Total Balance",
      value: totalBalance,
      icon: Wallet,
      trend: "+12.5%",
      trendUp: true,
      accent: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      trend: "+8.2%",
      trendUp: true,
      accent: "text-success",
      bg: "bg-success/10",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      trend: "-3.1%",
      trendUp: false,
      accent: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      title: "Transactions",
      value: recentTxCount,
      icon: ArrowUpRight,
      trend: "This week",
      trendUp: true,
      accent: "text-warning",
      bg: "bg-warning/10",
      isCurrency: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <Card key={card.title} className="animate-slide-up border-0 shadow-sm hover:shadow-md transition-shadow" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">{card.title}</span>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.accent}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-card-foreground">
              {card.isCurrency === false
                ? card.value
                : `$${card.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
            <div className="flex items-center gap-1 mt-2">
              {card.trendUp ? (
                <ArrowUpRight className="h-3 w-3 text-success" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs font-medium ${card.trendUp ? "text-success" : "text-destructive"}`}>
                {card.trend}
              </span>
              {card.isCurrency !== false && (
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
