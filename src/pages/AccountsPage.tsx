import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, PiggyBank, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

const iconMap: Record<string, React.ElementType> = {
  "building": Building2,
  "piggy-bank": PiggyBank,
  "credit-card": CreditCard,
  "trending-up": TrendingUp,
};

const AccountsPage = () => {
  const { accounts, transactions } = useFinance();

  const totalNetWorth = accounts.reduce((s, a) => s + a.balance, 0);

  const accountActivity = useMemo(() => {
    const map = new Map<string, { income: number; expense: number; count: number }>();
    transactions.forEach(t => {
      const id = t.accountId || "acc1";
      const cur = map.get(id) || { income: 0, expense: 0, count: 0 };
      if (t.type === "income") cur.income += t.amount;
      else cur.expense += t.amount;
      cur.count++;
      map.set(id, cur);
    });
    return map;
  }, [transactions]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Net Worth */}
      <Card className="border-0 shadow-sm bg-primary/5">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Total Net Worth</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            ${totalNetWorth.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Across {accounts.length} accounts</p>
        </CardContent>
      </Card>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map(account => {
          const Icon = iconMap[account.icon] || Building2;
          const activity = accountActivity.get(account.id);
          const isNegative = account.balance < 0;

          return (
            <Card key={account.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${account.color}20` }}>
                      <Icon className="h-5 w-5" style={{ color: account.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{account.name}</h3>
                      <Badge variant="secondary" className="text-xs capitalize mt-0.5">{account.type}</Badge>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="mb-4">
                  <p className={`text-2xl font-bold tabular-nums ${isNegative ? "text-destructive" : "text-foreground"}`}>
                    {isNegative ? "-" : ""}${Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated {new Date(account.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>

                {activity && (
                  <div className="flex gap-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                      <div>
                        <p className="text-xs text-muted-foreground">Income</p>
                        <p className="text-sm font-semibold text-foreground">${activity.income.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                      <div>
                        <p className="text-xs text-muted-foreground">Expenses</p>
                        <p className="text-sm font-semibold text-foreground">${activity.expense.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xs text-muted-foreground">Transactions</p>
                      <p className="text-sm font-semibold text-foreground">{activity.count}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AccountsPage;
