"use client";

import { useApp } from "@/lib/app-context";

export default function ReportingPage() {
  const { tasks, projects, goals } = useApp();
  const myTasks = tasks.filter((t) => t.assignee === "You");

  const statusCounts = {
    "On track": tasks.filter((t) => t.status === "On track").length,
    "At risk": tasks.filter((t) => t.status === "At risk").length,
    "Off track": tasks.filter((t) => t.status === "Off track").length,
  };

  const sectionCounts = {
    "To do": tasks.filter((t) => t.section === "To do").length,
    Doing: tasks.filter((t) => t.section === "Doing").length,
    Done: tasks.filter((t) => t.section === "Done").length,
  };

  const priorityCounts = {
    High: tasks.filter((t) => t.priority === "High").length,
    Medium: tasks.filter((t) => t.priority === "Medium").length,
    Low: tasks.filter((t) => t.priority === "Low").length,
  };

  const totalTasks = tasks.length;
  const completionRate = totalTasks
    ? Math.round((sectionCounts.Done / totalTasks) * 100)
    : 0;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">Reporting</h1>
        <p className="text-sm text-[hsl(215,15%,55%)] mt-1">
          Overview of project and task performance across all your work.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Tasks", value: totalTasks, color: "hsl(210,80%,56%)" },
          { label: "Total Projects", value: projects.length, color: "hsl(280,65%,60%)" },
          { label: "Active Goals", value: goals.length, color: "hsl(38,92%,50%)" },
          { label: "Completion Rate", value: `${completionRate}%`, color: "hsl(142,72%,42%)" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-5"
          >
            <p className="text-sm text-[hsl(215,15%,55%)] mb-1">{stat.label}</p>
            <p className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Task Distribution by Section */}
        <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6">
          <h2 className="text-base font-semibold text-[hsl(210,20%,92%)] mb-5">
            Task Distribution
          </h2>
          <div className="space-y-4">
            {Object.entries(sectionCounts).map(([section, count]) => {
              const pct = totalTasks ? Math.round((count / totalTasks) * 100) : 0;
              const colors = {
                "To do": "hsl(210,80%,56%)",
                Doing: "hsl(38,92%,50%)",
                Done: "hsl(142,72%,42%)",
              };
              return (
                <div key={section}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[section] }}
                      />
                      <span className="text-sm text-[hsl(210,20%,85%)]">{section}</span>
                    </div>
                    <span className="text-sm text-[hsl(215,15%,55%)]">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: colors[section],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6">
          <h2 className="text-base font-semibold text-[hsl(210,20%,92%)] mb-5">
            Status Overview
          </h2>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const pct = totalTasks ? Math.round((count / totalTasks) * 100) : 0;
              const colors = {
                "On track": "hsl(142,72%,42%)",
                "At risk": "hsl(38,92%,50%)",
                "Off track": "hsl(0,72%,51%)",
              };
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[status] }}
                      />
                      <span className="text-sm text-[hsl(210,20%,85%)]">{status}</span>
                    </div>
                    <span className="text-sm text-[hsl(215,15%,55%)]">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: colors[status],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Breakdown */}
        <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6">
          <h2 className="text-base font-semibold text-[hsl(210,20%,92%)] mb-5">
            Priority Breakdown
          </h2>
          <div className="flex items-end gap-6 h-40">
            {Object.entries(priorityCounts).map(([priority, count]) => {
              const maxCount = Math.max(...Object.values(priorityCounts), 1);
              const height = (count / maxCount) * 100;
              const colors = {
                High: "hsl(0,72%,51%)",
                Medium: "hsl(38,92%,50%)",
                Low: "hsl(210,80%,56%)",
              };
              return (
                <div key={priority} className="flex-1 flex flex-col items-center">
                  <span className="text-lg font-bold text-[hsl(210,20%,90%)] mb-2">
                    {count}
                  </span>
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${height}%`,
                      backgroundColor: colors[priority],
                      minHeight: "8px",
                    }}
                  />
                  <span className="text-xs text-[hsl(215,15%,55%)] mt-2">{priority}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6">
          <h2 className="text-base font-semibold text-[hsl(210,20%,92%)] mb-5">
            Project Progress
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-lg"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-sm text-[hsl(210,20%,85%)] truncate">
                      {project.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: project.color }}>
                    {project.progress}%
                  </span>
                </div>
                <div className="h-2 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
