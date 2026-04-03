import SummaryCards from "@/components/SummaryCards";
import BalanceTrendChart from "@/components/BalanceTrendChart";
import SpendingBreakdownChart from "@/components/SpendingBreakdownChart";
import InsightsSection from "@/components/InsightsSection";
import RecentTransactions from "@/components/RecentTransactions";

const DashboardPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <InsightsSection />
      </div>
    </div>
  );
};

export default DashboardPage;
