import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Lock,
  Bell,
  Volume2,
  Sparkles,
  ShieldAlert,
  Save,
  Check,
} from "lucide-react";
import { toast } from "react-hot-toast";

function SettingsPage() {
  const { user } = useAuthContext();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "user@quizify.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklyReport: false,
    soundEffects: true,
    difficulty: "medium",
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      toast.success("Profile details updated successfully!");
    }, 1200);
  };

  const savePreferences = () => {
    setIsSavingPrefs(true);
    setTimeout(() => {
      setIsSavingPrefs(false);
      toast.success("Preferences updated successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account profile settings, preferences, and security configurations.
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column info */}
        <div className="md:col-span-1 space-y-2">
          <h3 className="text-sm font-semibold">Profile Information</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Update your public display name, email address, and secure password.
          </p>
        </div>

        {/* Right column fields */}
        <Card className="md:col-span-2 border border-border/80 bg-card/40 backdrop-blur-md">
          <form onSubmit={saveProfile}>
            <CardHeader>
              <CardTitle className="text-base font-semibold">User Details</CardTitle>
              <CardDescription className="text-xs">Your core profile identifier parameters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold flex items-center gap-1.5">
                    <User size={13} className="text-muted-foreground" /> Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    placeholder="Enter full name"
                    className="h-10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold flex items-center gap-1.5">
                    <Mail size={13} className="text-muted-foreground" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    placeholder="Enter email address"
                    className="h-10"
                    required
                  />
                </div>
              </div>

              <Separator className="bg-border/60 my-2" />

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Change Password</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-xs font-semibold flex items-center gap-1.5">
                      <Lock size={13} className="text-muted-foreground" /> Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={handleProfileChange}
                      placeholder="••••••••"
                      className="h-10"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-xs font-semibold flex items-center gap-1.5">
                        <Lock size={13} className="text-muted-foreground" /> New Password
                      </Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={handleProfileChange}
                        placeholder="••••••••"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-xs font-semibold flex items-center gap-1.5">
                        <Lock size={13} className="text-muted-foreground" /> Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={handleProfileChange}
                        placeholder="••••••••"
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border/50 pt-4 bg-muted/10">
              <Button
                type="submit"
                disabled={isSavingProfile}
                className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-28 cursor-pointer"
              >
                {isSavingProfile ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Profile
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Preferences Section */}
        <div className="md:col-span-1 space-y-2">
          <h3 className="text-sm font-semibold">Quiz & UI Preferences</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Personalize notifications, audio cues, default test levels, and other application behavior settings.
          </p>
        </div>

        <Card className="md:col-span-2 border border-border/80 bg-card/40 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Preferences Settings</CardTitle>
            <CardDescription className="text-xs">Adjust your app settings for an optimal user experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Notification Switch */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Bell size={15} className="text-indigo-500" /> Email Notifications
                </Label>
                <p className="text-xs text-muted-foreground">Receive periodic alerts on new quiz releases.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={(e) => setPreferences((p) => ({ ...p, emailNotifications: e.target.checked }))}
                className="w-9 h-5 rounded-full bg-muted border border-border appearance-none checked:bg-indigo-600 transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:translate-x-4 cursor-pointer"
              />
            </div>

            <Separator className="bg-border/60" />

            {/* Weekly Report Switch */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Sparkles size={15} className="text-indigo-500" /> Weekly Report Analytics
                </Label>
                <p className="text-xs text-muted-foreground">Get weekly summary reports containing your score achievements.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.weeklyReport}
                onChange={(e) => setPreferences((p) => ({ ...p, weeklyReport: e.target.checked }))}
                className="w-9 h-5 rounded-full bg-muted border border-border appearance-none checked:bg-indigo-600 transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:translate-x-4 cursor-pointer"
              />
            </div>

            <Separator className="bg-border/60" />

            {/* Sound Switch */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Volume2 size={15} className="text-indigo-500" /> Quiz Sound Effects
                </Label>
                <p className="text-xs text-muted-foreground">Play correction sounds and ticking countdown indicators.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.soundEffects}
                onChange={(e) => setPreferences((p) => ({ ...p, soundEffects: e.target.checked }))}
                className="w-9 h-5 rounded-full bg-muted border border-border appearance-none checked:bg-indigo-600 transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:translate-x-4 cursor-pointer"
              />
            </div>

            <Separator className="bg-border/60" />

            {/* Default Difficulty selection */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">Default Quiz Difficulty</Label>
              <div className="grid grid-cols-3 gap-2">
                {["easy", "medium", "hard"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setPreferences((p) => ({ ...p, difficulty: level }))}
                    className={`py-2 px-3 border rounded-lg text-xs font-semibold capitalize transition-all duration-200 cursor-pointer ${
                      preferences.difficulty === level
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                        : "bg-muted/30 hover:bg-muted border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t border-border/50 pt-4 bg-muted/10">
            <Button
              onClick={savePreferences}
              disabled={isSavingPrefs}
              className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-28 cursor-pointer"
            >
              {isSavingPrefs ? (
                <>Updating...</>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Save Preferences
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Separator />

      {/* Danger Zone */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-2">
          <h3 className="text-sm font-semibold text-rose-500 flex items-center gap-1.5">
            <ShieldAlert size={16} /> Danger Zone
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Permanent account operations. Once executed, actions cannot be reversed.
          </p>
        </div>

        <Card className="md:col-span-2 border border-rose-500/20 bg-rose-500/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-rose-600 dark:text-rose-400">Delete Account</CardTitle>
            <CardDescription className="text-xs text-rose-600/70 dark:text-rose-400/70">
              Permanently delete all your records, stats, leaderboards rankings, and profile details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Please note that deleting your account will erase everything. This is a non-reversible operation.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end border-t border-rose-500/10 pt-4">
            <Button
              variant="destructive"
              onClick={() => {
                const conf = window.confirm("Are you sure you want to permanently delete your account?");
                if (conf) toast.error("Account delete requested! (Mock)");
              }}
              className="bg-rose-600 text-white hover:bg-rose-500 cursor-pointer"
            >
              Permanently Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SettingsPage;
