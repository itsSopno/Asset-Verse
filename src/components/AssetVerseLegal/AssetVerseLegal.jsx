import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import "./legal.css"
const sections = [
  { id: 'governance', title: 'Governance', content: 'This Document outlines the operational framework of AssetVerse. Users are granted a non-exclusive, revocable license to manage corporate hardware through our encrypted interface. Failure to adhere to these protocols may result in immediate revocation of system access.' },
  { id: 'privacy', title: 'Sovereignty', content: 'AssetVerse adheres to strict data minimization principles. We process hardware telemetry and employee assignment metadata solely for inventory optimization. All data is stored in ISO 27001 certified environments with mandatory multi-factor authentication.' },
  { id: 'liability', title: 'Liability', content: 'The end-user acknowledges full fiduciary responsibility for assigned physical assets. In the event of hardware compromise, the user must initiate the "Lock & Report" sequence within the AssetVerse dashboard to prevent unauthorized data egress.' },
  { id: 'compliance', title: 'Compliance', content: 'AssetVerse maintains compliance with global B2B standards. We employ real-time auditing and immutable logging of all asset transfers. Any attempt to circumvent these security layers is logged and reported to the corporate security officer.' },
];

const AssetVerseLegal = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [signed, setSigned] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="body relative min-h-screen bg-[#08080a] text-white font-sans overflow-hidden">
      {/* Background Layer: Matches your purple theme from the image */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_0%_0%,_#161233_0%,_#08080a_100%)] opacity-70" />
      
      {/* 1. Ultra-thin Progress Header */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-purple-500 z-50 origin-left shadow-[0_0_10px_#a855f7]"
        style={{ scaleX }}
      />

      <div className="relative z-10 flex h-screen w-full">
        
        {/* 2. LEFT PANEL: Fixed Identity & Navigation */}
        <aside className="hidden lg:flex flex-col justify-between w-[35%] p-16 border-r border-white/5 bg-black/20 backdrop-blur-3xl">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-20"
            >
              <h1 className="text-xl font-black tracking-[0.6em] text-purple-500 uppercase">
                AssetVerse
              </h1>
              <p className="text-xs font-mono text-white/30 mt-2 uppercase tracking-widest">
                Terminal // Legal_Dept
              </p>
            </motion.div>

            <nav className="space-y-10">
              {sections.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="group block w-full text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-[10px] font-mono transition-colors ${activeSection === s.id ? 'text-purple-400' : 'text-white/10'}`}>
                      0{index + 1}
                    </span>
                    <span className={`text-lg uppercase tracking-[0.2em] transition-all duration-500 ${
                      activeSection === s.id ? 'text-white opacity-100' : 'text-white/20 group-hover:text-white/40'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                  {activeSection === s.id && (
                    <motion.div layoutId="navLine" className="h-[1px] bg-purple-500 mt-2 w-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="text-[10px] font-mono text-white/20 space-y-1 uppercase tracking-tighter">
            <p>Protocol: AV_256_SECURE</p>
            <p>Encryption: Active</p>
            <p>© 2026 AssetVerse Ecosystem</p>
          </div>
        </aside>

        {/* 3. RIGHT PANEL: Full-Screen Scrollable Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth no-scrollbar px-8 lg:px-24">
          <div className="max-w-3xl py-[30vh] space-y-[40vh]">
            {sections.map((section) => (
              <ContentSection 
                key={section.id} 
                section={section} 
                setActive={setActiveSection} 
              />
            ))}

            {/* Final Signing Block */}
            <motion.footer 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pb-[20vh]"
            >
              <div className="bg-white/[0.03] border border-white/10 p-12 rounded-lg backdrop-blur-xl">
                <h3 className="text-3xl font-light tracking-tight text-white mb-6">Confirm <span className="text-purple-400 font-bold">Access.</span></h3>
                <p className="text-white/40 mb-10 text-lg font-light leading-relaxed">
                  Authentication is the final step in the AssetVerse deployment process. Ensure all protocols are reviewed.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSigned(!signed)}
                  className={`w-full py-6 text-sm font-black uppercase tracking-[0.4em] transition-all duration-700 ${
                    signed 
                    ? 'bg-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)]' 
                    : 'bg-white text-black hover:bg-purple-500 hover:text-white'
                  }`}
                >
                  {signed ? "Authorization Complete" : "Grant Authorization"}
                </motion.button>
              </div>
            </motion.footer>
          </div>
        </main>
      </div>
    </div>
  );
};

const ContentSection = ({ section, setActive }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) setActive(section.id);
  }, [isInView, section.id, setActive]);

  return (
    <motion.section
      id={section.id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="scroll-mt-64"
    >
      <div className="section flex items-center gap-4 mb-8">
        <div className="h-[1px] w-12 bg-purple-500/50" />
        <h3 className="text-xs font-mono text-purple-400 uppercase tracking-[0.4em]">
          {section.title}
        </h3>
      </div>
      <p className="text-3xl md:text-5xl leading-[1.3] font-light text-white italic">
        {section.content}
      </p>
    </motion.section>
  );
};

export default AssetVerseLegal;