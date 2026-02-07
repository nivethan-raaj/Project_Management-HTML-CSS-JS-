"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { PriorityBadge, StatusBadge } from "./home-page";

export default function MyTasksPage() {
  const { tasks, updateTask, deleteTask, setCurrentPage } = useApp();
  const [view, setView] = useState("list");
  const [filterPriority, setFilterPriority] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const myTasks = tasks.filter((t) => t.assignee === "You");
  const filteredTasks = myTasks.filter((t) => {
    if (filterPriority !== "All" && t.priority !== filterPriority) return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sections = ["To do", "Doing", "Done"];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">My Tasks</h1>
        <button
          onClick={() => setCurrentPage("add-task")}
          className="flex items-center gap-2 px-4 py-2 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg text-sm font-medium transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Task
        </button>
      </div>

      {/* View Tabs and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1 bg-[hsl(220,15%,14%)] rounded-lg p-1 border border-[hsl(220,12%,20%)]">
          {["list", "board", "timeline", "calendar"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                view === v
                  ? "bg-[hsl(210,80%,56%)] text-[hsl(0,0%,100%)]"
                  : "text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215,15%,40%)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,20%)] rounded-lg text-sm text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)] w-48"
            />
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,20%)] rounded-lg text-sm text-[hsl(210,20%,90%)] focus:outline-none focus:border-[hsl(210,80%,56%)]"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Views */}
      {view === "list" && <ListView tasks={filteredTasks} sections={sections} updateTask={updateTask} deleteTask={deleteTask} />}
      {view === "board" && <BoardView tasks={filteredTasks} sections={sections} updateTask={updateTask} />}
      {view === "timeline" && <TimelineView tasks={filteredTasks} sections={sections} />}
      {view === "calendar" && <CalendarView tasks={filteredTasks} />}
    </div>
  );
}

/* LIST VIEW */
function ListView({ tasks, sections, updateTask, deleteTask }) {
  return (
    <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-[hsl(220,15%,12%)] border-b border-[hsl(220,12%,20%)] text-xs text-[hsl(215,15%,50%)] font-medium uppercase tracking-wide">
        <div className="col-span-5">Task name</div>
        <div className="col-span-2">Assignee</div>
        <div className="col-span-2">Due date</div>
        <div className="col-span-1">Priority</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1" />
      </div>

      {sections.map((section) => {
        const sectionTasks = tasks.filter((t) => t.section === section);
        return (
          <div key={section}>
            <div className="flex items-center gap-2 px-5 py-3 bg-[hsl(220,15%,11%)] border-b border-[hsl(220,12%,20%)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(215,15%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <span className="text-sm font-semibold text-[hsl(210,20%,88%)]">{section}</span>
              <span className="text-xs text-[hsl(215,15%,45%)] ml-1">({sectionTasks.length})</span>
            </div>
            {sectionTasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-[hsl(220,12%,20%)] hover:bg-[hsl(220,15%,16%)] transition-colors items-center"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateTask(task.id, {
                        section: task.section === "Done" ? "To do" : "Done",
                      })
                    }
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
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
                  <span className={`text-sm truncate ${task.section === "Done" ? "text-[hsl(215,15%,45%)] line-through" : "text-[hsl(210,20%,88%)]"}`}>
                    {task.name}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[hsl(210,80%,56%,0.2)] flex items-center justify-center text-[10px] text-[hsl(210,80%,65%)] font-medium">
                      {task.assignee.charAt(0)}
                    </div>
                    <span className="text-sm text-[hsl(215,15%,55%)] truncate">{task.assignee}</span>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-[hsl(215,15%,55%)]">
                  {formatDate(task.dueDate)}
                </div>
                <div className="col-span-1">
                  <PriorityBadge priority={task.priority} />
                </div>
                <div className="col-span-1">
                  <StatusBadge status={task.status} />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-[hsl(215,15%,40%)] hover:text-[hsl(0,72%,60%)] transition-colors p-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5-3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            {sectionTasks.length === 0 && (
              <div className="px-5 py-4 text-sm text-[hsl(215,15%,40%)] border-b border-[hsl(220,12%,20%)]">
                No tasks in this section
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* BOARD VIEW */
function BoardView({ tasks, sections, updateTask }) {
  const handleDrop = (taskId, newSection) => {
    updateTask(taskId, { section: newSection });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sections.map((section) => {
        const sectionTasks = tasks.filter((t) => t.section === section);
        const sectionColors = {
          "To do": "hsl(210,80%,56%)",
          Doing: "hsl(38,92%,50%)",
          Done: "hsl(142,72%,42%)",
        };

        return (
          <div
            key={section}
            className="bg-[hsl(220,15%,12%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const taskId = e.dataTransfer.getData("taskId");
              handleDrop(taskId, section);
            }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[hsl(220,12%,20%)]">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sectionColors[section] }} />
              <span className="text-sm font-semibold text-[hsl(210,20%,90%)]">{section}</span>
              <span className="text-xs text-[hsl(215,15%,45%)] ml-auto bg-[hsl(220,15%,18%)] px-2 py-0.5 rounded-full">{sectionTasks.length}</span>
            </div>
            <div className="p-3 space-y-2 min-h-[200px]">
              {sectionTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                  className="bg-[hsl(220,15%,16%)] rounded-lg p-3 border border-[hsl(220,12%,22%)] cursor-grab active:cursor-grabbing hover:border-[hsl(210,80%,56%,0.3)] transition-colors"
                >
                  <p className="text-sm text-[hsl(210,20%,88%)] mb-2">{task.name}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={task.priority} />
                      <StatusBadge status={task.status} />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[hsl(210,80%,56%,0.2)] flex items-center justify-center text-[10px] text-[hsl(210,80%,65%)] font-medium">
                      {task.assignee.charAt(0)}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-[hsl(215,15%,45%)]">{formatDate(task.dueDate)}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* TIMELINE VIEW */
function TimelineView({ tasks, sections }) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 3);
  const days = [];
  for (let i = 0; i < 21; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  const getTaskPosition = (task) => {
    const dueDate = new Date(task.dueDate);
    const startD = new Date(dueDate);
    startD.setDate(startD.getDate() - 3);
    const startIdx = Math.max(
      0,
      Math.round((startD - startDate) / (1000 * 60 * 60 * 24))
    );
    const endIdx = Math.min(
      days.length - 1,
      Math.round((dueDate - startDate) / (1000 * 60 * 60 * 24))
    );
    return { startIdx, endIdx: Math.max(startIdx + 1, endIdx) };
  };

  const taskColors = {
    High: "hsl(0,72%,51%)",
    Medium: "hsl(38,92%,50%)",
    Low: "hsl(210,80%,56%)",
  };

  return (
    <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-x-auto">
      {/* Header */}
      <div className="flex border-b border-[hsl(220,12%,20%)] min-w-[800px]">
        <div className="w-40 flex-shrink-0 px-4 py-2 bg-[hsl(220,15%,12%)]" />
        <div className="flex-1 flex">
          {days.map((d, i) => {
            const isToday = d.toDateString() === today.toDateString();
            return (
              <div
                key={i}
                className={`flex-1 text-center text-xs py-2 border-l border-[hsl(220,12%,20%)] ${
                  isToday ? "bg-[hsl(210,80%,56%,0.08)] text-[hsl(210,80%,65%)]" : "text-[hsl(215,15%,45%)]"
                }`}
              >
                {d.getDate()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rows */}
      {sections.map((section) => {
        const sectionTasks = tasks.filter((t) => t.section === section);
        return (
          <div key={section}>
            <div className="flex items-center px-4 py-2 bg-[hsl(220,15%,11%)] border-b border-[hsl(220,12%,20%)] min-w-[800px]">
              <span className="text-sm font-semibold text-[hsl(210,20%,88%)]">{section}</span>
            </div>
            {sectionTasks.map((task) => {
              const pos = getTaskPosition(task);
              return (
                <div key={task.id} className="flex items-center min-h-[40px] border-b border-[hsl(220,12%,20%)] min-w-[800px]">
                  <div className="w-40 flex-shrink-0 px-4 text-xs text-[hsl(215,15%,55%)] truncate">
                    {task.name}
                  </div>
                  <div className="flex-1 relative flex">
                    {days.map((_, i) => (
                      <div key={i} className="flex-1 border-l border-[hsl(220,12%,20%)] min-h-[40px]" />
                    ))}
                    <div
                      className="absolute top-1.5 h-7 rounded-md flex items-center px-2"
                      style={{
                        left: `${(pos.startIdx / days.length) * 100}%`,
                        width: `${((pos.endIdx - pos.startIdx) / days.length) * 100}%`,
                        backgroundColor: taskColors[task.priority] + "33",
                        borderLeft: `3px solid ${taskColors[task.priority]}`,
                      }}
                    >
                      <span className="text-[10px] text-[hsl(210,20%,85%)] truncate">{task.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            {sectionTasks.length === 0 && (
              <div className="flex min-h-[40px] border-b border-[hsl(220,12%,20%)] min-w-[800px]">
                <div className="w-40 flex-shrink-0 px-4 flex items-center text-xs text-[hsl(215,15%,35%)]">
                  No tasks
                </div>
                <div className="flex-1 flex">
                  {days.map((_, i) => (
                    <div key={i} className="flex-1 border-l border-[hsl(220,12%,20%)]" />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* CALENDAR VIEW */
function CalendarView({ tasks }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const getTasksForDay = (day) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((t) => t.dueDate === dateStr);
  };

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const taskColors = {
    High: "hsl(0,72%,51%)",
    Medium: "hsl(38,92%,50%)",
    Low: "hsl(210,80%,56%)",
  };

  return (
    <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(220,12%,20%)]">
        <button onClick={prevMonth} className="p-1 hover:bg-[hsl(220,15%,20%)] rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(215,15%,60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-base font-semibold text-[hsl(210,20%,92%)]">{monthName}</h2>
        <button onClick={nextMonth} className="p-1 hover:bg-[hsl(220,15%,20%)] rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(215,15%,60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 border-b border-[hsl(220,12%,20%)]">
        {dayNames.map((d) => (
          <div key={d} className="px-2 py-2 text-center text-xs text-[hsl(215,15%,50%)] font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const dayTasks = getTasksForDay(day);
          const isToday = day && today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
          return (
            <div
              key={i}
              className={`min-h-[90px] border-b border-r border-[hsl(220,12%,20%)] p-1.5 ${
                day ? "hover:bg-[hsl(220,15%,16%)]" : "bg-[hsl(220,15%,11%)]"
              }`}
            >
              {day && (
                <>
                  <span className={`text-xs inline-flex items-center justify-center w-6 h-6 rounded-full ${
                    isToday ? "bg-[hsl(210,80%,56%)] text-[hsl(0,0%,100%)]" : "text-[hsl(215,15%,55%)]"
                  }`}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {dayTasks.slice(0, 2).map((t) => (
                      <div
                        key={t.id}
                        className="text-[10px] px-1.5 py-0.5 rounded truncate"
                        style={{
                          backgroundColor: taskColors[t.priority] + "22",
                          color: taskColors[t.priority],
                        }}
                      >
                        {t.name}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-[10px] text-[hsl(215,15%,45%)] px-1.5">
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
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
