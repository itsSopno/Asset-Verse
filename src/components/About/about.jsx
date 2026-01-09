// import { motion, useScroll, useTransform } from "framer-motion";
// import { FaBuilding, FaUsersCog, FaShieldAlt, FaChartLine } from "react-icons/fa";
// import { useRef } from "react";

// const AboutAssetVerseScroll = () => {
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);
//   const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

//   const cardScale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]);
//   const cardOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

//   return (
//     <section
//       ref={ref}
//       className="relative py-28 overflow-hidden  bg-[#0f0f1c] px-6 md:px-12"
//     >
     
//       <motion.div
//         className="absolute w-[500px] h-[500px] bg-indigo-500/40 blur-[200px] rounded-full top-20 left-10"
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 2, ease: "easeOut" }}
//       />
//       <motion.div
//         className="absolute w-[400px] h-[400px] bg-pink-500/30 blur-[150px] rounded-full bottom-10 right-20"
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 2.5, ease: "easeOut" }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto">

      
//         <motion.div
//           style={{ y: headingY, opacity: headingOpacity }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(125,108,255,0.6)] mb-4">
//             About AssetVerse
//           </h2>
//           <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
//             AssetVerse is a cloud-based corporate asset & HR management platform
//             enabling organizations to manage assets, employees, and subscriptions
//             with transparency and operational control.
//           </p>
//         </motion.div>

       
//         <motion.div
//           style={{ scale: cardScale, opacity: cardOpacity }}
//           className="bg-[#1a1a2e] border border-indigo-500/30 rounded-3xl p-10 shadow-[0_0_40px_rgba(125,108,255,0.3)] mb-24 text-center"
//         >
//           <p className="text-gray-300 leading-relaxed text-lg md:text-xl">
//             From laptops and office devices to affiliation tracking and asset
//             return workflows, AssetVerse provides businesses with real-time
//             visibility into their operational resources. HR managers can manage
//             inventory, assign assets, approve requests, and upgrade subscription
//             packages — while employees can request and track assets across
//             multiple organizations from a unified dashboard.
//           </p>
//         </motion.div>

    
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {benefits.map((item, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.6, delay: idx * 0.15 }}
//               className="bg-[#1a1a2e] border border-indigo-500/30 rounded-3xl p-6 text-center shadow-[0_0_30px_rgba(125,108,255,0.2)] hover:shadow-[0_0_50px_rgba(125,108,255,0.4)] hover:-translate-y-2 transition-all"
//             >
//               <item.icon className="text-5xl text-indigo-400 mx-auto mb-5" />
//               <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
//               <p className="text-gray-300 text-sm">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>

       
//         <motion.div
//           style={{ opacity: headingOpacity }}
//           className="text-center mt-24"
//         >
//           <h3 className="text-2xl md:text-3xl font-semibold text-indigo-300 tracking-wide drop-shadow-[0_0_15px_rgba(125,108,255,0.5)]">
//             “Smart Asset Control for Smarter Businesses”
//           </h3>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default AboutAssetVerseScroll;

// const benefits = [
//   {
//     title: "Centralized Asset Control",
//     desc: "Manage all assets from a unified dashboard with real-time availability and tracking.",
//     icon: FaBuilding,
//   },
//   {
//     title: "Smart Employee Management",
//     desc: "Automatically affiliate employees across multiple companies with package-based limits.",
//     icon: FaUsersCog,
//   },
//   {
//     title: "Secure & Transparent Workflow",
//     desc: "Role-based approvals and controlled operations ensure full accountability.",
//     icon: FaShieldAlt,
//   },
//   {
//     title: "Scalable Business Platform",
//     desc: "Flexible subscription plans with integrated payment and analytics capabilities.",
//     icon: FaChartLine,
//   },
// ];

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaBuilding, FaUsersCog, FaShieldAlt, FaChartLine, FaCheck } from "react-icons/fa";
import { useRef } from "react";

const benefits = [
  {
    title: "Centralized Asset Control",
    desc: "Unified dashboard with real-time hardware tracking.",
    icon: FaBuilding,
    accent: "from-indigo-500/20"
  },
  {
    title: "Smart Employee Management",
    desc: "Cross-company affiliation with automated limits.",
    icon: FaUsersCog,
    accent: "from-purple-500/20"
  },
  {
    title: "Secure & Transparent Workflow",
    desc: "Role-based approvals and encrypted audit logs.",
    icon: FaShieldAlt,
    accent: "from-pink-500/20"
  },
  {
    title: "Scalable Business Platform",
    desc: "Flexible Stripe-integrated plans for growth.",
    icon: FaChartLine,
    accent: "from-blue-500/20"
  },
];

const AboutAssetVerseScroll = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springScroll, [0, 0.5], [15, 0]);
  const opacity = useTransform(springScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-32 bg-[#0f0f1c] px-6 md:px-12 overflow-hidden">
      
      {/* Original Neon Auras kept as requested */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[200px] rounded-full top-20 left-10"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-pink-500/15 blur-[150px] rounded-full bottom-10 right-20"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div style={{ opacity, rotateX, perspective: "1000px" }} className="relative z-10 max-w-7xl mx-auto">
        
        {/* TOP SECTION: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <motion.div 
              initial={{ width: 0 }} 
              whileInView={{ width: "80px" }} 
              className="h-1 bg-indigo-500 mb-8" 
            />
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              THE FUTURE OF <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                ASSET INTELLIGENCE.
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              AssetVerse is a cloud-native ecosystem designed for high-growth organizations. 
              We bridge the gap between physical resources and human capital through 
              automated transparency and operational excellence.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-indigo-500/10 rounded-[2rem] blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700" />
            <div className="relative bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-12 shadow-2xl">
              <p className="text-gray-300 text-lg leading-relaxed italic font-light">
                "From hardware lifecycles to cross-company tracking, we provide the 
                infrastructure for businesses to manage their inventory, approve 
                requests, and scale subscriptions from a single, unified Command Center."
              </p>
              <div className="flex gap-2 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-1 w-8 bg-indigo-500/30 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Interactive Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.05] transition-all duration-500"
            >
              {/* Corner Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                  <item.icon className="text-2xl text-indigo-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3 tracking-tight group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER QUOTE: Minimalist */}
        <div className="mt-40 pt-20 border-t border-white/5 text-center">
          <h3 className="text-indigo-400 font-mono text-xs uppercase tracking-[0.6em] opacity-40 mb-4">
            Operational Excellence
          </h3>
          <p className="text-3xl md:text-4xl font-extralight text-white/80 tracking-tight">
            Smart Asset Control for <span className="font-bold text-white">Smarter Businesses.</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutAssetVerseScroll;