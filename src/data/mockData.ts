import { Transaction, MonthlyData, Budget, Account, UserProfile } from "@/types/finance";

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2024-03-15", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income", accountId: "acc1" },
  { id: "2", date: "2024-03-14", description: "Grocery Store", amount: 89.50, category: "Food & Dining", type: "expense", accountId: "acc1" },
  { id: "3", date: "2024-03-13", description: "Uber Ride", amount: 24.00, category: "Transportation", type: "expense", accountId: "acc1" },
  { id: "4", date: "2024-03-12", description: "Freelance Project", amount: 1500, category: "Freelance", type: "income", accountId: "acc1" },
  { id: "5", date: "2024-03-11", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense", accountId: "acc3" },
  { id: "6", date: "2024-03-10", description: "Electric Bill", amount: 120.00, category: "Utilities", type: "expense", accountId: "acc1" },
  { id: "7", date: "2024-03-09", description: "Amazon Purchase", amount: 67.30, category: "Shopping", type: "expense", accountId: "acc3" },
  { id: "8", date: "2024-03-08", description: "Doctor Visit", amount: 150.00, category: "Healthcare", type: "expense", accountId: "acc1" },
  { id: "9", date: "2024-03-07", description: "Online Course", amount: 49.99, category: "Education", type: "expense", accountId: "acc3" },
  { id: "10", date: "2024-03-06", description: "Restaurant Dinner", amount: 75.00, category: "Food & Dining", type: "expense", accountId: "acc1" },
  { id: "11", date: "2024-03-05", description: "Gas Station", amount: 45.00, category: "Transportation", type: "expense", accountId: "acc1" },
  { id: "12", date: "2024-03-04", description: "Dividend Income", amount: 320.00, category: "Investments", type: "income", accountId: "acc4" },
  { id: "13", date: "2024-03-03", description: "Rent Payment", amount: 1400.00, category: "Rent", type: "expense", accountId: "acc1" },
  { id: "14", date: "2024-03-02", description: "Movie Tickets", amount: 32.00, category: "Entertainment", type: "expense", accountId: "acc3" },
  { id: "15", date: "2024-03-01", description: "Gym Membership", amount: 50.00, category: "Healthcare", type: "expense", accountId: "acc1" },
  { id: "16", date: "2024-02-28", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income", accountId: "acc1" },
  { id: "17", date: "2024-02-25", description: "Flight Tickets", amount: 380.00, category: "Travel", type: "expense", accountId: "acc3" },
  { id: "18", date: "2024-02-22", description: "Freelance Work", amount: 800, category: "Freelance", type: "income", accountId: "acc1" },
  { id: "19", date: "2024-02-20", description: "Groceries", amount: 112.40, category: "Food & Dining", type: "expense", accountId: "acc1" },
  { id: "20", date: "2024-02-18", description: "Internet Bill", amount: 65.00, category: "Utilities", type: "expense", accountId: "acc1" },
  { id: "21", date: "2024-02-15", description: "Clothing", amount: 210.00, category: "Shopping", type: "expense", accountId: "acc3" },
  { id: "22", date: "2024-02-12", description: "Taxi", amount: 18.50, category: "Transportation", type: "expense", accountId: "acc1" },
  { id: "23", date: "2024-02-10", description: "Concert Tickets", amount: 95.00, category: "Entertainment", type: "expense", accountId: "acc3" },
  { id: "24", date: "2024-02-05", description: "Rent Payment", amount: 1400.00, category: "Rent", type: "expense", accountId: "acc1" },
  { id: "25", date: "2024-02-01", description: "Stock Dividends", amount: 150.00, category: "Investments", type: "income", accountId: "acc4" },
  { id: "26", date: "2024-01-30", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income", accountId: "acc1" },
  { id: "27", date: "2024-01-28", description: "Pharmacy", amount: 35.50, category: "Healthcare", type: "expense", accountId: "acc1" },
  { id: "28", date: "2024-01-25", description: "Spotify Premium", amount: 9.99, category: "Entertainment", type: "expense", accountId: "acc3" },
  { id: "29", date: "2024-01-22", description: "Water Bill", amount: 42.00, category: "Utilities", type: "expense", accountId: "acc1" },
  { id: "30", date: "2024-01-20", description: "Savings Transfer", amount: 500, category: "Investments", type: "expense", accountId: "acc2" },
  { id: "31", date: "2024-01-18", description: "Book Purchase", amount: 24.99, category: "Education", type: "expense", accountId: "acc1" },
  { id: "32", date: "2024-01-15", description: "Rent Payment", amount: 1400.00, category: "Rent", type: "expense", accountId: "acc1" },
  { id: "33", date: "2024-01-10", description: "Freelance Design", amount: 1200, category: "Freelance", type: "income", accountId: "acc1" },
  { id: "34", date: "2024-01-08", description: "Grocery Haul", amount: 156.80, category: "Food & Dining", type: "expense", accountId: "acc1" },
  { id: "35", date: "2024-01-05", description: "Parking Fee", amount: 12.00, category: "Transportation", type: "expense", accountId: "acc1" },
];

export const mockMonthlyData: MonthlyData[] = [
  { month: "Oct", income: 5800, expenses: 3200, balance: 2600 },
  { month: "Nov", income: 6100, expenses: 3800, balance: 2300 },
  { month: "Dec", income: 7200, expenses: 4500, balance: 2700 },
  { month: "Jan", income: 6400, expenses: 3670, balance: 2730 },
  { month: "Feb", income: 6150, expenses: 3680, balance: 2470 },
  { month: "Mar", income: 7020, expenses: 2963, balance: 4057 },
];

export const mockBudgets: Budget[] = [
  { id: "b1", category: "Food & Dining", limit: 400, period: "monthly" },
  { id: "b2", category: "Transportation", limit: 150, period: "monthly" },
  { id: "b3", category: "Entertainment", limit: 200, period: "monthly" },
  { id: "b4", category: "Shopping", limit: 300, period: "monthly" },
  { id: "b5", category: "Utilities", limit: 250, period: "monthly" },
  { id: "b6", category: "Healthcare", limit: 300, period: "monthly" },
  { id: "b7", category: "Rent", limit: 1500, period: "monthly" },
];

export const mockAccounts: Account[] = [
  { id: "acc1", name: "Main Checking", type: "checking", balance: 8432.50, currency: "USD", color: "hsl(220, 70%, 50%)", icon: "building", lastUpdated: "2024-03-15" },
  { id: "acc2", name: "Savings Account", type: "savings", balance: 15680.00, currency: "USD", color: "hsl(160, 60%, 45%)", icon: "piggy-bank", lastUpdated: "2024-03-15" },
  { id: "acc3", name: "Credit Card", type: "credit", balance: -1240.30, currency: "USD", color: "hsl(0, 72%, 51%)", icon: "credit-card", lastUpdated: "2024-03-14" },
  { id: "acc4", name: "Investment Portfolio", type: "investment", balance: 42150.00, currency: "USD", color: "hsl(280, 60%, 55%)", icon: "trending-up", lastUpdated: "2024-03-13" },
];

export const mockProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "",
  currency: "USD",
  language: "en",
  notifications: {
    email: true,
    push: true,
    budgetAlerts: true,
    weeklyReport: false,
  },
};
