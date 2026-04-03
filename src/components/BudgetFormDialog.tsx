import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALL_CATEGORIES, Category } from "@/types/finance";

interface Props {
  budgetId?: string;
  onClose: () => void;
}

const BudgetFormDialog = ({ budgetId, onClose }: Props) => {
  const { budgets, addBudget, editBudget } = useFinance();
  const existing = budgetId ? budgets.find(b => b.id === budgetId) : null;

  const [category, setCategory] = useState<Category>(existing?.category || "Food & Dining");
  const [limit, setLimit] = useState(existing?.limit?.toString() || "");

  const usedCategories = budgets.filter(b => b.id !== budgetId).map(b => b.category);
  const availableCategories = ALL_CATEGORIES.filter(c =>
    !["Salary", "Freelance", "Investments"].includes(c) && (!usedCategories.includes(c) || c === existing?.category)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!limit) return;
    const data = { category, limit: parseFloat(limit), period: "monthly" as const };
    if (existing) editBudget({ ...data, id: existing.id });
    else addBudget(data);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[380px]">
        <DialogHeader>
          <DialogTitle>{existing ? "Edit Budget" : "Add Budget"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={v => setCategory(v as Category)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {availableCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Monthly Limit ($)</Label>
            <Input type="number" step="1" min="1" value={limit} onChange={e => setLimit(e.target.value)} placeholder="500" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{existing ? "Save" : "Add Budget"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetFormDialog;
