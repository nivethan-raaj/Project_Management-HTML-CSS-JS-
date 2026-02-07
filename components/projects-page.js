"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { PriorityBadge, StatusBadge } from "./home-page";

export function ProjectsPage() {
  const { projects, setCurrentPage, setCurrentProject, setProjects, tasks, deleteTask } = useApp();
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProject = (projectId) => {
    // Delete all tasks under this project too
    const projectTasks = tasks.filter((t) => t.projectId === projectId);
    projectTasks.forEach((t) => deleteTask(t.id));
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setConfirmDelete(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">Projects</h1>
        <button
          onClick={() => setCurrentPage("add-project")}
          className="flex items-center gap-2 px-4 py-2 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg text-sm font-medium transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </button>
      </div>

      {/* Search and view toggle */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215,15%,40%)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,20%)] rounded-lg text-sm text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)]"
          />
        </div>
        <div className="flex items-center gap-1 bg-[hsl(220,15%,14%)] rounded-lg p-1 border border-[hsl(220,12%,20%)]">
          <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-[hsl(220,15%,22%)]" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={viewMode === "grid" ? "hsl(210,20%,90%)" : "hsl(215,15%,45%)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
          <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-[hsl(220,15%,22%)]" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={viewMode === "list" ? "hsl(210,20%,90%)" : "hsl(215,15%,45%)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-5 hover:border-[hsl(210,80%,56%,0.3)] transition-all relative group"
            >
              {/* Delete button */}
              <button
                onClick={(e) => { e.stopPropagation(); setConfirmDelete(project.id); }}
                className="absolute top-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[hsl(0,72%,51%,0.12)] transition-all"
                title="Delete project"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(0,72%,60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5-3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                </svg>
              </button>

              <button
                onClick={() => {
                  setCurrentProject(project);
                  setCurrentPage("project-detail");
                }}
                className="text-left w-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-[hsl(0,0%,100%)] text-base font-bold"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[hsl(210,20%,92%)]">{project.name}</h3>
                    <p className="text-xs text-[hsl(215,15%,50%)]">{project.members.length} members</p>
                  </div>
                </div>
                <p className="text-xs text-[hsl(215,15%,50%)] mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <StatusBadge status={project.status} />
                  <span className="text-xs text-[hsl(215,15%,45%)]">{tasks.filter((t) => t.projectId === project.id).length} tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                    />
                  </div>
                  <span className="text-xs text-[hsl(215,15%,50%)]">{project.progress}%</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-[hsl(220,15%,12%)] border-b border-[hsl(220,12%,20%)] text-xs text-[hsl(215,15%,50%)] font-medium uppercase tracking-wide">
            <div className="col-span-3">Project</div>
            <div className="col-span-2">Members</div>
            <div className="col-span-1">Tasks</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Progress</div>
            <div className="col-span-2">Actions</div>
          </div>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-[hsl(220,12%,20%)] hover:bg-[hsl(220,15%,16%)] transition-colors items-center"
            >
              <button
                onClick={() => {
                  setCurrentProject(project);
                  setCurrentPage("project-detail");
                }}
                className="col-span-3 flex items-center gap-3 text-left"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[hsl(0,0%,100%)] text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                >
                  {project.name.charAt(0)}
                </div>
                <span className="text-sm text-[hsl(210,20%,90%)] truncate">{project.name}</span>
              </button>
              <div className="col-span-2 text-sm text-[hsl(215,15%,55%)]">{project.members.length} members</div>
              <div className="col-span-1 text-sm text-[hsl(215,15%,55%)]">{tasks.filter((t) => t.projectId === project.id).length}</div>
              <div className="col-span-2"><StatusBadge status={project.status} /></div>
              <div className="col-span-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                </div>
                <span className="text-xs text-[hsl(215,15%,50%)]">{project.progress}%</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <button
                  onClick={() => { setCurrentProject(project); setCurrentPage("project-detail"); }}
                  className="px-3 py-1 text-xs bg-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,22%)] text-[hsl(210,20%,85%)] rounded-md border border-[hsl(220,12%,22%)] transition-colors"
                >
                  Open
                </button>
                <button
                  onClick={() => setConfirmDelete(project.id)}
                  className="p-1 hover:bg-[hsl(0,72%,51%,0.12)] rounded transition-colors"
                  title="Delete project"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(0,72%,60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5-3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-[hsl(215,15%,45%)]">
          <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(215,15%,30%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
          </svg>
          <p className="text-lg mb-2">No projects found</p>
          <p className="text-sm mb-4">Create a new project to get started.</p>
          <button
            onClick={() => setCurrentPage("add-project")}
            className="px-5 py-2 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg text-sm font-medium transition-colors"
          >
            Create your first project
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(220,15%,5%,0.7)] backdrop-blur-sm">
          <div className="bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,22%)] rounded-xl p-6 max-w-sm w-full mx-4 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-[hsl(0,72%,51%,0.12)] flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(0,72%,60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5-3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(210,20%,95%)] text-center mb-2">Delete Project?</h3>
            <p className="text-sm text-[hsl(215,15%,55%)] text-center mb-6">
              This will permanently delete the project and all its tasks. This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2.5 bg-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,22%)] text-[hsl(210,20%,85%)] rounded-lg text-sm font-medium border border-[hsl(220,12%,22%)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(confirmDelete)}
                className="flex-1 px-4 py-2.5 bg-[hsl(0,72%,51%)] hover:bg-[hsl(0,72%,44%)] text-[hsl(0,0%,100%)] rounded-lg text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Project Detail View with inline task creation */
export function ProjectDetailPage() {
  const { currentProject, tasks, setCurrentPage, addTask, updateTask, deleteTask } = useApp();
  const [view, setView] = useState("list");
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskSection, setNewTaskSection] = useState("To do");

  if (!currentProject) {
    return (
      <div className="text-center py-16 text-[hsl(215,15%,45%)]">
        <p>No project selected</p>
        <button onClick={() => setCurrentPage("projects")} className="text-[hsl(210,80%,56%)] hover:underline mt-2">
          Back to projects
        </button>
      </div>
    );
  }

  const projectTasks = tasks.filter((t) => t.projectId === currentProject.id);
  const sections = ["To do", "Doing", "Done"];

  const handleQuickAddTask = (e) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    addTask({
      name: newTaskName.trim(),
      projectId: currentProject.id,
      assignee: "You",
      dueDate: newTaskDueDate || new Date().toISOString().split("T")[0],
      priority: newTaskPriority,
      status: "On track",
      section: newTaskSection,
      description: "",
    });
    setNewTaskName("");
    setNewTaskDueDate("");
    setNewTaskPriority("Medium");
    setNewTaskSection("To do");
    setShowAddTask(false);
  };

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => setCurrentPage("projects")}
        className="flex items-center gap-2 text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)] text-sm mb-4 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to projects
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-[hsl(0,0%,100%)] text-xl font-bold"
          style={{ backgroundColor: currentProject.color }}
        >
          {currentProject.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">{currentProject.name}</h1>
          <p className="text-sm text-[hsl(215,15%,55%)]">{currentProject.description}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <StatusBadge status={currentProject.status} />
          <span className="text-xs text-[hsl(215,15%,50%)]">{projectTasks.length} tasks</span>
        </div>
      </div>

      {/* Add Task Button + View Tabs */}
      <div className="flex items-center justify-between mb-6 border-b border-[hsl(220,12%,20%)] pb-3">
        <div className="flex items-center gap-6">
          {["list", "board"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`text-sm font-medium pb-3 -mb-3 capitalize transition-colors ${
                view === v
                  ? "text-[hsl(210,80%,56%)] border-b-2 border-[hsl(210,80%,56%)]"
                  : "text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="flex items-center gap-2 px-4 py-2 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg text-sm font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Quick Add Task Form */}
      {showAddTask && (
        <form onSubmit={handleQuickAddTask} className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(210,80%,56%,0.3)] p-5 mb-6 animate-fade-in">
          <h3 className="text-sm font-semibold text-[hsl(210,20%,92%)] mb-4">Quick Add Task</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Task name..."
              className="form-input"
              autoFocus
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-[hsl(215,15%,55%)] mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="form-input text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[hsl(215,15%,55%)] mb-1">Priority</label>
                <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)} className="form-input text-sm">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[hsl(215,15%,55%)] mb-1">Section</label>
                <select value={newTaskSection} onChange={(e) => setNewTaskSection(e.target.value)} className="form-input text-sm">
                  <option value="To do">To do</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg text-sm font-medium transition-colors"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="px-3 py-2.5 bg-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,22%)] text-[hsl(210,20%,85%)] rounded-lg text-sm border border-[hsl(220,12%,22%)] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* View Content */}
      <ProjectViewContent view={view} tasks={projectTasks} sections={sections} updateTask={updateTask} deleteTask={deleteTask} projectColor={currentProject.color} />

      {projectTasks.length === 0 && !showAddTask && (
        <div className="text-center py-16 text-[hsl(215,15%,45%)]">
          <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(215,15%,30%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          <p className="text-lg mb-2">No tasks yet</p>
          <p className="text-sm mb-4">Add your first task to this project.</p>
          <button
            onClick={() => setShowAddTask(true)}
            className="px-5 py-2 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg text-sm font-medium transition-colors"
          >
            Add first task
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectViewContent({ view, tasks, sections, updateTask, deleteTask, projectColor }) {
  if (view === "board") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sections.map((section) => {
          const sectionTasks = tasks.filter((t) => t.section === section);
          const colors = { "To do": "hsl(210,80%,56%)", Doing: "hsl(38,92%,50%)", Done: "hsl(142,72%,42%)" };
          return (
            <div key={section} className="bg-[hsl(220,15%,12%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); updateTask(e.dataTransfer.getData("taskId"), { section }); }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[hsl(220,12%,20%)]">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[section] }} />
                <span className="text-sm font-semibold text-[hsl(210,20%,90%)]">{section}</span>
                <span className="text-xs text-[hsl(215,15%,45%)] ml-auto bg-[hsl(220,15%,18%)] px-2 py-0.5 rounded-full">{sectionTasks.length}</span>
              </div>
              <div className="p-3 space-y-2 min-h-[150px]">
                {sectionTasks.map((task) => (
                  <div key={task.id} draggable onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                    className="bg-[hsl(220,15%,16%)] rounded-lg p-3 border border-[hsl(220,12%,22%)] cursor-grab hover:border-[hsl(210,80%,56%,0.3)] transition-colors group relative">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-[hsl(0,72%,51%,0.12)] transition-all"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(0,72%,60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <p className="text-sm text-[hsl(210,20%,88%)] mb-2 pr-6">{task.name}</p>
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={task.priority} />
                      <StatusBadge status={task.status} />
                    </div>
                    {task.dueDate && (
                      <p className="text-[10px] text-[hsl(215,15%,45%)] mt-2">
                        {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default list view
  return (
    <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-5 py-2.5 bg-[hsl(220,15%,11%)] border-b border-[hsl(220,12%,20%)] text-xs text-[hsl(215,15%,50%)] font-medium uppercase tracking-wide">
        <div className="col-span-5">Task name</div>
        <div className="col-span-2">Due date</div>
        <div className="col-span-2">Priority</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1">Actions</div>
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
              <span className="text-xs text-[hsl(215,15%,45%)]">({sectionTasks.length})</span>
            </div>
            {sectionTasks.map((task) => (
              <div key={task.id} className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-[hsl(220,12%,20%)] hover:bg-[hsl(220,15%,16%)] transition-colors items-center">
                <div className="col-span-5 flex items-center gap-3">
                  <button
                    onClick={() => updateTask(task.id, { section: task.section === "Done" ? "To do" : "Done" })}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      task.section === "Done" ? "bg-[hsl(142,72%,42%)] border-[hsl(142,72%,42%)]" : "border-[hsl(220,12%,30%)] hover:border-[hsl(210,80%,56%)]"
                    }`}
                  >
                    {task.section === "Done" && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                  <span className={`text-sm ${task.section === "Done" ? "text-[hsl(215,15%,45%)] line-through" : "text-[hsl(210,20%,88%)]"}`}>
                    {task.name}
                  </span>
                </div>
                <div className="col-span-2 text-xs text-[hsl(215,15%,50%)]">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "-"}
                </div>
                <div className="col-span-2"><PriorityBadge priority={task.priority} /></div>
                <div className="col-span-2"><StatusBadge status={task.status} /></div>
                <div className="col-span-1">
                  <button onClick={() => deleteTask(task.id)} className="p-1.5 hover:bg-[hsl(0,72%,51%,0.12)] rounded-lg transition-colors" title="Delete task">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(0,72%,60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5-3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            {sectionTasks.length === 0 && (
              <div className="px-5 py-4 text-sm text-[hsl(215,15%,35%)] border-b border-[hsl(220,12%,20%)]">No tasks</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
