import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { Transaction, UserRole, Category, TransactionType, Budget, Account, UserProfile } from "@/types/finance";
import { mockTransactions, mockBudgets, mockAccounts, mockProfile } from "@/data/mockData";

interface Filters {
  search: string;
  category: Category | "all";
  type: TransactionType | "all";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
  dateRange: "all" | "7d" | "30d" | "90d";
  accountId: string | "all";
}

interface FinanceContextType {
  transactions: Transaction[];
  role: UserRole;
  setRole: (role: UserRole) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filteredTransactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  editTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
  budgets: Budget[];
  addBudget: (b: Omit<Budget, "id">) => void;
  editBudget: (b: Budget) => void;
  deleteBudget: (id: string) => void;
  getBudgetSpent: (category: Category) => number;
  accounts: Account[];
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
};

const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadFromStorage("finance_transactions", mockTransactions));
  const [role, setRole] = useState<UserRole>("admin");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("finance_dark") === "true");
  const [budgets, setBudgets] = useState<Budget[]>(() => loadFromStorage("finance_budgets", mockBudgets));
  const [accounts] = useState<Account[]>(mockAccounts);
  const [profile, setProfile] = useState<UserProfile>(() => loadFromStorage("finance_profile", mockProfile));
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
    type: "all",
    sortBy: "date",
    sortOrder: "desc",
    dateRange: "all",
    accountId: "all",
  });

  const updateTransactions = useCallback((updater: (prev: Transaction[]) => Transaction[]) => {
    setTransactions(prev => {
      const next = updater(prev);
      saveToStorage("finance_transactions", next);
      return next;
    });
  }, []);

  const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    updateTransactions(prev => [{ ...tx, id: crypto.randomUUID() }, ...prev]);
  }, [updateTransactions]);

  const editTransaction = useCallback((tx: Transaction) => {
    updateTransactions(prev => prev.map(t => (t.id === tx.id ? tx : t)));
  }, [updateTransactions]);

  const deleteTransaction = useCallback((id: string) => {
    updateTransactions(prev => prev.filter(t => t.id !== id));
  }, [updateTransactions]);

  const addBudget = useCallback((b: Omit<Budget, "id">) => {
    setBudgets(prev => {
      const next = [...prev, { ...b, id: crypto.randomUUID() }];
      saveToStorage("finance_budgets", next);
      return next;
    });
  }, []);

  const editBudget = useCallback((b: Budget) => {
    setBudgets(prev => {
      const next = prev.map(x => (x.id === b.id ? b : x));
      saveToStorage("finance_budgets", next);
      return next;
    });
  }, []);

  const deleteBudget = useCallback((id: string) => {
    setBudgets(prev => {
      const next = prev.filter(x => x.id !== id);
      saveToStorage("finance_budgets", next);
      return next;
    });
  }, []);

  const getBudgetSpent = useCallback((category: Category) => {
    const now = new Date("2024-03-15");
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    return transactions
      .filter(t => t.type === "expense" && t.category === category && new Date(t.date) >= monthStart)
      .reduce((s, t) => s + t.amount, 0);
  }, [transactions]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem("finance_dark", String(next));
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      );
    }
    if (filters.category !== "all") result = result.filter(t => t.category === filters.category);
    if (filters.type !== "all") result = result.filter(t => t.type === filters.type);
    if (filters.accountId !== "all") result = result.filter(t => t.accountId === filters.accountId);
    if (filters.dateRange !== "all") {
      const now = new Date("2024-03-15");
      const days = filters.dateRange === "7d" ? 7 : filters.dateRange === "30d" ? 30 : 90;
      const cutoff = new Date(now.getTime() - days * 86400000);
      result = result.filter(t => new Date(t.date) >= cutoff);
    }
    result.sort((a, b) => {
      const mult = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date") return mult * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mult * (a.amount - b.amount);
    });
    return result;
  }, [transactions, filters]);

  const totalIncome = useMemo(() => transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalExpenses = useMemo(() => transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <FinanceContext.Provider value={{
      transactions, role, setRole, filters, setFilters, filteredTransactions,
      addTransaction, editTransaction, deleteTransaction,
      totalBalance, totalIncome, totalExpenses, darkMode, toggleDarkMode,
      budgets, addBudget, editBudget, deleteBudget, getBudgetSpent,
      accounts, profile, setProfile,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
