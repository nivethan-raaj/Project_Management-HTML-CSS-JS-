"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";

const STEPS = [
  { key: "role", title: "Tell us about your work", subtitle: "This will help us tailor ProjectFlow for you. We may also reach out to help you find the right products for your team." },
  { key: "tools", title: "What tools do you use?", subtitle: "ProjectFlow connects to tools your team uses every day. Understanding your tools will help us tailor the right features for your team." },
  { key: "teamSize", title: "How big is your team?", subtitle: "This helps us recommend the best setup for your team size." },
  { key: "projectSetup", title: "What do you want to manage first?", subtitle: "Pick what you want to start with. You can always add more later." },
];

const ROLES = [
  "Student",
  "Freelancer",
  "Team Lead",
  "Project Manager",
  "Engineering Manager",
  "Product Manager",
  "Designer",
  "Executive",
  "Other",
];

const WORK_FUNCTIONS = [
  "Engineering / IT",
  "Design / Creative",
  "Marketing",
  "Sales",
  "Operations",
  "Human Resources",
  "Finance",
  "Education",
  "Research",
  "Other",
];

const USE_CASES = [
  "Project management",
  "Task tracking",
  "Team collaboration",
  "Product roadmaps",
  "Sprint planning",
  "Personal productivity",
  "Client work",
  "Event planning",
  "Other",
];

const TOOLS = [
  { name: "Gmail", icon: "M" },
  { name: "Google Drive", icon: "G" },
  { name: "Microsoft OneDrive", icon: "O" },
  { name: "Microsoft Outlook", icon: "O" },
  { name: "Microsoft Teams", icon: "T" },
  { name: "Slack", icon: "S" },
  { name: "Zoom", icon: "Z" },
  { name: "Dropbox", icon: "D" },
  { name: "GitHub", icon: "G" },
  { name: "Figma", icon: "F" },
  { name: "Canva", icon: "C" },
  { name: "Jira Cloud", icon: "J" },
  { name: "Notion", icon: "N" },
  { name: "Salesforce", icon: "S" },
  { name: "Zendesk", icon: "Z" },
  { name: "HubSpot", icon: "H" },
  { name: "Zapier", icon: "Z" },
  { name: "Other", icon: "+" },
];

const TOOL_COLORS = {
  Gmail: "#EA4335",
  "Google Drive": "#4285F4",
  "Microsoft OneDrive": "#0078D4",
  "Microsoft Outlook": "#0078D4",
  "Microsoft Teams": "#6264A7",
  Slack: "#4A154B",
  Zoom: "#2D8CFF",
  Dropbox: "#0061FF",
  GitHub: "#888",
  Figma: "#F24E1E",
  Canva: "#00C4CC",
  "Jira Cloud": "#0052CC",
  Notion: "#888",
  Salesforce: "#00A1E0",
  Zendesk: "#03363D",
  HubSpot: "#FF7A59",
  Zapier: "#FF4A00",
  Other: "#666",
};

const TEAM_SIZES = [
  "Just me",
  "2-5 people",
  "6-15 people",
  "16-50 people",
  "51-200 people",
  "200+ people",
];

const MANAGE_OPTIONS = [
  { label: "Projects & tasks", desc: "Organize work into projects with tasks, deadlines, and assignments.", icon: "folder" },
  { label: "Personal to-dos", desc: "Keep track of your own tasks and daily priorities.", icon: "check" },
  { label: "Team workflow", desc: "Manage your team's processes, sprints, and collaborations.", icon: "users" },
  { label: "Client deliverables", desc: "Track deliverables, timelines, and feedback for client work.", icon: "briefcase" },
  { label: "Event planning", desc: "Coordinate events, deadlines, and responsibilities.", icon: "calendar" },
  { label: "Something else", desc: "Tell us what you need and we'll help set it up.", icon: "star" },
];

export default function OnboardingPage() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    role: "",
    workFunction: "",
    useCase: "",
    tools: [],
    teamSize: "",
    manageFirst: "",
  });

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const canContinue = () => {
    switch (step) {
      case 0: return data.role && data.workFunction && data.useCase;
      case 1: return true;
      case 2: return data.teamSize;
      case 3: return data.manageFirst;
      default: return true;
    }
  };

  const handleContinue = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding(data);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleTool = (tool) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.includes(tool) ? prev.tools.filter((t) => t !== tool) : [...prev.tools, tool],
    }));
  };

  return (
    <div className="min-h-screen bg-[hsl(220,15%,8%)] flex">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto p-8 lg:p-12">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-[hsl(210,80%,56%)] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 17l10-10M12 7l10 10M2 7l10 10M12 17l10-10" />
            </svg>
          </div>
          <span className="font-bold text-[hsl(210,20%,95%)] text-xl">ProjectFlow</span>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-10">
          {step > 0 && (
            <button onClick={handleBack} className="text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
          )}
          <div className="flex-1 h-2 bg-[hsl(220,15%,16%)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[hsl(142,72%,42%)] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="animate-fade-in" key={step}>
          <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)] mb-2">{currentStep.title}</h1>
          <p className="text-[hsl(215,15%,55%)] mb-8 leading-relaxed">{currentStep.subtitle}</p>

          {/* Step 0: Role / Function / Use Case */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-2">{"What's your role?"}</label>
                <select
                  value={data.role}
                  onChange={(e) => setData((p) => ({ ...p, role: e.target.value }))}
                  className="form-input"
                >
                  <option value="">Select your role...</option>
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-2">Which function best describes your work?</label>
                <select
                  value={data.workFunction}
                  onChange={(e) => setData((p) => ({ ...p, workFunction: e.target.value }))}
                  className="form-input"
                >
                  <option value="">Select a function...</option>
                  {WORK_FUNCTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-2">What do you want to use ProjectFlow for?</label>
                <select
                  value={data.useCase}
                  onChange={(e) => setData((p) => ({ ...p, useCase: e.target.value }))}
                  className="form-input"
                >
                  <option value="">Select a use case...</option>
                  {USE_CASES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Step 1: Tools */}
          {step === 1 && (
            <div className="flex flex-wrap gap-3">
              {TOOLS.map((tool) => {
                const selected = data.tools.includes(tool.name);
                return (
                  <button
                    key={tool.name}
                    type="button"
                    onClick={() => toggleTool(tool.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                      selected
                        ? "bg-[hsl(210,80%,56%,0.12)] border-[hsl(210,80%,56%,0.4)] text-[hsl(210,80%,65%)]"
                        : "bg-[hsl(220,15%,14%)] border-[hsl(220,12%,22%)] text-[hsl(210,20%,80%)] hover:border-[hsl(220,12%,30%)]"
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold text-[hsl(0,0%,100%)]"
                      style={{ backgroundColor: TOOL_COLORS[tool.name] || "#666" }}
                    >
                      {tool.icon}
                    </span>
                    {tool.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2: Team Size */}
          {step === 2 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {TEAM_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setData((p) => ({ ...p, teamSize: size }))}
                  className={`p-4 rounded-xl border text-sm font-medium text-center transition-all ${
                    data.teamSize === size
                      ? "bg-[hsl(210,80%,56%,0.12)] border-[hsl(210,80%,56%)] text-[hsl(210,80%,65%)]"
                      : "bg-[hsl(220,15%,14%)] border-[hsl(220,12%,22%)] text-[hsl(210,20%,80%)] hover:border-[hsl(220,12%,30%)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Step 3: What to manage first */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MANAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setData((p) => ({ ...p, manageFirst: opt.label }))}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                    data.manageFirst === opt.label
                      ? "bg-[hsl(210,80%,56%,0.12)] border-[hsl(210,80%,56%)] "
                      : "bg-[hsl(220,15%,14%)] border-[hsl(220,12%,22%)] hover:border-[hsl(220,12%,30%)]"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${data.manageFirst === opt.label ? "bg-[hsl(210,80%,56%,0.2)]" : "bg-[hsl(220,15%,20%)]"}`}>
                    <ManageIcon type={opt.icon} active={data.manageFirst === opt.label} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium mb-0.5 ${data.manageFirst === opt.label ? "text-[hsl(210,80%,65%)]" : "text-[hsl(210,20%,88%)]"}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-[hsl(215,15%,50%)] leading-relaxed">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="mt-10">
          <button
            onClick={handleContinue}
            disabled={!canContinue()}
            className={`px-8 py-3 rounded-lg font-semibold text-sm transition-colors ${
              canContinue()
                ? "bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)]"
                : "bg-[hsl(220,15%,20%)] text-[hsl(215,15%,40%)] cursor-not-allowed"
            }`}
          >
            {step === STEPS.length - 1 ? "Take me to my workspace" : "Continue"}
          </button>
          {step === 1 && (
            <button
              onClick={handleContinue}
              className="ml-4 px-6 py-3 text-sm text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)] transition-colors"
            >
              Skip
            </button>
          )}
        </div>
      </div>

      {/* Right Panel - Decorative (hidden on small screens) */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[hsl(220,15%,10%)] border-l border-[hsl(220,12%,15%)] max-w-lg">
        <div className="text-center px-12">
          <OnboardingIllustration step={step} />
          <p className="text-sm text-[hsl(215,15%,50%)] mt-6 leading-relaxed">
            {step === 0 && "We use this info to personalize your experience and help you get started faster."}
            {step === 1 && "Connect your favorite tools to bring all your work into one place."}
            {step === 2 && "We'll optimize the workspace based on your team size."}
            {step === 3 && "Start with what matters most. You can always expand later."}
          </p>
        </div>
      </div>
    </div>
  );
}

function OnboardingIllustration({ step }) {
  const colors = [
    "hsl(210,80%,56%)",
    "hsl(142,72%,42%)",
    "hsl(38,92%,50%)",
    "hsl(0,72%,60%)",
  ];
  return (
    <div className="w-40 h-40 rounded-full bg-[hsl(210,80%,56%,0.06)] flex items-center justify-center mx-auto border border-[hsl(210,80%,56%,0.12)]">
      <div className="w-28 h-28 rounded-full bg-[hsl(210,80%,56%,0.08)] flex items-center justify-center border border-[hsl(210,80%,56%,0.1)]">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={colors[step] || colors[0]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {step === 0 && <><circle cx="12" cy="7" r="4" /><path d="M5.5 21a7.5 7.5 0 0113 0" /></>}
          {step === 1 && <><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>}
          {step === 2 && <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>}
          {step === 3 && <><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></>}
        </svg>
      </div>
    </div>
  );
}

function ManageIcon({ type, active }) {
  const color = active ? "hsl(210,80%,65%)" : "hsl(215,15%,55%)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {type === "folder" && <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />}
      {type === "check" && <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></>}
      {type === "users" && <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>}
      {type === "briefcase" && <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></>}
      {type === "calendar" && <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>}
      {type === "star" && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />}
    </svg>
  );
}
