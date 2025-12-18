import { motion, useScroll, useTransform } from "framer-motion";
import { FaUsers, FaBuilding, FaStar } from "react-icons/fa";
import { useRef } from "react";

const testimonialsData = [
  {
    name: "TechNova Ltd",
    position: "HR Manager",
    testimonial:
      "AssetVerse has completely transformed how we manage office assets. It's intuitive and reliable.",
  },
  {
    name: "InnovaTech",
    position: "Operations Lead",
    testimonial:
      "The multi-company support and automated workflow are exactly what we needed.",
  },
  {
    name: "SoftSolutions",
    position: "CEO",
    testimonial:
      "Tracking assets and employee requests has never been easier. Highly recommend AssetVerse!",
  },
];

const statsData = [
  { icon: FaUsers, value: "500+", label: "Active Employees" },
  { icon: FaBuilding, value: "100+", label: "Companies Trust Us" },
  { icon: FaStar, value: "4.8/5", label: "Average Rating" },
];

const TestimonialsStats = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden bg-[#0f0f1c] px-6 md:px-12 "
    >
      {/* Background Neon Auras */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-indigo-500/30 blur-[200px] rounded-full top-10 left-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] bg-pink-500/20 blur-[150px] rounded-full bottom-10 right-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Heading */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(125,108,255,0.6)] mb-4">
            Testimonials & Stats
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
            Companies across industries trust AssetVerse for efficient asset and employee management.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
              className="bg-[#1a1a2e] border border-indigo-500/30 rounded-3xl p-8 shadow-[0_0_30px_rgba(125,108,255,0.2)] hover:shadow-[0_0_50px_rgba(125,108,255,0.4)] transition-all"
            >
              <p className="text-gray-300 italic mb-4">"{item.testimonial}"</p>
              <h3 className="text-white font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-400 text-sm">{item.position}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
              className="bg-[#1a1a2e] border border-indigo-500/30  p-10 shadow-[0_0_30px_rgba(125,108,255,0.2)] hover:shadow-[0_0_50px_rgba(125,108,255,0.4)] hover:-translate-y-1 transition-all flex flex-col items-center justify-center"
            >
              <stat.icon className="text-5xl text-indigo-400 mb-4" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsStats;
