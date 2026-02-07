"use client";

import { useApp } from "@/lib/app-context";

export default function AboutPage() {
  const { setCurrentPage, user } = useApp();

  return (
    <div className={user ? "animate-fade-in" : "min-h-screen bg-[hsl(220,15%,8%)]"}>
      {/* Header for unauthenticated */}
      {!user && (
        <header className="flex items-center justify-between px-8 py-5 border-b border-[hsl(220,12%,15%)]">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage("landing")}>
            <div className="w-9 h-9 rounded-lg bg-[hsl(210,80%,56%)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 17l10-10M12 7l10 10M2 7l10 10M12 17l10-10" />
              </svg>
            </div>
            <span className="font-bold text-[hsl(210,20%,95%)] text-xl">ProjectFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentPage("login")} className="px-4 py-2 text-sm text-[hsl(210,20%,85%)] hover:text-[hsl(210,20%,95%)] transition-colors">Log in</button>
            <button onClick={() => setCurrentPage("signup")} className="px-5 py-2 text-sm bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-medium transition-colors">Get Started Free</button>
          </div>
        </header>
      )}

      <div className={user ? "" : "max-w-4xl mx-auto px-8 py-16"}>
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[hsl(210,20%,95%)] mb-4 text-balance">
            About ProjectFlow
          </h1>
          <p className="text-lg text-[hsl(215,15%,55%)] max-w-2xl mx-auto leading-relaxed">
            We believe that great teams deserve great tools. ProjectFlow was built to simplify
            project management so teams can focus on what matters most - delivering excellent work.
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-8">
            <div className="w-12 h-12 rounded-lg bg-[hsl(210,80%,56%,0.12)] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(210,80%,56%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[hsl(210,20%,92%)] mb-3">Our Mission</h2>
            <p className="text-[hsl(215,15%,55%)] leading-relaxed">
              To empower every team to organize, track, and manage their work efficiently.
              We strive to create tools that are powerful yet intuitive, helping teams of all sizes
              deliver their best work on time, every time.
            </p>
          </div>
          <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-8">
            <div className="w-12 h-12 rounded-lg bg-[hsl(142,72%,42%,0.12)] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(142,72%,42%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[hsl(210,20%,92%)] mb-3">Our Vision</h2>
            <p className="text-[hsl(215,15%,55%)] leading-relaxed">
              A world where project management is seamless and collaborative. Where every team member
              has visibility into progress, blockers are identified early, and projects are
              delivered with confidence.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[hsl(210,20%,95%)] text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Simplicity", desc: "We keep things simple. Complex problems deserve elegant, easy-to-use solutions.", color: "hsl(210,80%,56%)" },
              { title: "Transparency", desc: "We believe in open communication and clear visibility across all levels of work.", color: "hsl(142,72%,42%)" },
              { title: "Collaboration", desc: "Great work happens when people work together. We build tools that bring teams closer.", color: "hsl(38,92%,50%)" },
            ].map((v, i) => (
              <div key={i} className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-6 text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-4" style={{ backgroundColor: v.color }} />
                <h3 className="text-lg font-semibold text-[hsl(210,20%,92%)] mb-2">{v.title}</h3>
                <p className="text-sm text-[hsl(215,15%,55%)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Course & Professor */}
        <div className="mb-16">
          <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[hsl(210,80%,56%,0.12)] flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(210,80%,56%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest text-[hsl(210,80%,56%)] font-semibold mb-2">Academic Project</p>
            <h2 className="text-2xl font-bold text-[hsl(210,20%,95%)] mb-1">Web Development</h2>
            <p className="text-[hsl(215,15%,55%)] mb-4">Course Project</p>
            <div className="inline-flex items-center gap-2 bg-[hsl(220,15%,18%)] rounded-lg px-5 py-2.5 border border-[hsl(220,12%,24%)]">
              <span className="text-sm text-[hsl(215,15%,55%)]">Under the guidance of</span>
              <span className="text-sm font-semibold text-[hsl(210,20%,92%)]">Dr. Meenakshi S P</span>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[hsl(210,20%,95%)] text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Lakshya S", regNo: "24BAI0154", color: "hsl(210,80%,56%)" },
              { name: "Madhumitha", regNo: "24BDS0421", color: "hsl(142,72%,42%)" },
              { name: "Ashwini", regNo: "24BAI", color: "hsl(38,92%,50%)" },
              { name: "Pradeepa", regNo: "24BAI0313", color: "hsl(0,72%,58%)" },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-[hsl(0,0%,100%)]" style={{ backgroundColor: m.color }}>
                  {m.name.charAt(0)}
                </div>
                <h3 className="text-sm font-semibold text-[hsl(210,20%,92%)]">{m.name}</h3>
                <p className="text-xs text-[hsl(215,15%,50%)] font-mono">{m.regNo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[hsl(210,20%,95%)] text-center mb-8">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "HTML5", desc: "Semantic markup and page structure", icon: "H", color: "hsl(14,100%,53%)" },
              { name: "CSS3", desc: "Styling, animations, and responsive design", icon: "C", color: "hsl(210,80%,56%)" },
              { name: "JavaScript", desc: "Client-side logic and interactivity", icon: "JS", color: "hsl(50,100%,50%)" },
              { name: "React", desc: "Component-based UI rendering", icon: "R", color: "hsl(193,95%,68%)" },
              { name: "Next.js", desc: "Server-side rendering and routing", icon: "N", color: "hsl(0,0%,80%)" },
              { name: "Tailwind CSS", desc: "Utility-first CSS framework", icon: "T", color: "hsl(198,93%,60%)" },
            ].map((tech, i) => (
              <div key={i} className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-[hsl(0,0%,100%)]" style={{ backgroundColor: tech.color }}>
                  {tech.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[hsl(210,20%,92%)]">{tech.name}</h3>
                  <p className="text-xs text-[hsl(215,15%,50%)] leading-relaxed mt-0.5">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "10K+", label: "Teams" },
              { value: "50K+", label: "Users" },
              { value: "1M+", label: "Tasks Completed" },
              { value: "99.9%", label: "Uptime" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-[hsl(210,80%,56%)]">{s.value}</p>
                <p className="text-sm text-[hsl(215,15%,55%)] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {!user && (
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-[hsl(210,20%,95%)] mb-4">Ready to get started?</h2>
            <p className="text-[hsl(215,15%,55%)] mb-6">Join thousands of teams already using ProjectFlow.</p>
            <button
              onClick={() => setCurrentPage("signup")}
              className="px-8 py-3 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-semibold transition-colors"
            >
              Start for Free
            </button>
          </div>
        )}
      </div>

      {/* Footer for unauthenticated */}
      {!user && (
        <footer className="border-t border-[hsl(220,12%,15%)] py-8 px-8 mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs text-[hsl(215,15%,40%)]">2026 ProjectFlow. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
