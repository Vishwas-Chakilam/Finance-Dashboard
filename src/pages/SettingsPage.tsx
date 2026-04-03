import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Globe, Palette, Download, Trash2 } from "lucide-react";
import { notify } from "@/lib/notify";

const SettingsPage = () => {
  const { profile, setProfile, role, transactions, darkMode, toggleDarkMode } = useFinance();

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
    URL.revokeObjectURL(url);
    notify.success("Export complete", "Transactions exported as JSON.");
  };

  const handleExportCSV = () => {
    const headers = "Date,Description,Category,Type,Amount\n";
    const rows = transactions.map(t =>
      `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
    notify.success("Export complete", "Transactions exported as CSV.");
  };

  const handleClearData = () => {
    localStorage.removeItem("finance_transactions");
    localStorage.removeItem("finance_budgets");
    window.location.reload();
  };

  const isAdmin = role === "admin";

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Profile */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {profile.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="font-semibold text-foreground">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={profile.name}
                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                disabled={!isAdmin}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={profile.email}
                onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                disabled={!isAdmin}
              />
            </div>
          </div>
          {isAdmin && (
            <Button size="sm" onClick={() => {
              localStorage.setItem("finance_profile", JSON.stringify(profile));
              notify.success("Profile updated");
            }}>
              Save Profile
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle dark theme</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={profile.currency} onValueChange={v => setProfile(p => ({ ...p, currency: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={profile.language} onValueChange={v => setProfile(p => ({ ...p, language: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {([
            { key: "email" as const, label: "Email Notifications", desc: "Receive updates via email" },
            { key: "push" as const, label: "Push Notifications", desc: "Browser push notifications" },
            { key: "budgetAlerts" as const, label: "Budget Alerts", desc: "Alerts when nearing budget limits" },
            { key: "weeklyReport" as const, label: "Weekly Report", desc: "Receive weekly spending summary" },
          ]).map(item => (
            <div key={item.key} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={profile.notifications[item.key]}
                onCheckedChange={v => setProfile(p => ({
                  ...p,
                  notifications: { ...p.notifications, [item.key]: v },
                }))}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Data Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-1">
              <Download className="h-3.5 w-3.5" /> Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportJSON} className="gap-1">
              <Download className="h-3.5 w-3.5" /> Export JSON
            </Button>
          </div>
          {isAdmin && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-destructive">Reset All Data</p>
                  <p className="text-xs text-muted-foreground">Clear all transactions and budgets</p>
                </div>
                <Button variant="destructive" size="sm" onClick={handleClearData} className="gap-1">
                  <Trash2 className="h-3.5 w-3.5" /> Reset
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
