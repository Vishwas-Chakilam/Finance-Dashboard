import { FinanceProvider } from "@/context/FinanceContext";
import DashboardHeader from "@/components/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import BalanceTrendChart from "@/components/BalanceTrendChart";
import SpendingBreakdownChart from "@/components/SpendingBreakdownChart";
import TransactionsTable from "@/components/TransactionsTable";
import InsightsSection from "@/components/InsightsSection";

const Index = () => {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <DashboardHeader />
          <SummaryCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <BalanceTrendChart />
            <SpendingBreakdownChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <TransactionsTable />
            </div>
            <InsightsSection />
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Index;
