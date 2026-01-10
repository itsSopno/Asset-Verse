import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AssetVerseHero = ({
  primaryText = "Asset Verse • We Are Organizing Assets",
  secondaryText = "Asset Verse • Smart Inventory Platform",
}) => {
  const marqueeRef = useRef(null);
  const sectionRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const section = sectionRef.current;

    const getDuration = () => (window.innerWidth < 640 ? 34 : 22);

    // infinite marquee
    tweenRef.current = gsap.to(marquee, {
      xPercent: -50,
      duration: getDuration(),
      ease: "none",
      repeat: -1,
      force3D: true,
    });

    // entrance animation
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

    // scroll interaction (enterprise feel)
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        tweenRef.current.timeScale(1 + self.direction * 0.2);
      },
    });

    // hover slow-down (desktop)
    marquee.addEventListener("mouseenter", () =>
      tweenRef.current.timeScale(0.4)
    );
    marquee.addEventListener("mouseleave", () =>
      tweenRef.current.timeScale(1)
    );

    // resize safety
    const onResize = () => tweenRef.current.duration(getDuration());
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tweenRef.current.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-20 sm:py-28 rounded-3xl"
    >
      {/* enterprise divider */}
      <div className="absolute top-6 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute bottom-6 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* marquee */}
      <div
        ref={marqueeRef}
        className="w-[200%] flex marquee-track select-none will-change-transform"
      >
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-16 sm:gap-28 w-full px-6 sm:px-14"
          >
            <h1  style={{ color: 'var(--text-main)' }} className="text-[14vw] sm:text-[9vw] md:text-[7vw] font-extrabold uppercase text-white whitespace-nowrap tracking-tight">
              {primaryText}
            </h1>

            <h1  style={{ color: 'var(--text-main)' }} className="text-[14vw] sm:text-[9vw] md:text-[7vw] font-extrabold uppercase text-white whitespace-nowrap tracking-tight opacity-80">
              {secondaryText}
            </h1>
          </div>
        ))}
      </div>

      {/* enterprise ambient glow */}
      <div className="pointer-events-none absolute -bottom-44 left-1/2 -translate-x-1/2 w-[320px] sm:w-[700px] h-[140px] sm:h-[260px] bg-indigo-500/20 blur-[200px] rounded-full" />
    </section>
  );
};

export default AssetVerseHero;
