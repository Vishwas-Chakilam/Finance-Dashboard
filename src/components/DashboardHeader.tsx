import { useFinance } from "@/context/FinanceContext";
import { Moon, Sun, Shield, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const { role, setRole, darkMode, toggleDarkMode } = useFinance();

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Finance Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track your income, expenses, and financial insights
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Select value={role} onValueChange={(v) => setRole(v as "admin" | "viewer")}>
          <SelectTrigger className="w-[140px] bg-card">
            <div className="flex items-center gap-2">
              {role === "admin" ? <Shield className="h-4 w-4 text-primary" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={toggleDarkMode} className="bg-card">
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
