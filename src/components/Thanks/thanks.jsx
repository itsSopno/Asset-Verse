import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const THANKS = ({
  primaryText = "Asset Verse • Thanks For Visiting Our Website",
  secondaryText = "From Maker • thanks",
}) => {
  const marqueeRef = useRef(null);
  const sectionRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const section = sectionRef.current;

    const getDuration = () => (window.innerWidth < 640 ? 34 : 22);

    tweenRef.current = gsap.to(marquee, {
      xPercent: -50,
      duration: getDuration(),
      ease: "none",
      repeat: -1,
      force3D: true,
    });

    gsap.fromTo(
      marquee,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        tweenRef.current.timeScale(1 + self.direction * 0.2);
      },
    });

    marquee.addEventListener("mouseenter", () => tweenRef.current.timeScale(0.4));
    marquee.addEventListener("mouseleave", () => tweenRef.current.timeScale(1));

    const onResize = () => tweenRef.current.duration(getDuration());
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (tweenRef.current) tweenRef.current.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-900 py-20 sm:py-28 mx-4 sm:mx-10 
      [clip-path:polygon(40px_0%,calc(100%-40px)_0%,100%_40px,100%_calc(100%-40px),calc(100%-40px)_100%,40px_100%,0%_calc(100%-40px),0%_40px)] 
      sm:[clip-path:polygon(60px_0%,calc(100%-60px)_0%,100%_60px,100%_calc(100%-60px),calc(100%-60px)_100%,60px_100%,0%_calc(100%-60px),0%_60px)]"
    >
     
      <div className="absolute top-6 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-6 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

    
      <div
        ref={marqueeRef}
        className="w-[200%] flex select-none will-change-transform"
      >
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-16 sm:gap-28 w-full px-6 sm:px-14"
          >
            <h1 className="text-[14vw] sm:text-[9vw] md:text-[7vw] font-black uppercase text-white whitespace-nowrap tracking-tighter">
              {primaryText}
            </h1>
            <h1 className="text-[14vw] sm:text-[9vw] md:text-[7vw] font-black uppercase text-white/40 whitespace-nowrap tracking-tighter">
              {secondaryText}
            </h1>
          </div>
        ))}
      </div>

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[150px] bg-blue-600/20 blur-[120px] rounded-full" />
    </section>
  );
};

export default THANKS;