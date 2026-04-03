import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Pencil, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BudgetFormDialog from "@/components/BudgetFormDialog";

const BudgetsPage = () => {
  const { budgets, getBudgetSpent, role, deleteBudget, totalIncome, totalExpenses } = useFinance();
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + getBudgetSpent(b.category), 0);
  const savingsGoal = totalIncome * 0.2;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-2xl font-bold text-foreground">${totalBudget.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">across {budgets.length} categories</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold text-foreground">${totalSpent.toLocaleString()}</p>
            <Progress value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Savings Goal (20%)</p>
            <p className="text-2xl font-bold text-foreground">${savingsGoal.toLocaleString()}</p>
            <p className="text-xs mt-1">
              {totalIncome - totalExpenses >= savingsGoal ? (
                <span className="text-success flex items-center gap-1"><CheckCircle className="h-3 w-3" /> On track</span>
              ) : (
                <span className="text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Below target</span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget list */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Budget Categories</CardTitle>
              <p className="text-xs text-muted-foreground">Track spending limits per category</p>
            </div>
            {role === "admin" && (
              <Button size="sm" onClick={() => setShowAdd(true)} className="gap-1">
                <Plus className="h-3.5 w-3.5" /> Add Budget
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {budgets.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">No budgets set</p>
              <p className="text-xs mt-1">Create budgets to track your spending limits</p>
            </div>
          ) : (
            <div className="space-y-4">
              {budgets.map(budget => {
                const spent = getBudgetSpent(budget.category);
                const pct = (spent / budget.limit) * 100;
                const isOver = pct >= 100;
                const isWarning = pct >= 80 && pct < 100;

                return (
                  <div key={budget.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-foreground">{budget.category}</span>
                        {isOver && <Badge variant="destructive" className="text-xs">Over budget</Badge>}
                        {isWarning && <Badge className="text-xs bg-warning text-warning-foreground">Warning</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm tabular-nums">
                          <span className={isOver ? "text-destructive font-semibold" : "text-foreground font-semibold"}>
                            ${spent.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground"> / ${budget.limit.toLocaleString()}</span>
                        </span>
                        {role === "admin" && (
                          <div className="flex gap-1 ml-2">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditingId(budget.id)}>
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteBudget(budget.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <Progress
                      value={Math.min(pct, 100)}
                      className={`h-2.5 ${isOver ? "[&>div]:bg-destructive" : isWarning ? "[&>div]:bg-warning" : "[&>div]:bg-success"}`}
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {isOver
                        ? `$${(spent - budget.limit).toFixed(2)} over limit`
                        : `$${(budget.limit - spent).toFixed(2)} remaining`}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {showAdd && <BudgetFormDialog onClose={() => setShowAdd(false)} />}
      {editingId && <BudgetFormDialog budgetId={editingId} onClose={() => setEditingId(null)} />}
    </div>
  );
};

export default BudgetsPage;
