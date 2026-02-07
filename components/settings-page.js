"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";

export default function SettingsPage() {
  const { user, setUser, logout, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: "Project Manager",
    bio: "",
  });
  const [notifSettings, setNotifSettings] = useState({
    emailNotifications: true,
    taskAssigned: true,
    taskCompleted: true,
    mentions: true,
    projectUpdates: false,
    weeklyDigest: true,
  });
  const [saved, setSaved] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, name: profileForm.name, email: profileForm.email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { key: "profile", label: "Profile", icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" },
    { key: "notifications", label: "Notifications", icon: "M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" },
    { key: "appearance", label: "Appearance", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
    { key: "account", label: "Account", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)] mb-6">Settings</h1>

      {saved && (
        <div className="bg-[hsl(142,72%,42%,0.12)] border border-[hsl(142,72%,42%,0.3)] text-[hsl(142,72%,55%)] text-sm px-4 py-3 rounded-lg mb-6 animate-fade-in">
          Settings saved successfully!
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <nav className="md:w-56 flex-shrink-0">
          <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  activeTab === tab.key
                    ? "bg-[hsl(210,80%,56%,0.08)] text-[hsl(210,80%,65%)] border-l-2 border-[hsl(210,80%,56%)]"
                    : "text-[hsl(215,15%,55%)] hover:bg-[hsl(220,15%,18%)] hover:text-[hsl(210,20%,85%)]"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSave} className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6 space-y-5">
              <h2 className="text-lg font-semibold text-[hsl(210,20%,92%)]">Profile Information</h2>
              <p className="text-sm text-[hsl(215,15%,55%)]">Update your personal information and how others see you.</p>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[hsl(210,80%,56%)] flex items-center justify-center text-[hsl(0,0%,100%)] text-2xl font-bold">
                  {profileForm.name.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <button type="button" className="px-4 py-2 bg-[hsl(220,15%,20%)] hover:bg-[hsl(220,15%,24%)] text-[hsl(210,20%,85%)] rounded-lg text-sm border border-[hsl(220,12%,22%)] transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-xs text-[hsl(215,15%,45%)] mt-1">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Role</label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm((p) => ({ ...p, role: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Bio</label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm((p) => ({ ...p, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows="3"
                  className="form-input resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-semibold text-sm transition-colors"
              >
                Save Changes
              </button>
            </form>
          )}

          {activeTab === "notifications" && (
            <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6 space-y-5">
              <h2 className="text-lg font-semibold text-[hsl(210,20%,92%)]">Notification Preferences</h2>
              <p className="text-sm text-[hsl(215,15%,55%)]">Choose what notifications you want to receive.</p>

              <div className="space-y-4">
                {[
                  { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
                  { key: "taskAssigned", label: "Task Assigned", desc: "When a task is assigned to you" },
                  { key: "taskCompleted", label: "Task Completed", desc: "When a task you own is completed" },
                  { key: "mentions", label: "Mentions", desc: "When someone mentions you in a comment" },
                  { key: "projectUpdates", label: "Project Updates", desc: "When a project status changes" },
                  { key: "weeklyDigest", label: "Weekly Digest", desc: "Weekly summary of your activity" },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between py-3 border-b border-[hsl(220,12%,20%)] last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[hsl(210,20%,88%)]">{setting.label}</p>
                      <p className="text-xs text-[hsl(215,15%,50%)]">{setting.desc}</p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifSettings((p) => ({ ...p, [setting.key]: !p[setting.key] }))
                      }
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        notifSettings[setting.key]
                          ? "bg-[hsl(210,80%,56%)]"
                          : "bg-[hsl(220,12%,25%)]"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-[hsl(0,0%,100%)] transition-transform shadow-sm ${
                          notifSettings[setting.key] ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6 space-y-5">
              <h2 className="text-lg font-semibold text-[hsl(210,20%,92%)]">Appearance</h2>
              <p className="text-sm text-[hsl(215,15%,55%)]">Customize the look and feel of the application.</p>

              <div>
                <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Dark", active: true, bg: "hsl(220,15%,8%)", fg: "hsl(210,20%,90%)" },
                    { label: "Light", active: false, bg: "hsl(0,0%,100%)", fg: "hsl(220,15%,15%)" },
                    { label: "System", active: false, bg: "linear-gradient(135deg, hsl(0,0%,100%) 50%, hsl(220,15%,8%) 50%)", fg: "" },
                  ].map((theme) => (
                    <button
                      key={theme.label}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        theme.active
                          ? "border-[hsl(210,80%,56%)]"
                          : "border-[hsl(220,12%,22%)] hover:border-[hsl(220,12%,30%)]"
                      }`}
                    >
                      <div
                        className="w-full h-16 rounded-lg mb-2"
                        style={{ background: theme.bg }}
                      />
                      <span className="text-sm text-[hsl(210,20%,85%)]">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {["hsl(210,80%,56%)", "hsl(142,72%,42%)", "hsl(38,92%,50%)", "hsl(0,72%,51%)", "hsl(280,65%,60%)"].map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full transition-all ${
                        color === "hsl(210,80%,56%)" ? "ring-2 ring-offset-2 ring-offset-[hsl(220,15%,14%)] ring-[hsl(210,80%,56%)]" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-2">Sidebar Collapsed</label>
                <p className="text-xs text-[hsl(215,15%,50%)] mb-2">Toggle sidebar between expanded and collapsed state.</p>
                <button
                  className="px-4 py-2 bg-[hsl(220,15%,20%)] hover:bg-[hsl(220,15%,24%)] text-[hsl(210,20%,85%)] rounded-lg text-sm border border-[hsl(220,12%,22%)] transition-colors"
                >
                  Toggle Sidebar
                </button>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="space-y-6">
              <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6 space-y-5">
                <h2 className="text-lg font-semibold text-[hsl(210,20%,92%)]">Account Security</h2>

                <div>
                  <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Current Password</label>
                  <input type="password" placeholder="Enter current password" className="form-input" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">New Password</label>
                    <input type="password" placeholder="Enter new password" className="form-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Confirm Password</label>
                    <input type="password" placeholder="Confirm new password" className="form-input" />
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-semibold text-sm transition-colors">
                  Update Password
                </button>
              </div>

              {/* Danger Zone */}
              <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(0,72%,51%,0.3)] p-6">
                <h2 className="text-lg font-semibold text-[hsl(0,72%,65%)] mb-2">Danger Zone</h2>
                <p className="text-sm text-[hsl(215,15%,55%)] mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { logout(); setCurrentPage("landing"); }}
                    className="px-4 py-2 bg-[hsl(220,15%,20%)] hover:bg-[hsl(220,15%,24%)] text-[hsl(210,20%,85%)] rounded-lg text-sm border border-[hsl(220,12%,22%)] transition-colors"
                  >
                    Log Out
                  </button>
                  <button className="px-4 py-2 bg-[hsl(0,72%,51%,0.12)] hover:bg-[hsl(0,72%,51%,0.2)] text-[hsl(0,72%,65%)] rounded-lg text-sm border border-[hsl(0,72%,51%,0.3)] transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
