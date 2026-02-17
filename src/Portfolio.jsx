import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = ["home", "about", "skills", "projects", "experience", "contact"];

const projects = [
  {
    title: "NASA-KY Research",
    role: "Software Dev Team Leader",
    period: "Dec 2024 – May 2025",
    description:
      "Led an 8-member team through the full SDLC to design, build, and operate secure system prototypes in collaboration with NASA-KY. Integrated ML-based anomaly detection into embedded network systems.",
    tags: ["Leadership", "SDLC", "System Design", "ML"],
    highlight: true,
  },
  {
    title: "Encrypted Network Classification",
    role: "ML Engineer",
    period: "Oct 2025 – Dec 2025",
    description:
      "Built deep learning models to classify encrypted network traffic without decryption using flow-based statistical features. Developed Python data pipelines with NumPy and Pandas.",
    tags: ["PyTorch", "Scikit-learn", "Python", "Deep Learning"],
    highlight: false,
  },
  {
    title: "VibeSec",
    role: "Creator & Developer",
    period: "Jan 2026 – Present",
    description:
      "Building a security tool for software engineers to prevent secret leaks, with plugin support for popular IDEs.",
    tags: ["Security", "Developer Tools", "Python"],
    highlight: false,
  },
  {
    title: "Check-In",
    role: "Full-Stack Developer",
    period: "Jan 2025 – Present",
    description:
      "Mental health web app focused on early detection of suicidal ideation in children and youth. Integrating AI features via API and developing a custom ML model.",
    tags: ["React", "ML", "Web App", "Social Impact"],
    highlight: true,
  },
];

const experiences = [
  {
    title: "ACM President",
    org: "Murray State University",
    period: "Sep 2025 – Present",
    detail:
      "Leading technical initiatives, organizing workshops and hackathons for 100+ students. Previously served as Treasurer from 2023–2025.",
  },
  {
    title: "Cyber Team — Red & Blue",
    org: "Murray State University",
    period: "Sep 2024 – Present",
    detail:
      "Competing in national CCDC and CTF events. Building custom scripts for penetration testing and digital forensics.",
  },
  {
    title: "ICPC Competitive Programming",
    org: "Murray State University",
    period: "Sep 2024 – Present",
    detail:
      "Competed in 2 regional contests, placing 2nd in the first. Solving timed algorithmic challenges in Java and Python.",
  },
  {
    title: "IEEE Member",
    org: "Murray State University",
    period: "Oct 2025 – Present",
    detail:
      "Building and programming drones and robots for an upcoming hardware competition.",
  },
];

const skillCategories = [
  {
    label: "Languages",
    items: ["Python", "Java", "JavaScript", "HTML/CSS", "SQL"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["ReactJS", "PyTorch", "Scikit-learn", "NumPy", "Pandas"],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "Docker", "Linux", "Wireshark", "Kali Linux", "VS Code"],
  },
  {
    label: "Specializations",
    items: ["Machine Learning", "Artificial Intelligence", "Cybersecurity"],
  },
];

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Animated section wrapper ── */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Navigation ── */
function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        background: scrolled ? "rgba(10,10,12,0.82)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        height: 64,
      }}>
        <span
          onClick={() => go("home")}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 22, color: "#e0e0e0", cursor: "pointer",
            letterSpacing: "-0.02em",
          }}
        >
          EF<span style={{ color: "#5cffe5" }}>.</span>
        </span>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}
          className="nav-desktop"
        >
          {SECTIONS.filter(s => s !== "home").map((s) => (
            <span
              key={s}
              onClick={() => go(s)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
                color: active === s ? "#5cffe5" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "color 0.3s",
                fontWeight: 500,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none",
            color: "#e0e0e0", fontSize: 24, cursor: "pointer", padding: 4,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          background: "rgba(10,10,12,0.96)", padding: "16px 32px 24px",
          display: "flex", flexDirection: "column", gap: 18,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {SECTIONS.filter(s => s !== "home").map((s) => (
            <span
              key={s}
              onClick={() => go(s)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase",
                color: active === s ? "#5cffe5" : "rgba(255,255,255,0.55)",
                cursor: "pointer", fontWeight: 500,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={index * 0.1}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(92,255,229,0.06) 0%, rgba(20,20,24,0.95) 60%)"
            : "rgba(255,255,255,0.025)",
          border: `1px solid ${hovered ? "rgba(92,255,229,0.25)" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 16, padding: "32px 28px",
          transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {project.highlight && (
          <span style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(92,255,229,0.12)", color: "#5cffe5",
            fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
            padding: "4px 10px", borderRadius: 20,
            fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase",
          }}>
            Featured
          </span>
        )}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          color: "#5cffe5", letterSpacing: "0.1em", textTransform: "uppercase",
          marginBottom: 8, fontWeight: 500,
        }}>
          {project.role}
        </p>
        <h3 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 26, color: "#f0f0f0", marginBottom: 6, fontWeight: 400,
          letterSpacing: "-0.01em",
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 12,
          color: "rgba(255,255,255,0.35)", marginBottom: 16,
        }}>
          {project.period}
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14.5,
          color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 20,
        }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'DM Mono', monospace", fontSize: 11,
                color: "rgba(255,255,255,0.45)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "4px 12px", borderRadius: 20,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Main App ── */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* Track active section */
  useEffect(() => {
    const handler = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Mouse parallax for hero */
  const handleMouse = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      onMouseMove={handleMouse}
      style={{ background: "#0a0a0c", minHeight: "100vh", color: "#e0e0e0" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0c; overflow-x: hidden; }
        ::selection { background: rgba(92,255,229,0.25); color: #fff; }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .hero-title { font-size: 48px !important; }
          .hero-subtitle { font-size: 16px !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .exp-grid { grid-template-columns: 1fr !important; }
          .section-pad { padding: 80px 20px !important; }
          .hero-section { padding: 0 20px !important; }
          .stat-row { flex-direction: column; gap: 20px !important; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 36px !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes lineGrow {
          from { width: 0; }
          to { width: 64px; }
        }

        .accent-line {
          height: 1px;
          background: linear-gradient(90deg, #5cffe5, transparent);
          animation: lineGrow 1s cubic-bezier(.22,1,.36,1) forwards;
        }
      `}</style>

      <Nav active={activeSection} />

      {/* ─── HERO ─── */}
      <section
        id="home"
        className="hero-section"
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          position: "relative", overflow: "hidden",
          padding: "0 32px",
        }}
      >
        {/* Background orb */}
        <div style={{
          position: "absolute",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(92,255,229,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: `translate(calc(-50% + ${(mousePos.x - (typeof window !== 'undefined' ? window.innerWidth/2 : 0)) * 0.02}px), calc(-50% + ${(mousePos.y - (typeof window !== 'undefined' ? window.innerHeight/2 : 0)) * 0.02}px))`,
          transition: "transform 0.3s ease-out",
          pointerEvents: "none",
        }} />

        {/* Grid lines background */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }} />

        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: 13,
              color: "#5cffe5", letterSpacing: "0.2em", textTransform: "uppercase",
              marginBottom: 24,
            }}>
              <span style={{ animation: "pulse 2s ease-in-out infinite", display: "inline-block" }}>●</span>
              &nbsp; Software Engineer · ML · Cybersecurity
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h1
              className="hero-title"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 82, fontWeight: 400, letterSpacing: "-0.03em",
                lineHeight: 1.05, color: "#f5f5f5",
                marginBottom: 24,
              }}
            >
              Ezana<br />
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #5cffe5 0%, #42c6b0 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Fekadu
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p
              className="hero-subtitle"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                color: "rgba(255,255,255,0.45)", maxWidth: 500,
                margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300,
              }}
            >
              Computer Science student building at the intersection of
              machine learning, cybersecurity, and software engineering.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
                  background: "#5cffe5", color: "#0a0a0c",
                  border: "none", padding: "14px 32px", borderRadius: 50,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.target.style.boxShadow = "0 0 30px rgba(92,255,229,0.3)"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.boxShadow = "none"; e.target.style.transform = "translateY(0)"; }}
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
                  background: "transparent", color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "14px 32px", borderRadius: 50,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(92,255,229,0.4)"; e.target.style.color = "#5cffe5"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.color = "rgba(255,255,255,0.6)"; }}
              >
                Get In Touch
              </button>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "float 3s ease-in-out infinite",
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            Scroll
          </span>
          <div style={{
            width: 1, height: 32,
            background: "linear-gradient(to bottom, rgba(92,255,229,0.5), transparent)",
          }} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="section-pad" style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56 }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 12,
              color: "#5cffe5", letterSpacing: "0.15em",
            }}>01</span>
            <div className="accent-line" style={{ width: 64 }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
              color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>About</span>
          </div>
        </Reveal>

        <div className="about-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64,
        }}>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 42, fontWeight: 400, lineHeight: 1.2,
              letterSpacing: "-0.02em", color: "#f0f0f0",
            }}>
              Passionate about building technology that{" "}
              <span style={{ fontStyle: "italic", color: "#5cffe5" }}>matters</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15.5,
                color: "rgba(255,255,255,0.55)", lineHeight: 1.8,
                marginBottom: 24,
              }}>
                I'm a Computer Science student at Murray State University with a 3.54 GPA,
                expected to graduate in May 2026. My work spans machine learning, cybersecurity,
                and full-stack development — always driven by a desire to solve complex problems
                and create software with real-world impact.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15.5,
                color: "rgba(255,255,255,0.55)", lineHeight: 1.8,
                marginBottom: 32,
              }}>
                From leading a NASA-KY research team to competing in national cybersecurity
                events, I thrive in collaborative environments where innovation meets execution.
                Currently serving as ACM President, I'm focused on empowering the next generation
                of developers.
              </p>

              <div className="stat-row" style={{ display: "flex", gap: 40 }}>
                {[
                  { num: "3.54", label: "GPA" },
                  { num: "8+", label: "Team Led" },
                  { num: "100+", label: "Students Impacted" },
                ].map((s, i) => (
                  <div key={i}>
                    <span style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: 36, color: "#5cffe5", display: "block",
                    }}>{s.num}</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                      color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="section-pad" style={{
        padding: "120px 32px",
        background: "linear-gradient(180deg, transparent 0%, rgba(92,255,229,0.015) 50%, transparent 100%)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56 }}>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: 12,
                color: "#5cffe5", letterSpacing: "0.15em",
              }}>02</span>
              <div className="accent-line" style={{ width: 64 }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>Skills & Tools</span>
            </div>
          </Reveal>

          <div className="skills-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
          }}>
            {skillCategories.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 0.1}>
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 16, padding: "28px 24px",
                }}>
                  <h4 style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                    color: "#5cffe5", letterSpacing: "0.12em",
                    textTransform: "uppercase", marginBottom: 20, fontWeight: 500,
                  }}>
                    {cat.label}
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {cat.items.map((item) => (
                      <span key={item} style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14.5,
                        color: "rgba(255,255,255,0.6)",
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="section-pad" style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 12,
              color: "#5cffe5", letterSpacing: "0.15em",
            }}>03</span>
            <div className="accent-line" style={{ width: 64 }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
              color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>Projects</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 42, fontWeight: 400, letterSpacing: "-0.02em",
            color: "#f0f0f0", marginBottom: 48,
          }}>
            Selected <span style={{ fontStyle: "italic" }}>Work</span>
          </h2>
        </Reveal>

        <div className="projects-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ─── EXPERIENCE & LEADERSHIP ─── */}
      <section id="experience" className="section-pad" style={{
        padding: "120px 32px",
        background: "linear-gradient(180deg, transparent 0%, rgba(92,255,229,0.015) 50%, transparent 100%)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: 12,
                color: "#5cffe5", letterSpacing: "0.15em",
              }}>04</span>
              <div className="accent-line" style={{ width: 64 }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>Experience</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 42, fontWeight: 400, letterSpacing: "-0.02em",
              color: "#f0f0f0", marginBottom: 48,
            }}>
              Leadership & <span style={{ fontStyle: "italic" }}>Involvement</span>
            </h2>
          </Reveal>

          <div className="exp-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
          }}>
            {experiences.map((exp, i) => (
              <Reveal key={exp.title} delay={i * 0.1}>
                <div style={{
                  borderLeft: "2px solid rgba(92,255,229,0.2)",
                  paddingLeft: 24, paddingTop: 4, paddingBottom: 4,
                }}>
                  <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 11,
                    color: "rgba(255,255,255,0.3)", marginBottom: 6,
                  }}>
                    {exp.period}
                  </p>
                  <h4 style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 17,
                    color: "#f0f0f0", fontWeight: 500, marginBottom: 4,
                  }}>
                    {exp.title}
                  </h4>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    color: "#5cffe5", marginBottom: 12, fontWeight: 400,
                  }}>
                    {exp.org}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                    color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
                  }}>
                    {exp.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Education callout */}
          <Reveal delay={0.3}>
            <div style={{
              marginTop: 56, padding: "32px 36px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: 24,
            }}>
              <div>
                <h4 style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 17,
                  color: "#f0f0f0", fontWeight: 500, marginBottom: 4,
                }}>
                  Murray State University
                </h4>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                }}>
                  B.S. Computer Science · Dean's List 2023–2025
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 32, color: "#5cffe5",
                }}>3.54</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: "rgba(255,255,255,0.35)", display: "block",
                }}> / 4.0 GPA</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="section-pad" style={{ padding: "120px 32px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 12,
              color: "#5cffe5", letterSpacing: "0.15em",
            }}>05</span>
            <div className="accent-line" style={{ width: 64 }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
              color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 52, fontWeight: 400, letterSpacing: "-0.02em",
            color: "#f0f0f0", marginBottom: 20, lineHeight: 1.15,
          }}>
            Let's build something<br />
            <span style={{ fontStyle: "italic", color: "#5cffe5" }}>together</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
            color: "rgba(255,255,255,0.45)", marginBottom: 40,
            maxWidth: 500, lineHeight: 1.7,
          }}>
            I'm actively seeking an Entry-Level Position/ Summer 2026 Software Development Engineer Internship.
            Let's connect — I'd love to hear about what you're building.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "Email", value: "efekadu@murraystate.edu", href: "mailto:efekadu@murraystate.edu" },
              { label: "Phone", value: "(703) 861-8851", href: "tel:+17038618851" },
              { label: "LinkedIn", value: "LinkedIn →", href: "https://www.linkedin.com/in/ezana-fekadu/" },
              { label: "GitHub", value: "GitHub →", href: "https://github.com/EzanaFekadu" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, padding: "16px 24px",
                  transition: "all 0.3s",
                  display: "flex", flexDirection: "column", gap: 4,
                  minWidth: 180,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(92,255,229,0.3)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{
                  fontSize: 11, color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{link.label}</span>
                <span style={{ fontSize: 14, color: "#f0f0f0" }}>{link.value}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: "32px", maxWidth: 1200, margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: "rgba(255,255,255,0.25)",
        }}>
          © 2026 Ezana Fekadu
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 11,
          color: "rgba(255,255,255,0.2)",
        }}>
          Murray, KY
        </span>
      </footer>
    </div>
  );
}
