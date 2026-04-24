import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./styles/IntroAnimation.css";

const greetings = [
  "Hello",
  "নমস্কার",   // Bengali
  "नमस्ते",    // Hindi
  "Hola",
  "Bonjour",
  "Ciao",
  "Olá",
  "Здравствуйте",
  "Merhaba",
  "Γειά",
  "Hej",
  "Hallo",
];

interface Props {
  onFinish: () => void;
}

const IntroAnimation = ({ onFinish }: Props) => {
  const [index, setIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    const el = greetingRef.current;
    if (!el) return;

    // animate each greeting in
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.13, ease: "power2.out" }
    );

    if (index < greetings.length - 1) {
      const t = setTimeout(() => setIndex(i => i + 1), 190);
      return () => clearTimeout(t);
    } else {
      // last greeting — pause then wipe out
      const t = setTimeout(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        gsap.timeline({ onComplete: () => onFinishRef.current() })
          .to(overlay, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.0,
            ease: "power4.inOut",
          })
          .to(el, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power2.in",
          }, "<");
      }, 380);
      return () => clearTimeout(t);
    }
  }, [index]);

  return (
    <div ref={overlayRef} className="intro-overlay">
      <div className="intro-logo">
        <img src="/images/logo-transparent.png" alt="AC" className="intro-logo-img" />
        <span className="intro-logo-name">Akash</span>
      </div>
      <h1 ref={greetingRef} className="intro-greeting">
        {greetings[index]}
      </h1>
    </div>
  );
};

export default IntroAnimation;
