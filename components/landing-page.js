"use client";

import { useApp } from "@/lib/app-context";

export default function LandingPage() {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-screen bg-[hsl(220,15%,8%)]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-[hsl(220,12%,15%)]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[hsl(210,80%,56%)] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 17l10-10M12 7l10 10M2 7l10 10M12 17l10-10" />
            </svg>
          </div>
          <span className="font-bold text-[hsl(210,20%,95%)] text-xl tracking-tight">ProjectFlow</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => setCurrentPage("about")} className="text-sm text-[hsl(215,15%,60%)] hover:text-[hsl(210,20%,90%)] transition-colors">About</button>
          <a href="#features" className="text-sm text-[hsl(215,15%,60%)] hover:text-[hsl(210,20%,90%)] transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-[hsl(215,15%,60%)] hover:text-[hsl(210,20%,90%)] transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage("login")}
            className="px-4 py-2 text-sm text-[hsl(210,20%,85%)] hover:text-[hsl(210,20%,95%)] transition-colors"
          >
            Log in
          </button>
          <button
            onClick={() => setCurrentPage("signup")}
            className="px-5 py-2 text-sm bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-medium transition-colors"
          >
            Get Started Free
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-block px-4 py-1.5 bg-[hsl(210,80%,56%,0.12)] text-[hsl(210,80%,65%)] text-xs font-medium rounded-full mb-6 border border-[hsl(210,80%,56%,0.2)]">
          Trusted by 10,000+ teams worldwide
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-[hsl(210,20%,95%)] leading-tight mb-6 text-balance">
          Manage projects with
          <span className="text-[hsl(210,80%,56%)]"> clarity and speed</span>
        </h1>
        <p className="text-lg text-[hsl(215,15%,55%)] max-w-2xl mx-auto mb-10 leading-relaxed">
          ProjectFlow helps teams organize work, track progress, and deliver projects on time.
          From simple tasks to complex workflows, we have you covered.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage("signup")}
            className="px-8 py-3 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-semibold text-base transition-colors"
          >
            Start for Free
          </button>
          <button
            onClick={() => setCurrentPage("about")}
            className="px-8 py-3 bg-[hsl(220,15%,16%)] hover:bg-[hsl(220,15%,20%)] text-[hsl(210,20%,85%)] rounded-lg font-medium text-base border border-[hsl(220,12%,22%)] transition-colors"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <div className="rounded-xl border border-[hsl(220,12%,18%)] bg-[hsl(220,15%,12%)] overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(220,15%,10%)] border-b border-[hsl(220,12%,18%)]">
            <div className="w-3 h-3 rounded-full bg-[hsl(0,72%,51%)]" />
            <div className="w-3 h-3 rounded-full bg-[hsl(38,92%,50%)]" />
            <div className="w-3 h-3 rounded-full bg-[hsl(142,72%,42%)]" />
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Todo Column */}
            <div>
              <h3 className="text-sm font-semibold text-[hsl(210,20%,90%)] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(210,80%,56%)]" />To Do
              </h3>
              {["Design homepage mockup", "Write API documentation", "Database schema design"].map((t, i) => (
                <div key={i} className="bg-[hsl(220,15%,16%)] rounded-lg p-3 mb-2 border border-[hsl(220,12%,20%)]">
                  <p className="text-sm text-[hsl(210,20%,85%)]">{t}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${i === 0 ? "bg-[hsl(0,72%,51%,0.15)] text-[hsl(0,72%,65%)]" : i === 1 ? "bg-[hsl(38,92%,50%,0.15)] text-[hsl(38,92%,60%)]" : "bg-[hsl(142,72%,42%,0.15)] text-[hsl(142,72%,55%)]"}`}>
                      {["High", "Medium", "Low"][i]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Doing Column */}
            <div>
              <h3 className="text-sm font-semibold text-[hsl(210,20%,90%)] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(38,92%,50%)]" />In Progress
              </h3>
              {["Set up CI/CD pipeline", "User authentication module"].map((t, i) => (
                <div key={i} className="bg-[hsl(220,15%,16%)] rounded-lg p-3 mb-2 border border-[hsl(220,12%,20%)]">
                  <p className="text-sm text-[hsl(210,20%,85%)]">{t}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(38,92%,50%,0.15)] text-[hsl(38,92%,60%)]">
                      Medium
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Done Column */}
            <div>
              <h3 className="text-sm font-semibold text-[hsl(210,20%,90%)] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(142,72%,42%)]" />Done
              </h3>
              <div className="bg-[hsl(220,15%,16%)] rounded-lg p-3 mb-2 border border-[hsl(220,12%,20%)]">
                <p className="text-sm text-[hsl(210,20%,85%)]">Social media content plan</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(142,72%,42%,0.15)] text-[hsl(142,72%,55%)]">
                    Low
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-8 pb-24">
        <h2 className="text-3xl font-bold text-[hsl(210,20%,95%)] text-center mb-4 text-balance">Everything you need to ship faster</h2>
        <p className="text-center text-[hsl(215,15%,55%)] mb-12 max-w-lg mx-auto">Powerful tools that grow with your team, from task tracking to strategic planning.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "List View", desc: "Track all tasks in a structured table with priorities, due dates, and statuses.", icon: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
            { title: "Board View", desc: "Drag and drop tasks across columns like Todo, Doing, and Done.", icon: "M9 17H5a2 2 0 01-2-2V5a2 2 0 012-2h4m6 14h4a2 2 0 002-2V5a2 2 0 00-2-2h-4m-6 14v-4m0 0V7m0 6h6" },
            { title: "Timeline View", desc: "Visualize work with deadlines and dependencies on a Gantt-like chart.", icon: "M17 3v18M7 3v18M3 7h4M3 12h4M3 17h4M13 7h4M13 12h4M13 17h4" },
            { title: "Calendar View", desc: "See all tasks and deadlines on an interactive calendar.", icon: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" },
            { title: "Goals & Strategy", desc: "Set team goals, track progress, and align everyone on key objectives.", icon: "M12 2a10 10 0 110 20 10 10 0 010-20zm0 4a6 6 0 100 12 6 6 0 000-12zm0 4a2 2 0 110 4 2 2 0 010-4z" },
            { title: "Team Collaboration", desc: "Invite teammates, assign tasks, and track who is working on what.", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
          ].map((f, i) => (
            <div key={i} className="bg-[hsl(220,15%,12%)] rounded-xl border border-[hsl(220,12%,18%)] p-6 hover:border-[hsl(210,80%,56%,0.3)] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[hsl(210,80%,56%,0.12)] flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(210,80%,56%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-[hsl(210,20%,92%)] mb-2">{f.title}</h3>
              <p className="text-sm text-[hsl(215,15%,55%)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-8 pb-24">
        <h2 className="text-3xl font-bold text-[hsl(210,20%,95%)] text-center mb-12 text-balance">Simple, transparent pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Free", price: "$0", desc: "For individuals", features: ["Up to 5 projects", "Basic task management", "List & Board views"] },
            { name: "Pro", price: "$12", desc: "Per user / month", features: ["Unlimited projects", "All views", "Goals & reporting", "Priority support"], popular: true },
            { name: "Enterprise", price: "Custom", desc: "For large teams", features: ["Everything in Pro", "SSO & SAML", "Custom integrations", "Dedicated support"] },
          ].map((p, i) => (
            <div key={i} className={`rounded-xl border p-6 ${p.popular ? "border-[hsl(210,80%,56%)] bg-[hsl(210,80%,56%,0.06)]" : "border-[hsl(220,12%,18%)] bg-[hsl(220,15%,12%)]"}`}>
              {p.popular && (
                <span className="inline-block text-xs font-medium text-[hsl(210,80%,56%)] bg-[hsl(210,80%,56%,0.12)] px-3 py-1 rounded-full mb-4">Most Popular</span>
              )}
              <h3 className="text-xl font-bold text-[hsl(210,20%,95%)]">{p.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-bold text-[hsl(210,20%,95%)]">{p.price}</span>
              </div>
              <p className="text-sm text-[hsl(215,15%,55%)] mb-6">{p.desc}</p>
              <ul className="space-y-3 mb-6">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-[hsl(210,20%,80%)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(142,72%,42%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setCurrentPage("signup")}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  p.popular
                    ? "bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)]"
                    : "bg-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,22%)] text-[hsl(210,20%,85%)] border border-[hsl(220,12%,22%)]"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(220,12%,15%)] py-12 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[hsl(210,80%,56%)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17l10-10M12 7l10 10M2 7l10 10M12 17l10-10" />
                </svg>
              </div>
              <span className="font-bold text-[hsl(210,20%,90%)]">ProjectFlow</span>
            </div>
            <p className="text-sm text-[hsl(215,15%,50%)] max-w-xs">Modern project management for teams that ship fast.</p>
          </div>
          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-semibold text-[hsl(210,20%,85%)] mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-[hsl(215,15%,50%)] hover:text-[hsl(210,20%,85%)] transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-sm text-[hsl(215,15%,50%)] hover:text-[hsl(210,20%,85%)] transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[hsl(210,20%,85%)] mb-3">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentPage("about")} className="text-sm text-[hsl(215,15%,50%)] hover:text-[hsl(210,20%,85%)] transition-colors">About</button></li>
                <li><button onClick={() => setCurrentPage("login")} className="text-sm text-[hsl(215,15%,50%)] hover:text-[hsl(210,20%,85%)] transition-colors">Log In</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[hsl(220,12%,15%)]">
          <p className="text-xs text-[hsl(215,15%,40%)]">2026 ProjectFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
