"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";

function SidebarItem({ icon, label, active, onClick, collapsed }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
        active
          ? "bg-[hsl(220,15%,20%)] text-[hsl(210,20%,95%)]"
          : "text-[hsl(215,15%,60%)] hover:bg-[hsl(220,15%,16%)] hover:text-[hsl(210,20%,85%)]"
      }`}
      title={collapsed ? label : undefined}
    >
      <span className="text-lg flex-shrink-0">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

function SidebarSection({ title, collapsed }) {
  if (collapsed) return <div className="my-2 border-t border-[hsl(220,12%,18%)]" />;
  return (
    <div className="px-3 pt-4 pb-1">
      <span className="text-[10px] uppercase tracking-widest text-[hsl(215,15%,45%)] font-semibold">
        {title}
      </span>
    </div>
  );
}

export default function Sidebar() {
  const { currentPage, setCurrentPage, user, logout, sidebarCollapsed, setSidebarCollapsed } = useApp();
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const createOptions = [
    { label: "Task", icon: "\u2713", page: "add-task" },
    { label: "Project", icon: "\u25A1", page: "add-project" },
    { label: "Goal", icon: "\u25CE", page: "add-goal" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[hsl(220,18%,10%)] border-r border-[hsl(220,12%,18%)] flex flex-col z-40 transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-[hsl(220,12%,18%)]">
        <div className="w-8 h-8 rounded-lg bg-[hsl(210,80%,56%)] flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 17l10-10M12 7l10 10M2 7l10 10M12 17l10-10" />
          </svg>
        </div>
        {!sidebarCollapsed && (
          <span className="font-bold text-[hsl(210,20%,95%)] text-lg tracking-tight">
            ProjectFlow
          </span>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="ml-auto text-[hsl(215,15%,50%)] hover:text-[hsl(210,20%,85%)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {sidebarCollapsed ? (
              <polyline points="9 18 15 12 9 6" />
            ) : (
              <polyline points="15 18 9 12 15 6" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        <SidebarSection title="Home" collapsed={sidebarCollapsed} />
        <SidebarItem icon={<HomeIcon />} label="Home" active={currentPage === "home"} onClick={() => setCurrentPage("home")} collapsed={sidebarCollapsed} />
        <SidebarItem icon={<InboxIcon />} label="Inbox" active={currentPage === "inbox"} onClick={() => setCurrentPage("inbox")} collapsed={sidebarCollapsed} />

        <SidebarSection title="Work" collapsed={sidebarCollapsed} />
        <SidebarItem icon={<TaskIcon />} label="My Tasks" active={currentPage === "my-tasks"} onClick={() => setCurrentPage("my-tasks")} collapsed={sidebarCollapsed} />
        <SidebarItem icon={<ProjectIcon />} label="Projects" active={currentPage === "projects"} onClick={() => setCurrentPage("projects")} collapsed={sidebarCollapsed} />
        <SidebarItem icon={<PortfolioIcon />} label="Portfolios" active={currentPage === "portfolios"} onClick={() => setCurrentPage("portfolios")} collapsed={sidebarCollapsed} />

        <SidebarSection title="Strategy" collapsed={sidebarCollapsed} />
        <SidebarItem icon={<GoalIcon />} label="Goals" active={currentPage === "goals"} onClick={() => setCurrentPage("goals")} collapsed={sidebarCollapsed} />
        <SidebarItem icon={<ReportIcon />} label="Reporting" active={currentPage === "reporting"} onClick={() => setCurrentPage("reporting")} collapsed={sidebarCollapsed} />

        <SidebarSection title="More" collapsed={sidebarCollapsed} />
        <SidebarItem icon={<AboutIcon />} label="About" active={currentPage === "about"} onClick={() => setCurrentPage("about")} collapsed={sidebarCollapsed} />
        <SidebarItem icon={<SettingsIcon />} label="Settings" active={currentPage === "settings"} onClick={() => setCurrentPage("settings")} collapsed={sidebarCollapsed} />
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-[hsl(220,12%,18%)] p-3 space-y-2 relative">
        {/* Create button */}
        <div className="relative">
          <button
            onClick={() => { setShowCreateMenu(!showCreateMenu); setShowProfileMenu(false); }}
            className="w-full flex items-center justify-center gap-2 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] py-2 rounded-lg font-medium text-sm transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {!sidebarCollapsed && "Create"}
          </button>
          {showCreateMenu && (
            <div className="absolute bottom-12 left-0 w-52 bg-[hsl(220,15%,16%)] border border-[hsl(220,12%,22%)] rounded-xl shadow-2xl py-2 animate-scale-in z-50">
              {createOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => { setCurrentPage(opt.page); setShowCreateMenu(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[hsl(210,20%,85%)] hover:bg-[hsl(220,15%,22%)] transition-colors"
                >
                  <span className="text-[hsl(215,15%,50%)]">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowCreateMenu(false); }}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[hsl(220,15%,16%)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[hsl(210,80%,56%)] flex items-center justify-center text-[hsl(0,0%,100%)] text-sm font-semibold flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            {!sidebarCollapsed && (
              <div className="text-left overflow-hidden">
                <div className="text-sm text-[hsl(210,20%,90%)] truncate">{user?.name || "User"}</div>
                <div className="text-xs text-[hsl(215,15%,50%)] truncate">{user?.email || ""}</div>
              </div>
            )}
          </button>
          {showProfileMenu && (
            <div className="absolute bottom-14 left-0 w-60 bg-[hsl(220,15%,16%)] border border-[hsl(220,12%,22%)] rounded-xl shadow-2xl py-2 animate-scale-in z-50">
              <div className="px-4 py-3 border-b border-[hsl(220,12%,22%)]">
                <div className="text-sm font-medium text-[hsl(210,20%,90%)]">{user?.name || "User"}</div>
                <div className="text-xs text-[hsl(215,15%,50%)]">{user?.email || ""}</div>
              </div>
              <button
                onClick={() => { setCurrentPage("settings"); setShowProfileMenu(false); }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[hsl(210,20%,85%)] hover:bg-[hsl(220,15%,22%)] transition-colors"
              >
                <SettingsIcon /> Settings
              </button>
              <div className="border-t border-[hsl(220,12%,22%)] mt-1 pt-1">
                <button
                  onClick={() => { logout(); setShowProfileMenu(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[hsl(0,72%,60%)] hover:bg-[hsl(220,15%,22%)] transition-colors"
                >
                  <LogoutIcon /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

/* SVG Icons */
function HomeIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>);
}
function InboxIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" /></svg>);
}
function TaskIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>);
}
function ProjectIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>);
}
function PortfolioIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>);
}
function GoalIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>);
}
function ReportIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>);
}
function AboutIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>);
}
function SettingsIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>);
}
function LogoutIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>);
}
