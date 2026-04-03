import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RecentTransactions = () => {
  const { transactions } = useFinance();
  const navigate = useNavigate();
  const recent = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <Card className="border-0 shadow-sm">
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Recent Transactions</h3>
          <p className="text-xs text-muted-foreground">Latest activity across all accounts</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")} className="text-primary text-xs">
          View All
        </Button>
      </div>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {recent.map(tx => (
            <div key={tx.id} className="flex items-center justify-between py-2.5 border-b last:border-0 hover:bg-muted/30 -mx-1 px-1 rounded transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === "income" ? "bg-success/10" : "bg-destructive/10"}`}>
                  {tx.type === "income" ? <ArrowUpRight className="h-4 w-4 text-success" /> : <ArrowDownRight className="h-4 w-4 text-destructive" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    <span className="mx-1">·</span>
                    {tx.category}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-semibold tabular-nums flex-shrink-0 ml-2 ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
