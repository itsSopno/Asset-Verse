import { motion, useScroll, useTransform } from "framer-motion";
import { FaBuilding, FaUsersCog, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { useRef } from "react";

const AboutAssetVerseScroll = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const cardScale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden  bg-[#0f0f1c] px-6 md:px-12"
    >
     
      <motion.div
        className="absolute w-[500px] h-[500px] bg-indigo-500/40 blur-[200px] rounded-full top-20 left-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-pink-500/30 blur-[150px] rounded-full bottom-10 right-20"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

      
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(125,108,255,0.6)] mb-4">
            About AssetVerse
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
            AssetVerse is a cloud-based corporate asset & HR management platform
            enabling organizations to manage assets, employees, and subscriptions
            with transparency and operational control.
          </p>
        </motion.div>

       
        <motion.div
          style={{ scale: cardScale, opacity: cardOpacity }}
          className="bg-[#1a1a2e] border border-indigo-500/30 rounded-3xl p-10 shadow-[0_0_40px_rgba(125,108,255,0.3)] mb-24 text-center"
        >
          <p className="text-gray-300 leading-relaxed text-lg md:text-xl">
            From laptops and office devices to affiliation tracking and asset
            return workflows, AssetVerse provides businesses with real-time
            visibility into their operational resources. HR managers can manage
            inventory, assign assets, approve requests, and upgrade subscription
            packages — while employees can request and track assets across
            multiple organizations from a unified dashboard.
          </p>
        </motion.div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-[#1a1a2e] border border-indigo-500/30 rounded-3xl p-6 text-center shadow-[0_0_30px_rgba(125,108,255,0.2)] hover:shadow-[0_0_50px_rgba(125,108,255,0.4)] hover:-translate-y-2 transition-all"
            >
              <item.icon className="text-5xl text-indigo-400 mx-auto mb-5" />
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

       
        <motion.div
          style={{ opacity: headingOpacity }}
          className="text-center mt-24"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-indigo-300 tracking-wide drop-shadow-[0_0_15px_rgba(125,108,255,0.5)]">
            “Smart Asset Control for Smarter Businesses”
          </h3>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutAssetVerseScroll;

const benefits = [
  {
    title: "Centralized Asset Control",
    desc: "Manage all assets from a unified dashboard with real-time availability and tracking.",
    icon: FaBuilding,
  },
  {
    title: "Smart Employee Management",
    desc: "Automatically affiliate employees across multiple companies with package-based limits.",
    icon: FaUsersCog,
  },
  {
    title: "Secure & Transparent Workflow",
    desc: "Role-based approvals and controlled operations ensure full accountability.",
    icon: FaShieldAlt,
  },
  {
    title: "Scalable Business Platform",
    desc: "Flexible subscription plans with integrated payment and analytics capabilities.",
    icon: FaChartLine,
  },
];
