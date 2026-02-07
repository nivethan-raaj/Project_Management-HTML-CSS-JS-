"use client";

import { useApp } from "@/lib/app-context";
import { StatusBadge } from "./home-page";

export default function PortfoliosPage() {
  const { projects, setCurrentPage, setCurrentProject } = useApp();

  const portfolios = [
    {
      id: "pf1",
      name: "Engineering Portfolio",
      description: "All engineering and development projects",
      projectIds: ["p1", "p2", "p4"],
      color: "hsl(210,80%,56%)",
    },
    {
      id: "pf2",
      name: "Marketing Portfolio",
      description: "Marketing campaigns and brand projects",
      projectIds: ["p3"],
      color: "hsl(38,92%,50%)",
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">Portfolios</h1>
      </div>

      <p className="text-[hsl(215,15%,55%)] mb-8">
        Portfolios group related projects together to give you a high-level view of progress across initiatives.
      </p>

      <div className="space-y-6">
        {portfolios.map((portfolio) => {
          const portfolioProjects = projects.filter((p) =>
            portfolio.projectIds.includes(p.id)
          );
          const avgProgress = portfolioProjects.length
            ? Math.round(
                portfolioProjects.reduce((sum, p) => sum + p.progress, 0) /
                  portfolioProjects.length
              )
            : 0;

          return (
            <div
              key={portfolio.id}
              className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden"
            >
              {/* Portfolio Header */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-[hsl(220,12%,20%)]">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[hsl(0,0%,100%)] font-bold"
                  style={{ backgroundColor: portfolio.color }}
                >
                  {portfolio.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[hsl(210,20%,92%)]">
                    {portfolio.name}
                  </h2>
                  <p className="text-sm text-[hsl(215,15%,50%)]">
                    {portfolio.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-[hsl(215,15%,50%)]">Avg. Progress</p>
                    <p className="text-xl font-bold" style={{ color: portfolio.color }}>
                      {avgProgress}%
                    </p>
                  </div>
                  <div className="w-16 h-16 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="26" fill="none" stroke="hsl(220,12%,20%)" strokeWidth="6" />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        fill="none"
                        stroke={portfolio.color}
                        strokeWidth="6"
                        strokeDasharray={`${(avgProgress / 100) * 163.36} 163.36`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Projects in Portfolio */}
              <div className="divide-y divide-[hsl(220,12%,20%)]">
                {portfolioProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      setCurrentProject(project);
                      setCurrentPage("project-detail");
                    }}
                    className="w-full flex items-center gap-4 px-6 py-3.5 hover:bg-[hsl(220,15%,16%)] transition-colors text-left"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[hsl(0,0%,100%)] text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[hsl(210,20%,90%)] truncate">
                        {project.name}
                      </p>
                    </div>
                    <StatusBadge status={project.status} />
                    <div className="flex items-center gap-2 w-32">
                      <div className="flex-1 h-1.5 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${project.progress}%`,
                            backgroundColor: project.color,
                          }}
                        />
                      </div>
                      <span className="text-xs text-[hsl(215,15%,50%)] w-8 text-right">
                        {project.progress}%
                      </span>
                    </div>
                    <span className="text-xs text-[hsl(215,15%,45%)]">
                      {project.members.length} members
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
