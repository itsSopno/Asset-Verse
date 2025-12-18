// File: SelectionProjectSection.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaShieldAlt, FaClipboardList, FaCheckCircle, FaCubes, FaHandsHelping } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const BG = "#0f0f1c"; // same dark background used across the site
const ACCENT = "rgba(125,108,255,0.9)";

const reasons = [
  {
    icon: <FaShieldAlt size={28} />,
    title: "Prevent Asset Loss",
    desc: "Maintain accurate records of which employee holds each asset and reduce untracked losses.",
  },
  {
    icon: <FaClipboardList size={28} />,
    title: "Streamline Assignments",
    desc: "Automate asset assignment, returns, and approvals to reduce HR workload.",
  },
  {
    icon: <FaCubes size={28} />,
    title: "Inventory Visibility",
    desc: "Get clear, real-time visibility into what assets you own and their status.",
  },
  {
    icon: <FaHandsHelping size={28} />,
    title: "Reduce Admin Overhead",
    desc: "Cut repetitive manual processes with workflows and role-based controls.",
  },
  {
    icon: <FaCheckCircle size={28} />,
    title: "Returnable vs Non-returnable",
    desc: "Easily distinguish and manage returnable items to ensure accountability.",
  },
];

const SelectionProjectSection = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // overall fade-in
      gsap.from(".selection-root", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
      });

      // candidate card pop
      gsap.from(".candidate-card", {
        scrollTrigger: {
          trigger: ".candidate-card",
          start: "top 90%",
        },
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 0.9,
        ease: "back.out(1.2)",
      });

      // left overview animate
      gsap.from(".overview-col", {
        scrollTrigger: {
          trigger: ".overview-col",
          start: "top 85%",
        },
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
      });

      // right reasons stagger
      gsap.from(".reason-card", {
        scrollTrigger: {
          trigger: ".reasons-grid",
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="selection-root"
      style={{
        background: BG,
        color: "#e8e8f3",
        padding: "64px 20px",
        position: "relative",
        overflow: "hidden",
        
      }}
    >
      {/* subtle neon aura */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          background: "radial-gradient(circle at 20% 30%, rgba(125,108,255,0.22), transparent 30%)",
          filter: "blur(140px)",
          left: -80,
          top: -80,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          background: "radial-gradient(circle at 80% 70%, rgba(120,140,255,0.12), transparent 30%)",
          filter: "blur(110px)",
          right: -60,
          bottom: -60,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: "#fff", letterSpacing: 0.6 }}>
            Selection Project — AssetVerse
          </h2>
          <p style={{ marginTop: 8, color: "#cfcff5", opacity: 0.9, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
            Dear Candidates — congrats on passing round one! Below is the project brief: build a B2B HR & Asset Management Web Application (AssetVerse). This brief explains purpose, scope, and success criteria.
          </p>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 28,
          }}
        >
          {/* Stack responsive: on wide screens use two columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
            }}
          >
            {/* Candidate Message Card */}
            <div
              className="candidate-card"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                border: "1px solid rgba(125,108,255,0.08)",
                padding: 22,
                borderRadius: 14,
                boxShadow: "0 8px 40px rgba(14,12,34,0.6)",
              }}
            >
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#fff" }}>
                Dear Candidates,
              </h3>

              <p style={{ marginTop: 10, color: "#dbe0ff", lineHeight: 1.6 }}>
                We are pleased to inform you that you have <strong>successfully passed the first round</strong> of the selection process!! 🎉
                <br />
                Your application and skills have impressed us, and we are excited to move forward with you in the next stages. This project is designed to assess your skills, creativity, and problem-solving abilities. It will help us understand how you approach challenges and your ability to deliver high-quality solutions.
              </p>
            </div>

            {/* Project Overview */}
            <div
              className="overview-col"
              style={{
                display: "grid",
                gap: 12,
                background: "rgba(255,255,255,0.02)",
                padding: 20,
                borderRadius: 12,
                border: "1px solid rgba(125,108,255,0.06)",
              }}
            >
              <h4 style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 700 }}>Project Overview & Discussion</h4>

              <div style={{ color: "#d7d7ff", lineHeight: 1.6 }}>
                <p style={{ marginTop: 8 }}>
                  <strong>Theme:</strong> <span style={{ color: "#fff" }}>B2B HR & Asset Management Web Application</span>
                </p>

                <p style={{ marginTop: 4 }}>
                  <strong>What is AssetVerse?</strong> AssetVerse is a comprehensive digital platform that helps companies efficiently manage their physical assets (laptops, keyboards, chairs, etc.) and track which employee has which equipment. It solves the common problem of companies losing track of valuable assets and streamlines the entire asset management process.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: Why build & success criteria */}
          <div>
            <div
              style={{
                display: "grid",
                gap: 16,
                borderRadius: 12,
                padding: 18,
                background: "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01))",
                border: "1px solid rgba(125,108,255,0.06)",
                boxShadow: "0 10px 40px rgba(14,12,34,0.6)",
              }}
            >
              <h4 style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 700 }}>Why Build This System?</h4>

              <ul style={{ margin: 0, paddingLeft: 18, color: "#d7d7ff", lineHeight: 1.8 }}>
                <li>Prevents asset loss and improves accountability</li>
                <li>Streamlines asset assignment and return processes</li>
                <li>Provides clear visibility into company asset inventory</li>
                <li>Reduces administrative overhead for HR departments</li>
                <li>Ensures proper tracking of returnable vs non-returnable items</li>
              </ul>

              <div style={{ marginTop: 8 }}>
                <strong style={{ color: "#fff" }}>Success Criteria</strong>
                <p style={{ margin: "6px 0 0 0", color: "#d7d7ff", lineHeight: 1.6 }}>
                  Deliver a responsive B2B web app with role-based access, asset CRUD, request/approval workflows, inventory dashboard, and reliable persistence (API + DB). Bonus: polished UI, tests, and deployable demo.
                </p>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                <button
                  style={{
                    background: ACCENT,
                    color: "#081023",
                    padding: "10px 16px",
                    borderRadius: 10,
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Project Brief (PDF)
                </button>

                <button
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#d7d7ff",
                    padding: "10px 16px",
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                >
                  Ask a Question
                </button>
              </div>
            </div>

            {/* Reasons grid */}
            <div className="reasons-grid" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
              {reasons.map((r, i) => (
                <div
                  key={i}
                  className="reason-card"
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    padding: 14,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(125,108,255,0.04)",
                  }}
                >
                  <div style={{ width: 44, height: 44, background: "rgba(125,108,255,0.12)", borderRadius: 10, display: "grid", placeItems: "center", color: "#dfe4ff" }}>
                    {r.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{r.title}</div>
                    <div style={{ color: "#d7d7ff", fontSize: 13, marginTop: 6 }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: 36, textAlign: "center" }}>
          <p style={{ color: "#cfcff5", marginBottom: 12 }}>
            Good luck — we look forward to your creative and technical solutions!
          </p>
          <button
            style={{
              background: "linear-gradient(90deg, rgba(125,108,255,1), rgba(140,140,255,0.9))",
              border: "none",
              color: "#061025",
              padding: "12px 22px",
              borderRadius: 12,
              fontWeight: 800,
              boxShadow: "0 8px 30px rgba(125,108,255,0.28)",
              cursor: "pointer",
            }}
          >
            Download Full Brief
          </button>
        </div>
      </div>

      {/* Responsive tweaks */}
      <style jsx>{`
        @media (min-width: 900px) {
          .selection-root > div > div {
            grid-template-columns: 1fr 420px;
            gap: 28px;
          }
          .reasons-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 899px) {
          .reasons-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default SelectionProjectSection;
