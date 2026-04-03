import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { mockMonthlyData } from "@/data/mockData";

const COLORS = [
  "hsl(220, 70%, 50%)", "hsl(160, 60%, 45%)", "hsl(280, 60%, 55%)",
  "hsl(38, 92%, 50%)", "hsl(0, 72%, 51%)", "hsl(190, 70%, 50%)",
  "hsl(330, 60%, 50%)", "hsl(50, 80%, 50%)",
];

const AnalyticsPage = () => {
  const { transactions } = useFinance();

  const categoryData = useMemo(() => {
    const map = new Map<string, { income: number; expense: number }>();
    transactions.forEach(t => {
      const cur = map.get(t.category) || { income: 0, expense: 0 };
      if (t.type === "income") cur.income += t.amount;
      else cur.expense += t.amount;
      map.set(t.category, cur);
    });
    return Array.from(map.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => (b.income + b.expense) - (a.income + a.expense));
  }, [transactions]);

  const dailyData = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => map.set(t.date, (map.get(t.date) || 0) + t.amount));
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        amount: Math.round(amount * 100) / 100,
      }));
  }, [transactions]);

  const incomeVsExpensePie = useMemo(() => {
    const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return [
      { name: "Income", value: income },
      { name: "Expenses", value: expense },
    ];
  }, [transactions]);

  const weekdayData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const map = new Array(7).fill(0);
    const counts = new Array(7).fill(0);
    transactions.filter(t => t.type === "expense").forEach(t => {
      const day = new Date(t.date).getDay();
      map[day] += t.amount;
      counts[day]++;
    });
    return days.map((name, i) => ({
      name,
      avgSpending: counts[i] > 0 ? Math.round(map[i] / counts[i]) : 0,
    }));
  }, [transactions]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Income vs Expenses */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Monthly Income vs Expenses</CardTitle>
            <p className="text-xs text-muted-foreground">6-month comparison overview</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockMonthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 15%, 90%)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`]} />
                  <Legend />
                  <Bar dataKey="income" fill="hsl(160, 60%, 45%)" radius={[4, 4, 0, 0]} name="Income" />
                  <Bar dataKey="expenses" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Income vs Expense Split */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Income vs Expense Split</CardTitle>
            <p className="text-xs text-muted-foreground">Overall distribution</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={incomeVsExpensePie} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                    <Cell fill="hsl(160, 60%, 45%)" />
                    <Cell fill="hsl(0, 72%, 51%)" />
                  </Pie>
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown Bar */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Spending by Category</CardTitle>
            <p className="text-xs text-muted-foreground">Breakdown of expenses across categories</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData.filter(d => d.expense > 0)} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 11 }} tickFormatter={v => `$${v}`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 11 }} width={100} />
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`]} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="expense" fill="hsl(220, 70%, 50%)" radius={[0, 4, 4, 0]} name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spending by Day of Week */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Avg Spending by Day</CardTitle>
            <p className="text-xs text-muted-foreground">Average daily spending pattern</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekdayData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} tickFormatter={v => `$${v}`} />
                  <Tooltip formatter={(v: number) => [`$${v}`]} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="avgSpending" name="Avg Spending" radius={[4, 4, 0, 0]}>
                    {weekdayData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Expense Trend */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Daily Expense Trend</CardTitle>
            <p className="text-xs text-muted-foreground">Day-by-day spending activity</p>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dailyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} tickFormatter={v => `$${v}`} />
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`]} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="amount" stroke="hsl(220, 70%, 50%)" fill="url(#dailyGrad)" strokeWidth={2} name="Spending" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
