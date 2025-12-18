import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaClipboardList, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import THANKS from "../Thanks/thanks";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  { question: "Can employees belong to multiple companies?", answer: "Yes, employees can request assets from multiple companies and be affiliated with them simultaneously." },
  { question: "How do I upgrade my subscription package?", answer: "HR managers can upgrade their package from the dashboard using Stripe payment integration." },
  { question: "Are assets returnable?", answer: "Some assets are returnable and can be tracked when returned; non-returnable items stay assigned to employees permanently." },
  { question: "Is the system secure?", answer: "Yes, AssetVerse uses role-based authentication and JWT tokens to ensure secure access and transparency." }
];

const Questions = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Fade in section
      gsap.from(".questions-section", {
        scrollTrigger: {
          trigger: ".questions-section",
          start: "top 80%",
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
      });

      // Animate individual step cards
      gsap.from(".how-step", {
        scrollTrigger: {
          trigger: ".questions-section",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      // Animate FAQ items
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Floating neon shards
      const shards = document.querySelectorAll(".floating-shard");
      shards.forEach(shard => {
        gsap.to(shard, {
          x: () => Math.random() * 40 - 20,
          y: () => Math.random() * 30 - 15,
          rotate: () => Math.random() * 20 - 10,
          opacity: () => 0.1 + Math.random() * 0.3,
          repeat: -1,
          yoyo: true,
          duration: 4 + Math.random() * 2,
          ease: "sine.inOut"
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="questions-section relative w-full bg-[#0f0f1c] py-20 px-6 md:px-12 overflow-hidden gap-9">
      {/* Floating Neon Shards */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="floating-shard absolute w-[80px] h-[2px] bg-indigo-400/20 rounded-full"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">

        {/* How It Works */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(125,108,255,0.6)] mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: FaClipboardList, title: "Step 1: Register", desc: "Employees and HR managers sign up and create their profiles." },
              { icon: FaCheckCircle, title: "Step 2: Manage Assets", desc: "HR adds assets, approves requests, and assigns them to employees." },
              { icon: FaPaperPlane, title: "Step 3: Track & Return", desc: "Employees track their assigned assets and return them if applicable." }
            ].map((step, i) => (
              <div key={i} className="how-step bg-[#1a1a2e] border border-indigo-500/30 rounded-3xl p-8 text-center shadow-[0_0_30px_rgba(125,108,255,0.2)]">
                <step.icon className="text-5xl text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-list max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-[0_0_25px_rgba(125,108,255,0.6)] mb-10">
            Frequently Asked Questions
          </h2>
          {faqData.map((faq, idx) => (
            <div key={idx} className="faq-item bg-[#1a1a2e] border border-indigo-500/30 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(125,108,255,0.15)]">
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full flex justify-between items-center p-4 text-left text-white font-medium focus:outline-none"
              >
                {faq.question}
                <span className="text-indigo-400 text-2xl">{openFAQ === idx ? "−" : "+"}</span>
              </button>
              {openFAQ === idx && (
                <div className="p-4 text-gray-300 border-t border-indigo-500/20">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-indigo-500/80 backdrop-blur-md rounded-3xl py-16 px-6 text-center text-white shadow-[0_0_40px_rgba(125,108,255,0.4)]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            Get Started with AssetVerse Today
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-gray-100 text-lg md:text-xl leading-relaxed">
            Join hundreds of companies already managing their assets efficiently. Sign up now and start tracking your company's resources seamlessly.
          </p>
          <button className="bg-white text-indigo-500 font-semibold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-indigo-100 transition-all">
            Contact Us
          </button>
        </div>
      </div>
      <div className="pt-[30px]">
        <THANKS></THANKS>
      </div>
     
    </section>
  );
};

export default Questions;
