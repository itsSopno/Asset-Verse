// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import { FaUsers, FaBuilding, FaStar, FaFingerprint } from "react-icons/fa";
// import { useRef } from "react";

// const testimonialsData = [
//   {
//     name: "TechNova Ltd",
//     position: "HR Manager",
//     testimonial: "AssetVerse has completely transformed how we manage office assets. It's intuitive and reliable.",
//     tag: "Security-First"
//   },
//   {
//     name: "InnovaTech",
//     position: "Operations Lead",
//     testimonial: "The multi-company support and automated workflow are exactly what we needed.",
//     tag: "Automation"
//   },
//   {
//     name: "SoftSolutions",
//     position: "CEO",
//     testimonial: "Tracking assets and employee requests has never been easier. Highly recommend AssetVerse!",
//     tag: "Scalability"
//   },
// ];

// const statsData = [
//   { icon: FaUsers, value: "500+", label: "Active Employees", color: "#6366f1" },
//   { icon: FaBuilding, value: "100+", label: "Companies Trust Us", color: "#a855f7" },
//   { icon: FaStar, value: "4.8/5", label: "Average Rating", color: "#ec4899" },
// ];

// const TestimonialsStats = () => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
//   const scale = useTransform(springScroll, [0, 0.5], [0.95, 1]);

//   return (
//     <section ref={ref} className="relative py-40 overflow-hidden bg-[#0f0f1c] px-6">
      
//       {/* Keeping your original Neon Auras */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-[150px] rounded-full top-0 left-0"
//         animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
//         transition={{ duration: 10, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-[300px] h-[300px] bg-pink-500/10 blur-[150px] rounded-full bottom-0 right-0"
//         animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
//         transition={{ duration: 8, repeat: Infinity }}
//       />

//       <motion.div style={{ scale }} className="relative z-10 max-w-7xl mx-auto">
        
//         {/* Unique Header: Cyberpunk Serial Number Style */}
//         <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
//           <div className="max-w-2xl">
//             <div className="flex items-center gap-3 mb-4">
//               <span className="h-[1px] w-12 bg-indigo-500" />
//               <span className="text-indigo-400 font-mono text-xs uppercase tracking-[0.5em]">System_Audit_2026</span>
//             </div>
//             <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter">
//               BEYOND <br /> 
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">BOUNDARIES.</span>
//             </h2>
//           </div>
//           <div className="hidden md:block text-right pb-4">
//             <FaFingerprint className="text-white/10 text-6xl ml-auto mb-4" />
//             <p className="text-gray-500 font-mono text-[10px] uppercase leading-tight">
//               Data Integrity: 99.9% <br /> Secure Encryption: Active
//             </p>
//           </div>
//         </div>

//         {/* Unique Layout: Asymmetric Bento Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
//           {testimonialsData.map((item, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className={`relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-3xl p-8 group transition-all duration-500 hover:bg-white/[0.05] ${
//                 idx === 0 ? "md:col-span-7" : idx === 1 ? "md:col-span-5" : "md:col-span-12"
//               }`}
//             >
//               {/* Glow Edge Effect */}
//               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
//               <div className="flex justify-between items-start mb-10">
//                 <span className="px-3 py-1 rounded-full border border-indigo-500/30 text-[10px] font-mono text-indigo-400 uppercase tracking-widest">
//                   {item.tag}
//                 </span>
//                 <span className="text-white/10 font-mono text-4xl font-black">0{idx + 1}</span>
//               </div>

//               <p className={`text-gray-300 leading-relaxed mb-12 ${idx === 2 ? "text-3xl md:text-4xl font-light italic" : "text-xl font-light"}`}>
//                 "{item.testimonial}"
//               </p>

//               <div className="flex items-center justify-between border-t border-white/5 pt-6">
//                 <div>
//                   <h3 className="text-white font-bold tracking-wide">{item.name}</h3>
//                   <p className="text-gray-500 text-xs uppercase font-mono tracking-tighter">{item.position}</p>
//                 </div>
//                 <div className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 text-xs">
//                   AV
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Stats Section: Horizontal "Power Bar" Style */}
//         <div className="relative group bg-black/40 border border-white/10 rounded-[2rem] p-1 overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
//             {statsData.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ y: -5 }}
//                 className="p-12 flex flex-col items-center text-center group/item"
//               >
//                 <div 
//                   className="mb-6 p-4 rounded-2xl bg-white/5 transition-all duration-500 group-hover/item:scale-110"
//                   style={{ color: stat.color, boxShadow: `0 0 20px ${stat.color}20` }}
//                 >
//                   <stat.icon className="text-3xl" />
//                 </div>
//                 <h3 className="text-5xl font-black text-white mb-2 tracking-tighter tabular-nums">
//                   {stat.value}
//                 </h3>
//                 <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">
//                   {stat.label}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default TestimonialsStats;
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaUsers, FaBuilding, FaStar, FaShieldAlt } from "react-icons/fa";
import { useRef } from "react";
import "./test.css"
const testimonialsData = [
  {
    name: "TechNova Ltd",
    position: "HR Manager",
    testimonial: "AssetVerse has completely transformed how we manage office assets. It's intuitive and reliable.",
    id: "01"
  },
  {
    name: "InnovaTech",
    position: "Operations Lead",
    testimonial: "The multi-company support and automated workflow are exactly what we needed.",
    id: "02"
  },
  {
    name: "SoftSolutions",
    position: "CEO",
    testimonial: "Tracking assets and employee requests has never been easier. Highly recommend AssetVerse!",
    id: "03"
  },
  {
    name: "Nexus Core",
    position: "CTO",
    testimonial: "The most robust asset security protocol we've ever implemented. Seamless scaling for 1000+ nodes.",
    id: "04"
  },
];

const statsData = [
  { icon: FaUsers, value: "500+", label: "Active Nodes", color: "text-indigo-400" },
  { icon: FaBuilding, value: "100+", label: "Global Entities", color: "text-purple-400" },
  { icon: FaStar, value: "4.8/5", label: "Trust Index", color: "text-pink-400" },
];

const TestimonialsStats = () => {
  const scrollContainerRef = useRef(null);

  return (
    <section className="relative h-screen w-full bg-[#0a0a14] overflow-hidden flex flex-col md:flex-row">
      
      {/* 1. FIXED BACKGROUND AURAS */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] bg-indigo-600/10 blur-[150px] rounded-full -top-[10%] -left-[10%] z-0"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* 2. LEFT PANEL: Fixed Identity & Stats (40% Width) */}
      <div className="relative z-10 w-full md:w-[40%] h-full p-12 md:p-24 flex flex-col justify-between border-r border-white/5 bg-black/20 backdrop-blur-xl">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <FaShieldAlt className="text-indigo-500 text-2xl" />
            <span className="font-mono text-xs tracking-[0.5em] text-white/40 uppercase">Verified Ecosystem</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            TRUSTED <br /> 
            <span className="text-indigo-500">AT SCALE.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xs font-light leading-relaxed">
            Real-time performance metrics and partner feedback from the AssetVerse network.
          </p>
        </div>

        {/* Vertical Stats Stack */}
        <div className="space-y-12">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-6 group"
            >
              <div className={`p-4 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-indigo-500/50 transition-colors ${stat.color}`}>
                <stat.icon className="text-2xl" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white tabular-nums">{stat.value}</h3>
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. RIGHT PANEL: Infinite Scroll Testimonials (60% Width) */}
      <div 
        ref={scrollContainerRef}
        className="right relative z-10 w-full md:w-[60%] h-full overflow-y-auto no-scrollbar scroll-smooth"
      >
        <div className="px-12 md:px-24 py-[20vh] space-y-[20vh]">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <span className="absolute -left-16 top-0 font-mono text-indigo-500/20 text-6xl font-black">
                {item.id}
              </span>
              <div className="relative z-10">
                <p className="text-3xl md:text-5xl font-light text-white leading-tight tracking-tight mb-10 italic">
                  "{item.testimonial}"
                </p>
                <div className="flex items-center gap-6">
                  <div className="h-[1px] w-12 bg-indigo-500" />
                  <div>
                    <h4 className="text-white font-bold text-xl">{item.name}</h4>
                    <p className="text-indigo-400 font-mono text-xs uppercase tracking-widest">{item.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Footer of the scroll area */}
          <div className="pt-20 border-t border-white/5">
            <p className="text-white/10 font-mono text-[10px] uppercase tracking-[1em]">
              End of Log // 2026 AssetVerse
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
          <span className="text-[10px] font-mono text-white/20 rotate-90 mb-8 uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-32 bg-white/5 relative">
            <motion.div 
              className="absolute top-0 w-full bg-indigo-500"
              style={{ height: "30%" }}
              animate={{ y: [0, 80, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStats;