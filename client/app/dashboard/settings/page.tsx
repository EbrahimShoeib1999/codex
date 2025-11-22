// client/app/dashboard/settings/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [siteTitle, setSiteTitle] = useState("CODEX Tech");
  const [siteDescription, setSiteDescription] = useState("We're a team of expert developers and designers crafting innovative software solutions.");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [siteTheme, setSiteTheme] = useState("system"); // Added theme setting
  const [enableAnalytics, setEnableAnalytics] = useState(false); // Added analytics setting
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to save settings
    setTimeout(() => {
      console.log("Settings saved:", { siteTitle, siteDescription, emailNotifications, siteTheme, enableAnalytics });
      toast({
        title: "Settings saved!",
        description: "Your changes have been successfully saved.",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">General Settings</h1>
      <p className="text-muted-foreground">Manage your website's general information and preferences.</p>

      <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="siteTitle">Site Title</Label>
          <Input
            id="siteTitle"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteDescription">Site Description</Label>
          <Textarea
            id="siteDescription"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            rows={4}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteTheme">Website Theme</Label>
          <Select value={siteTheme} onValueChange={setSiteTheme} disabled={loading}>
            <SelectTrigger id="siteTheme">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive email notifications for important updates.</p>
          </div>
          <Switch
            id="emailNotifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="enableAnalytics" className="text-base">Enable Analytics</Label>
            <p className="text-sm text-muted-foreground">Allow collection of anonymous usage data.</p>
          </div>
          <Switch
            id="enableAnalytics"
            checked={enableAnalytics}
            onCheckedChange={setEnableAnalytics}
            disabled={loading}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
