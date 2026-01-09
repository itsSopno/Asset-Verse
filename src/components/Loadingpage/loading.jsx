import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AssetVerseProfessionalLoader = () => {
  const container = useRef(null);
  const title = useRef(null);
  const core1 = useRef(null);
  const core2 = useRef(null);
  const core3 = useRef(null);
  const halo1 = useRef(null);
  const halo2 = useRef(null);
  const shockwave = useRef(null);
  const flare = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(container.current, { opacity: 0 }, { opacity: 1, duration: 1.6 });

    tl.fromTo(
      title.current,
      { opacity: 0, y: 60, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 2 },
      "-=1.2"
    );

    [core1.current, core2.current, core3.current].forEach((core, i) => {
      gsap.to(core, {
        scale: 1 + 0.05 * (i + 1),
        opacity: 0.3 + i * 0.05,
        duration: 5 + i * 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    [halo1.current, halo2.current].forEach((halo, i) => {
      gsap.to(halo, {
        rotate: 360,
        duration: 20 + i * 8,
        repeat: -1,
        ease: "none",
      });
    });

    gsap.to(shockwave.current, {
      scale: 2.5,
      opacity: 0,
      duration: 2.2,
      repeat: -1,
      ease: "power2.out",
    });

    gsap.to(flare.current, {
      x: "120%",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;

      gsap.to(container.current, {
        rotateY: x * 0.5,
        rotateX: -y * 0.5,
        transformPerspective: 900,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(title.current, {
        x: x * 0.7,
        y: y * 0.7,
        duration: 0.7,
      });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={container}
      className="w-full h-screen flex items-center justify-center overflow-hidden relative p-4"
      style={{ background: "transparent" }}
    >
      {/* Glowing Cores - Responsive sizes using tailwind w/h */}
      <div
        ref={core1}
        className="absolute w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, #6b63ff, transparent 70%)",
          filter: "blur(80px) md:blur(140px)",
          opacity: 0.35,
        }}
      />
      <div
        ref={core2}
        className="absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, #8f89ff, transparent 70%)",
          filter: "blur(100px) md:blur(180px)",
          opacity: 0.25,
        }}
      />
      <div
        ref={core3}
        className="absolute w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full"
        style={{
          background: "radial-gradient(circle, #a09aff, transparent 75%)",
          filter: "blur(120px) md:blur(220px)",
          opacity: 0.15,
        }}
      />

      {/* Halo Rings - Responsive sizes */}
      <div
        ref={halo1}
        className="absolute w-[280px] h-[280px] md:w-[600px] md:h-[600px] rounded-full border-[1px] md:border-[2px] border-indigo-400/30"
        style={{ filter: "blur(2px) md:blur(4px)" }}
      />
      <div
        ref={halo2}
        className="absolute w-[340px] h-[340px] md:w-[720px] md:h-[720px] rounded-full border-[1px] md:border-[2px] border-indigo-300/20"
        style={{ filter: "blur(4px) md:blur(8px)" }}
      />

      {/* Shockwave Ripple */}
      <div
        ref={shockwave}
        className="absolute w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full border border-white/20"
        style={{ filter: "blur(8px) md:blur(12px)" }}
      />

      {/* Lens Flare */}
      <div
        ref={flare}
        className="absolute w-[50%] md:w-[25%] h-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
          filter: "blur(20px) md:blur(40px)",
        }}
      />

      {/* Holographic Logo Text - Responsive Font Size */}
      <h1
        ref={title}
        className="text-center font-bold"
        style={{
          fontFamily: "Playfair Display, serif",
          // Clamp: min 30px, dynamic 8vw, max 130px
          fontSize: "clamp(30px, 8vw, 130px)",
          background:
            "linear-gradient(180deg, #ffffff 10%, #cfd3ff 40%, #6b63ff 65%, #a8aaff 95%)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          letterSpacing: "0.15em",
          textShadow: "0 0 40px rgba(255,255,255,0.25)",
          zIndex: 10,
          lineHeight: "1.2",
        }}
      >
        ASSETVERSE
      </h1>
    </section>
  );
};

export default AssetVerseProfessionalLoader;
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import "./loading.css"
// const AssetVerseProfessionalLoader = () => {
//   const container = useRef(null);
//   const title = useRef(null);
//   const rings = [useRef(null), useRef(null), useRef(null)];
//   const scanLine = useRef(null);
//   const grid = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

//     // Initial Entrance
//     tl.fromTo(container.current, { opacity: 0 }, { opacity: 1, duration: 1 })
//       .fromTo(title.current, 
//         { opacity: 0, scale: 0.9, letterSpacing: "1em", filter: "blur(10px)" }, 
//         { opacity: 1, scale: 1, letterSpacing: "0.2em", filter: "blur(0px)", duration: 2.5 }, 
//         "-=0.5"
//       );

//     // Tech Rings - Counter Rotation
//     rings.forEach((ring, i) => {
//       gsap.to(ring.current, {
//         rotate: i % 2 === 0 ? 360 : -360,
//         duration: 15 + i * 5,
//         repeat: -1,
//         ease: "none",
//       });
      
//       gsap.fromTo(ring.current, 
//         { opacity: 0, scale: 0.8 }, 
//         { opacity: 0.3 - i * 0.1, scale: 1, duration: 2, delay: i * 0.3 }
//       );
//     });

//     // Vertical Scan Line Effect
//     gsap.fromTo(scanLine.current, 
//       { y: "-100%" }, 
//       { y: "200%", duration: 4, repeat: -1, ease: "none" }
//     );

//     // Subtle Grid Pulse
//     gsap.to(grid.current, {
//       opacity: 0.1,
//       duration: 2,
//       repeat: -1,
//       yoyo: true,
//       ease: "sine.inOut"
//     });

//     // Parallax Mouse Effect
//     const handleMouse = (e) => {
//       const { clientX, clientY } = e;
//       const x = (clientX / window.innerWidth - 0.5) * 30;
//       const y = (clientY / window.innerHeight - 0.5) * 30;

//       gsap.to(".parallax-layer", {
//         x: (i) => x * (i + 1) * 0.2,
//         y: (i) => y * (i + 1) * 0.2,
//         duration: 1,
//         stagger: 0.02
//       });
//     };

//     window.addEventListener("mousemove", handleMouse);
//     return () => window.removeEventListener("mousemove", handleMouse);
//   }, []);

//   return (
//     <section
//       ref={container}
//       className="body1 w-full h-screen flex items-center justify-center overflow-hidden relative bg-[#080810]"
//     >
//       {/* Background Tech Grid */}
//       <div 
//         ref={grid}
//         className="absolute inset-0 opacity-[0.05]"
//         style={{
//           backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
//           backgroundSize: '50px 50px',
        
//         }}
//       />

//       {/* Core Glowing Orb */}
//       <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-indigo-600/10 rounded-full blur-[120px] parallax-layer" />

//       {/* Scanning Line */}
//       <div 
//         ref={scanLine}
//         className="absolute top-0 left-0 w-full h-[30vh] pointer-events-none z-20"
//         style={{
//           background: "linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.05), transparent)",
//           borderBottom: "1px solid rgba(99, 102, 241, 0.2)"
//         }}
//       />

//       {/* Geometric Tech Rings */}
//       {rings.map((ring, i) => (
//         <div
//           key={i}
//           ref={ring}
//           className="absolute rounded-full border-t-2 border-l-2 border-indigo-500/20 parallax-layer"
//           style={{
//             width: `${300 + i * 150}px`,
//             height: `${300 + i * 150}px`,
//             borderStyle: i === 1 ? 'dashed' : 'solid'
//           }}
//         />
//       ))}

//       {/* Holographic Text Container */}
//       <div className="relative z-10 text-center parallax-layer">
//         <h1
//           ref={title}
//           className="font-black text-white selection:bg-indigo-500"
//           style={{
//             fontSize: "clamp(2rem, 10vw, 8rem)",
//             fontFamily: "'Inter', sans-serif",
//             textShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
//           }}
//         >
//           ASSET<span className="text-indigo-500">VERSE</span>
//         </h1>
//         <div className="flex justify-center items-center gap-4 mt-4">
//           <div className="h-[1px] w-12 bg-indigo-500/50" />
//           <p className="text-xs font-mono tracking-[0.5em] text-indigo-300 opacity-60">
//             SYSTEM INITIALIZING
//           </p>
//           <div className="h-[1px] w-12 bg-indigo-500/50" />
//         </div>
//       </div>

//       {/* Decorative Binary/Data Particles (Optional CSS Only) */}
//       <div className="absolute bottom-10 left-10 font-mono text-[10px] text-indigo-500/20 hidden md:block">
//         STATUS: SECURE<br />
//         ENCRYPTION: AES_256<br />
//         CORE: ACTIVE
//       </div>
//     </section>
//   );
// };

// export default AssetVerseProfessionalLoader;
// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const AssetVerseLoader = ({ finishedLoading }) => {
//   const loaderRef = useRef();
//   const logoRef = useRef();
//   const counterRef = useRef();
//   const progressRef = useRef();
//   const subtitleRef = useRef();

//   useEffect(() => {
//     const tl = gsap.timeline();

//     // 1. Initial State
//     gsap.set(logoRef.current, { y: 100, opacity: 0 });
//     gsap.set(subtitleRef.current, { opacity: 0 });

//     // 2. Entrance Animation
//     tl.to(logoRef.current, {
//       y: 0,
//       opacity: 1,
//       duration: 1.2,
//       ease: "power4.out",
//     })
//     .to(subtitleRef.current, {
//       opacity: 0.4,
//       duration: 1,
//     }, "-=0.8");

//     // 3. Counter & Progress Animation (Synchronized)
//     let data = { value: 0 };
//     tl.to(data, {
//       value: 100,
//       duration: 2.5,
//       ease: "power2.inOut",
//       onUpdate: () => {
//         const roundedVal = Math.round(data.value);
//         if (counterRef.current) counterRef.current.innerText = roundedVal;
//         if (progressRef.current) progressRef.current.style.width = `${roundedVal}%`;
//       },
//     }, "-=0.5");

//     // 4. The "Curtain Exit" (Signature Dogstudio Move)
//     tl.to([logoRef.current, subtitleRef.current, counterRef.current], {
//       y: -50,
//       opacity: 0,
//       duration: 0.8,
//       ease: "power4.in",
//     })
//     .to(loaderRef.current, {
//       y: "-100%",
//       duration: 1.2,
//       ease: "expo.inOut",
//       onComplete: finishedLoading,
//     }, "-=0.2");

//   }, [finishedLoading]);

//   return (
//     <div 
//       ref={loaderRef} 
//       className="fixed inset-0 z-[999] bg-[#08080a] flex flex-col items-center justify-center overflow-hidden"
//     >
//       {/* Background Subtle Gradient */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_#08080a_100%)] opacity-50" />

//       <div className="relative z-10 w-full max-w-4xl px-10">
//         {/* Massive Logo */}
//         <div className="overflow-hidden mb-4">
//           <h1 
//             ref={logoRef} 
//             className="text-white text-7xl md:text-9xl font-black tracking-tighter text-center"
//           >
//             ASSET<span className="text-indigo-600">VERSE</span>
//           </h1>
//         </div>

//         {/* Subtitle */}
//         <p 
//           ref={subtitleRef}
//           className="text-white/40 text-center font-mono text-xs tracking-[0.4em] uppercase mb-12"
//         >
//           Systems Initialization
//         </p>

//         {/* Professional Counter & Bar */}
//         <div className="flex flex-col items-center">
//           <div className="flex items-baseline gap-1 text-white font-black text-6xl mb-6 italic">
//             <span ref={counterRef}>0</span>
//             <span className="text-xl not-italic text-indigo-500">%</span>
//           </div>
          
//           <div className="w-full h-[2px] bg-white/5 relative">
//             <div 
//               ref={progressRef}
//               className="absolute top-0 left-0 h-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.6)] transition-all duration-100 ease-out"
//               style={{ width: '0%' }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Modern Status Text */}
//       <div className="absolute bottom-12 left-12">
//         <div className="flex items-center gap-3">
//           <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
//           <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
//             Establishing Secure Handshake...
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetVerseLoader;