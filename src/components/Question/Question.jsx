import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClipboardList, FaCheckCircle, FaPaperPlane, FaChevronDown } from "react-icons/fa";
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
      // Professional Reveal
      gsap.from(".section-header", {
        scrollTrigger: ".section-header",
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      });

      // Animated connector line for steps
      gsap.from(".step-line", {
        scrollTrigger: ".step-line",
        width: 0,
        duration: 2,
        ease: "power4.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ backgroundColor: 'var(--bg-main)' }}
    className="questions-section relative w-full --bg-main py-32 px-6 md:px-12 overflow-hidden">
      
      {/* Original Floating Shards kept as requested */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="floating-shard absolute w-[80px] h-[1px] bg-indigo-500/10 rounded-full"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HOW IT WORKS: Blueprint Style */}
        <div className="mb-40">
          <div className="section-header text-center mb-20">
            <h2 className="text-xs font-mono tracking-[0.5em] text-indigo-400 uppercase mb-4">Workflow</h2>
            <h3 style={{ color: 'var( --text-main)' }}className="text-4xl md:text-6xl font-black text-white tracking-tighter">How it <span className="italic font-light">works.</span></h3>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Desktop Connector Line */}
            <div className="step-line hidden md:block absolute top-1/2 left-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent w-full -z-10" />

            {[
              { icon: FaClipboardList, title: "Register", desc: "Initialize your corporate identity within the AssetVerse ecosystem." },
              { icon: FaCheckCircle, title: "Management", desc: "HR controls asset lifecycle from acquisition to employee assignment." },
              { icon: FaPaperPlane, title: "Deployment", desc: "Assets are tracked in real-time with automated return protocols." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl p-10 rounded-[2.5rem] group hover:border-indigo-500/30 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 text-indigo-400">
                  <step.icon size={28} />
                </div>
                <h4 style={{ color: 'var( --text-main)' }} className="text-white font-bold text-xl mb-4 tracking-tight">0{i+1}. {step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ: Clean Glassmorphism */}
        <div className="flex flex-col lg:flex-row gap-20 mb-40">
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
              General <br /> <span className="text-indigo-500">Inquiries.</span>
            </h2>
            <p className="text-gray-500 font-light text-lg">
              Everything you need to know about the AssetVerse protocol and implementation.
            </p>
          </div>

          <div className="lg:w-2/3 space-y-4">
            {faqData.map((faq, idx) => (
              <div key={idx} className="border-b border-white/5">
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex justify-between items-center py-8 text-left group"
                >
                  <span style={{ color: 'var( --text-main)' }}  className={`text-xl transition-colors duration-300 ${openFAQ === idx ? 'text-indigo-400' : 'text-white group-hover:text-indigo-300'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === idx ? 180 : 0 }}
                    className="text-indigo-500"
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQ === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-gray-500 leading-relaxed max-w-2xl text-lg font-light">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CTA: Ultra-Minimalist High Contrast */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="relative rounded-[3rem] bg-indigo-600 p-12 md:p-24 overflow-hidden text-center"
        >
          {/* Subtle noise/gradient texture */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready for the <span className="text-black/30">Next Level?</span>
            </h2>
            <p className="text-indigo-100/80 mb-12 max-w-xl mx-auto text-lg md:text-xl font-light">
              Join the corporate network. Optimize your resource distribution today.
            </p>
            <button className="bg-white text-black font-black uppercase tracking-widest text-xs py-5 px-12 rounded-full hover:bg-black hover:text-white transition-all duration-500 shadow-2xl">
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>

      <div className="pt-32">
        <THANKS />
      </div>
    </section>
  );
};

export default Questions;