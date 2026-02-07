"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";

/* ADD TASK FORM */
export function AddTaskPage() {
  const { addTask, projects, setCurrentPage } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectId: projects[0]?.id || "",
    assignee: "You",
    dueDate: "",
    priority: "Medium",
    status: "On track",
    section: "To do",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dueDate) return;
    addTask(formData);
    setSuccess(true);
    setTimeout(() => {
      setCurrentPage("my-tasks");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button
        onClick={() => setCurrentPage("my-tasks")}
        className="flex items-center gap-2 text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)] text-sm mb-6 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to tasks
      </button>

      <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)] mb-6">Create New Task</h1>

      {success && (
        <div className="bg-[hsl(142,72%,42%,0.12)] border border-[hsl(142,72%,42%,0.3)] text-[hsl(142,72%,55%)] text-sm px-4 py-3 rounded-lg mb-6 animate-fade-in">
          Task created successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6 space-y-5">
        <FormField label="Task Name" required>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter task name"
            className="form-input"
            required
          />
        </FormField>

        <FormField label="Description">
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe the task..."
            rows="3"
            className="form-input resize-none"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Project">
            <select value={formData.projectId} onChange={(e) => handleChange("projectId", e.target.value)} className="form-input">
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Assignee">
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => handleChange("assignee", e.target.value)}
              placeholder="Assignee name"
              className="form-input"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField label="Due Date" required>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="form-input"
              required
            />
          </FormField>

          <FormField label="Priority">
            <select value={formData.priority} onChange={(e) => handleChange("priority", e.target.value)} className="form-input">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </FormField>

          <FormField label="Status">
            <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)} className="form-input">
              <option value="On track">On track</option>
              <option value="At risk">At risk</option>
              <option value="Off track">Off track</option>
            </select>
          </FormField>
        </div>

        <FormField label="Section">
          <div className="flex gap-3">
            {["To do", "Doing", "Done"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleChange("section", s)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.section === s
                    ? "bg-[hsl(210,80%,56%)] text-[hsl(0,0%,100%)]"
                    : "bg-[hsl(220,15%,18%)] text-[hsl(215,15%,55%)] hover:bg-[hsl(220,15%,22%)] border border-[hsl(220,12%,22%)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-semibold text-sm transition-colors"
          >
            Create Task
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("my-tasks")}
            className="px-6 py-2.5 bg-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,22%)] text-[hsl(210,20%,85%)] rounded-lg font-medium text-sm border border-[hsl(220,12%,22%)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ADD PROJECT FORM */
export function AddProjectPage() {
  const { addProject, setCurrentPage } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#4573d2",
    members: ["You"],
    status: "On track",
    progress: 0,
  });
  const [memberInput, setMemberInput] = useState("");
  const [success, setSuccess] = useState(false);

  const colors = ["#4573d2", "#aa62e3", "#e8842c", "#4ecbc4", "#e8444a", "#7cca62"];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addMember = () => {
    if (memberInput.trim() && !formData.members.includes(memberInput.trim())) {
      setFormData((prev) => ({ ...prev, members: [...prev.members, memberInput.trim()] }));
      setMemberInput("");
    }
  };

  const removeMember = (m) => {
    if (m === "You") return;
    setFormData((prev) => ({ ...prev, members: prev.members.filter((x) => x !== m) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addProject(formData);
    setSuccess(true);
    setTimeout(() => setCurrentPage("projects"), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button
        onClick={() => setCurrentPage("projects")}
        className="flex items-center gap-2 text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)] text-sm mb-6 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to projects
      </button>

      <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)] mb-6">Create New Project</h1>

      {success && (
        <div className="bg-[hsl(142,72%,42%,0.12)] border border-[hsl(142,72%,42%,0.3)] text-[hsl(142,72%,55%)] text-sm px-4 py-3 rounded-lg mb-6 animate-fade-in">
          Project created successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6 space-y-5">
        <FormField label="Project Name" required>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter project name"
            className="form-input"
            required
          />
        </FormField>

        <FormField label="Description">
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe the project..."
            rows="3"
            className="form-input resize-none"
          />
        </FormField>

        <FormField label="Project Color">
          <div className="flex gap-3">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleChange("color", c)}
                className={`w-8 h-8 rounded-full transition-all ${
                  formData.color === c ? "ring-2 ring-offset-2 ring-offset-[hsl(220,15%,14%)]" : ""
                }`}
                style={{ backgroundColor: c, ringColor: c }}
              />
            ))}
          </div>
        </FormField>

        <FormField label="Team Members">
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.members.map((m) => (
              <span key={m} className="flex items-center gap-1 px-3 py-1 bg-[hsl(220,15%,18%)] rounded-full text-sm text-[hsl(210,20%,85%)] border border-[hsl(220,12%,22%)]">
                {m}
                {m !== "You" && (
                  <button type="button" onClick={() => removeMember(m)} className="text-[hsl(215,15%,45%)] hover:text-[hsl(0,72%,60%)] ml-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                )}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addMember())}
              placeholder="Add team member name"
              className="form-input flex-1"
            />
            <button type="button" onClick={addMember} className="px-4 py-2 bg-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,22%)] text-[hsl(210,20%,85%)] rounded-lg text-sm border border-[hsl(220,12%,22%)] transition-colors">
              Add
            </button>
          </div>
        </FormField>

        <FormField label="Status">
          <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)} className="form-input">
            <option value="On track">On track</option>
            <option value="At risk">At risk</option>
            <option value="Off track">Off track</option>
          </select>
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-semibold text-sm transition-colors">
            Create Project
          </button>
          <button type="button" onClick={() => setCurrentPage("projects")} className="px-6 py-2.5 bg-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,22%)] text-[hsl(210,20%,85%)] rounded-lg font-medium text-sm border border-[hsl(220,12%,22%)] transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ADD GOAL FORM */
export function AddGoalPage() {
  const { addGoal, setCurrentPage } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    status: "On track",
    progress: 0,
    timePeriod: "Q1 2026",
    team: "",
    owner: "You",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addGoal(formData);
    setSuccess(true);
    setTimeout(() => setCurrentPage("goals"), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button onClick={() => setCurrentPage("goals")} className="flex items-center gap-2 text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)] text-sm mb-6 transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to goals
      </button>

      <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)] mb-6">Create New Goal</h1>

      {success && (
        <div className="bg-[hsl(142,72%,42%,0.12)] border border-[hsl(142,72%,42%,0.3)] text-[hsl(142,72%,55%)] text-sm px-4 py-3 rounded-lg mb-6 animate-fade-in">
          Goal created successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6 space-y-5">
        <FormField label="Goal Name" required>
          <input type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Enter goal name" className="form-input" required />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Time Period">
            <select value={formData.timePeriod} onChange={(e) => handleChange("timePeriod", e.target.value)} className="form-input">
              <option value="Q1 2026">Q1 2026</option>
              <option value="Q2 2026">Q2 2026</option>
              <option value="Q3 2026">Q3 2026</option>
              <option value="Q4 2026">Q4 2026</option>
            </select>
          </FormField>

          <FormField label="Team">
            <input type="text" value={formData.team} onChange={(e) => handleChange("team", e.target.value)} placeholder="Team name" className="form-input" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Owner">
            <input type="text" value={formData.owner} onChange={(e) => handleChange("owner", e.target.value)} placeholder="Owner name" className="form-input" />
          </FormField>

          <FormField label="Status">
            <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)} className="form-input">
              <option value="On track">On track</option>
              <option value="At risk">At risk</option>
              <option value="Off track">Off track</option>
            </select>
          </FormField>
        </div>

        <FormField label={`Progress: ${formData.progress}%`}>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) => handleChange("progress", parseInt(e.target.value))}
            className="w-full accent-[hsl(210,80%,56%)]"
          />
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-semibold text-sm transition-colors">
            Create Goal
          </button>
          <button type="button" onClick={() => setCurrentPage("goals")} className="px-6 py-2.5 bg-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,22%)] text-[hsl(210,20%,85%)] rounded-lg font-medium text-sm border border-[hsl(220,12%,22%)] transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* Form Field Helper */
function FormField({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">
        {label}{required && <span className="text-[hsl(0,72%,60%)] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
