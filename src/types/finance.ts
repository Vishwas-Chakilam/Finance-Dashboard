export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Food & Dining"
  | "Transportation"
  | "Shopping"
  | "Entertainment"
  | "Utilities"
  | "Healthcare"
  | "Education"
  | "Travel"
  | "Investments"
  | "Rent"
  | "Other";

export const ALL_CATEGORIES: Category[] = [
  "Salary", "Freelance", "Food & Dining", "Transportation", "Shopping",
  "Entertainment", "Utilities", "Healthcare", "Education", "Travel",
  "Investments", "Rent", "Other",
];

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
  accountId?: string;
}

export type UserRole = "admin" | "viewer";

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface Budget {
  id: string;
  category: Category;
  limit: number;
  period: "monthly";
}

export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  currency: string;
  color: string;
  icon: string;
  lastUpdated: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  currency: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    budgetAlerts: boolean;
    weeklyReport: boolean;
  };
}
