import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown, Plus, Pencil, Trash2, Download } from "lucide-react";
import { Category, TransactionType } from "@/types/finance";
import TransactionFormDialog from "./TransactionFormDialog";

const categories: (Category | "all")[] = [
  "all", "Salary", "Freelance", "Food & Dining", "Transportation", "Shopping",
  "Entertainment", "Utilities", "Healthcare", "Education", "Travel", "Investments", "Rent", "Other",
];

const TransactionsTable = () => {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useFinance();
  const [editingTx, setEditingTx] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const toggleSort = () => {
    setFilters(f => ({
      ...f,
      sortOrder: f.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const exportCSV = () => {
    const headers = "Date,Description,Category,Type,Amount\n";
    const rows = filteredTransactions.map(t =>
      `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Transactions</CardTitle>
              <p className="text-xs text-muted-foreground">{filteredTransactions.length} transactions found</p>
            </div>
            <div className="flex items-center gap-2">
              {role === "admin" && (
                <Button size="sm" onClick={() => setShowAddDialog(true)} className="gap-1">
                  <Plus className="h-3.5 w-3.5" /> Add
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1">
                <Download className="h-3.5 w-3.5" /> Export
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={filters.search}
                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                className="pl-9 bg-background"
              />
            </div>
            <Select value={filters.category} onValueChange={v => setFilters(f => ({ ...f, category: v as Category | "all" }))}>
              <SelectTrigger className="w-full sm:w-[150px] bg-background">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{c === "all" ? "All Categories" : c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.type} onValueChange={v => setFilters(f => ({ ...f, type: v as TransactionType | "all" }))}>
              <SelectTrigger className="w-full sm:w-[120px] bg-background">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.sortBy} onValueChange={v => setFilters(f => ({ ...f, sortBy: v as "date" | "amount" }))}>
              <SelectTrigger className="w-full sm:w-[120px] bg-background">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={toggleSort} className="flex-shrink-0">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">No transactions found</p>
              <p className="text-xs mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2.5 px-2 text-muted-foreground font-medium text-xs">Date</th>
                    <th className="text-left py-2.5 px-2 text-muted-foreground font-medium text-xs">Description</th>
                    <th className="text-left py-2.5 px-2 text-muted-foreground font-medium text-xs hidden sm:table-cell">Category</th>
                    <th className="text-left py-2.5 px-2 text-muted-foreground font-medium text-xs">Type</th>
                    <th className="text-right py-2.5 px-2 text-muted-foreground font-medium text-xs">Amount</th>
                    {role === "admin" && <th className="text-right py-2.5 px-2 text-muted-foreground font-medium text-xs w-20">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(tx => (
                    <tr key={tx.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-2.5 px-2 text-muted-foreground text-xs whitespace-nowrap">
                        {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </td>
                      <td className="py-2.5 px-2 font-medium text-card-foreground">{tx.description}</td>
                      <td className="py-2.5 px-2 hidden sm:table-cell">
                        <Badge variant="secondary" className="font-normal text-xs">{tx.category}</Badge>
                      </td>
                      <td className="py-2.5 px-2">
                        <Badge variant={tx.type === "income" ? "default" : "destructive"} className="font-normal text-xs capitalize">
                          {tx.type}
                        </Badge>
                      </td>
                      <td className={`py-2.5 px-2 text-right font-semibold tabular-nums ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                        {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      {role === "admin" && (
                        <td className="py-2.5 px-2 text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditingTx(tx.id)}>
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteTransaction(tx.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {showAddDialog && (
        <TransactionFormDialog onClose={() => setShowAddDialog(false)} />
      )}
      {editingTx && (
        <TransactionFormDialog
          transactionId={editingTx}
          onClose={() => setEditingTx(null)}
        />
      )}
    </>
  );
};

export default TransactionsTable;
