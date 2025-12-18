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
      className="w-full h-screen flex items-center justify-center overflow-hidden relative"
      style={{
        background: "transparent", // ✅ Transparent background
      }}
    >
      {/* Glowing Cores */}
      <div
        ref={core1}
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, #6b63ff, transparent 70%)",
          filter: "blur(140px)",
          opacity: 0.35,
        }}
      />
      <div
        ref={core2}
        className="absolute w-[450px] h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, #8f89ff, transparent 70%)",
          filter: "blur(180px)",
          opacity: 0.25,
        }}
      />
      <div
        ref={core3}
        className="absolute w-[650px] h-[650px] rounded-full"
        style={{
          background: "radial-gradient(circle, #a09aff, transparent 75%)",
          filter: "blur(220px)",
          opacity: 0.15,
        }}
      />

      {/* Halo Rings */}
      <div
        ref={halo1}
        className="absolute w-[600px] h-[600px] rounded-full border-[2px] border-indigo-400/30"
        style={{ filter: "blur(4px)" }}
      />
      <div
        ref={halo2}
        className="absolute w-[720px] h-[720px] rounded-full border-[2px] border-indigo-300/20"
        style={{ filter: "blur(8px)" }}
      />

      {/* Shockwave Ripple */}
      <div
        ref={shockwave}
        className="absolute w-[300px] h-[300px] rounded-full border-2 border-white/20"
        style={{ filter: "blur(12px)" }}
      />

      {/* Lens Flare */}
      <div
        ref={flare}
        className="absolute w-[25%] h-[100%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      {/* Holographic Logo Text */}
      <h1
        ref={title}
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(60px, 8vw, 130px)",
          background:
            "linear-gradient(180deg, #ffffff 10%, #cfd3ff 40%, #6b63ff 65%, #a8aaff 95%)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          letterSpacing: "0.2em",
          textShadow: "0 0 70px rgba(255,255,255,0.35)",
          zIndex: 10,
        }}
      >
        ASSETVERSE
      </h1>
    </section>
  );
};

export default AssetVerseProfessionalLoader;
