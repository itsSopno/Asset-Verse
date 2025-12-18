import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroParagraphGSAP = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const words = textRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: "power3.out"
      }
    );
  }, []);

  const text =
    "AssetVerse empowers modern businesses to take full control of their corporate assets with confidence and clarity. From real-time inventory tracking to smart employee assignment and secure approval workflows, AssetVerse eliminates chaos and brings transparency to every asset decision. Join forward-thinking companies that trust AssetVerse to reduce losses, boost productivity, and scale their operations with speed and security.";

  return (
    <p
      ref={textRef}
      className="text-lg md:text-xl text-gray-500 max-w-3xl leading-relaxed mt-6"
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="word inline-block mr-1">
          {word}
        </span>
      ))}
    </p>
  );
};

export default HeroParagraphGSAP;
