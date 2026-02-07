"use client";

import { useApp } from "@/lib/app-context";
import { StatusBadge } from "./home-page";

export default function GoalsPage() {
  const { goals, setCurrentPage } = useApp();

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">Goals</h1>
        <button
          onClick={() => setCurrentPage("add-goal")}
          className="flex items-center gap-2 px-4 py-2 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg text-sm font-medium transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Goal
        </button>
      </div>

      <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-[hsl(220,15%,12%)] border-b border-[hsl(220,12%,20%)] text-xs text-[hsl(215,15%,50%)] font-medium uppercase tracking-wide">
          <div className="col-span-3">Goal</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Progress</div>
          <div className="col-span-2">Time Period</div>
          <div className="col-span-2">Team</div>
          <div className="col-span-1">Owner</div>
        </div>

        {goals.map((goal) => (
          <div key={goal.id} className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-[hsl(220,12%,20%)] hover:bg-[hsl(220,15%,16%)] transition-colors items-center">
            <div className="col-span-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[hsl(210,80%,56%,0.12)] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(210,80%,56%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <span className="text-sm text-[hsl(210,20%,90%)]">{goal.name}</span>
              </div>
            </div>
            <div className="col-span-2"><StatusBadge status={goal.status} /></div>
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${goal.progress}%`,
                      backgroundColor:
                        goal.progress >= 70 ? "hsl(142,72%,42%)" : goal.progress >= 40 ? "hsl(38,92%,50%)" : "hsl(0,72%,51%)",
                    }}
                  />
                </div>
                <span className="text-xs text-[hsl(215,15%,55%)] w-8 text-right">{goal.progress}%</span>
              </div>
            </div>
            <div className="col-span-2 text-sm text-[hsl(215,15%,55%)]">{goal.timePeriod}</div>
            <div className="col-span-2 text-sm text-[hsl(215,15%,55%)]">{goal.team}</div>
            <div className="col-span-1">
              <div className="w-7 h-7 rounded-full bg-[hsl(210,80%,56%,0.2)] flex items-center justify-center text-[10px] text-[hsl(210,80%,65%)] font-medium">
                {goal.owner.charAt(0)}
              </div>
            </div>
          </div>
        ))}

        {goals.length === 0 && (
          <div className="text-center py-12 text-[hsl(215,15%,45%)]">
            <p className="mb-2">No goals yet</p>
            <button onClick={() => setCurrentPage("add-goal")} className="text-[hsl(210,80%,56%)] hover:underline text-sm">Create your first goal</button>
          </div>
        )}
      </div>
    </div>
  );
}
