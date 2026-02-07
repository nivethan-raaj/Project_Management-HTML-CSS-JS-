"use client";

import { useApp } from "@/lib/app-context";

export default function HomePage() {
  const { user, tasks, projects, setCurrentPage, setCurrentProject } = useApp();
  const myTasks = tasks.filter((t) => t.assignee === "You");
  const todoTasks = myTasks.filter((t) => t.section === "To do");
  const doingTasks = myTasks.filter((t) => t.section === "Doing");
  const doneTasks = myTasks.filter((t) => t.section === "Done");

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)] mb-1">
          {greeting()}, {user?.name || "there"}
        </h1>
        <p className="text-[hsl(215,15%,55%)]">
          {"Here's what's happening across your projects."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Tasks", value: myTasks.length, color: "hsl(210,80%,56%)" },
          { label: "To Do", value: todoTasks.length, color: "hsl(215,15%,55%)" },
          { label: "In Progress", value: doingTasks.length, color: "hsl(38,92%,50%)" },
          { label: "Completed", value: doneTasks.length, color: "hsl(142,72%,42%)" },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-5"
          >
            <p className="text-sm text-[hsl(215,15%,55%)] mb-1">{s.label}</p>
            <p className="text-3xl font-bold" style={{ color: s.color }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Tasks */}
        <div className="lg:col-span-2 bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(220,12%,20%)]">
            <h2 className="text-base font-semibold text-[hsl(210,20%,92%)]">My Tasks</h2>
            <button
              onClick={() => setCurrentPage("my-tasks")}
              className="text-sm text-[hsl(210,80%,56%)] hover:underline"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-[hsl(220,12%,20%)]">
            {myTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center gap-4 px-5 py-3 hover:bg-[hsl(220,15%,16%)] transition-colors">
                <button
                  onClick={() => {
                    /* toggle done */
                  }}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    task.section === "Done"
                      ? "bg-[hsl(142,72%,42%)] border-[hsl(142,72%,42%)]"
                      : "border-[hsl(220,12%,30%)] hover:border-[hsl(210,80%,56%)]"
                  }`}
                >
                  {task.section === "Done" && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${task.section === "Done" ? "text-[hsl(215,15%,45%)] line-through" : "text-[hsl(210,20%,88%)]"}`}>
                    {task.name}
                  </p>
                </div>
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
                <span className="text-xs text-[hsl(215,15%,45%)] flex-shrink-0">
                  {formatDate(task.dueDate)}
                </span>
              </div>
            ))}
            {myTasks.length === 0 && (
              <div className="px-5 py-10 text-center text-[hsl(215,15%,45%)] text-sm">
                No tasks assigned to you yet.
              </div>
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(220,12%,20%)]">
            <h2 className="text-base font-semibold text-[hsl(210,20%,92%)]">Projects</h2>
            <button
              onClick={() => setCurrentPage("projects")}
              className="text-sm text-[hsl(210,80%,56%)] hover:underline"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-[hsl(220,12%,20%)]">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setCurrentProject(project);
                  setCurrentPage("project-detail");
                }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[hsl(220,15%,16%)] transition-colors text-left"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[hsl(0,0%,100%)] text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                >
                  {project.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[hsl(210,20%,88%)] truncate">{project.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${project.progress}%`,
                          backgroundColor: project.color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-[hsl(215,15%,50%)]">{project.progress}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[hsl(220,12%,20%)]">
          <h2 className="text-base font-semibold text-[hsl(210,20%,92%)]">Recent Activity</h2>
        </div>
        <div className="divide-y divide-[hsl(220,12%,20%)]">
          {[
            { action: "created task", item: "Design homepage mockup", project: "Website Redesign", time: "2 hours ago" },
            { action: "completed task", item: "Social media content plan", project: "Marketing Campaign Q1", time: "5 hours ago" },
            { action: "updated project", item: "Mobile App Development", project: "", time: "1 day ago" },
            { action: "added goal", item: "Launch redesigned website", project: "", time: "2 days ago" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(210,80%,56%,0.12)] flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-[hsl(210,80%,56%)]">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[hsl(210,20%,85%)]">
                  <span className="font-medium text-[hsl(210,20%,92%)]">{user?.name || "You"}</span>{" "}
                  {a.action}{" "}
                  <span className="font-medium text-[hsl(210,80%,65%)]">{a.item}</span>
                  {a.project && <span className="text-[hsl(215,15%,50%)]"> in {a.project}</span>}
                </p>
              </div>
              <span className="text-xs text-[hsl(215,15%,45%)] flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-[hsl(0,72%,51%,0.15)] text-[hsl(0,72%,65%)]",
    Medium: "bg-[hsl(38,92%,50%,0.15)] text-[hsl(38,92%,60%)]",
    Low: "bg-[hsl(210,80%,56%,0.15)] text-[hsl(210,80%,65%)]",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${styles[priority] || styles.Low}`}>
      {priority}
    </span>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    "On track": "bg-[hsl(142,72%,42%,0.15)] text-[hsl(142,72%,55%)]",
    "At risk": "bg-[hsl(38,92%,50%,0.15)] text-[hsl(38,92%,60%)]",
    "Off track": "bg-[hsl(0,72%,51%,0.15)] text-[hsl(0,72%,65%)]",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
