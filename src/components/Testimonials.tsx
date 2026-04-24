import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import ParticleBackground from "./ParticleBackground";
import "./styles/Testimonials.css";

const testimonials = [
  {
    name: "Yash Sahu",
    role: "Software Engineer",
    company: "HCL Technologies",
    review: "Akash is a visionary developer. His attention to detail and creativity blew us away. Our project was a massive success because of him.",
    initials: "YS",
    color: "#c2a4ff",
  },
  {
    name: "Heather Forster",
    role: "UI/UX Designer",
    company: "PixelWorks",
    review: "Working with Akash was an absolute pleasure. He brings design and code together like magic. Highly recommend him!",
    initials: "HF",
    color: "#50c8f0",
  },
  {
    name: "Amy Jacobson",
    role: "Tech Manager",
    company: "CodeEmpire",
    review: "From concept to execution, Akash handled everything flawlessly. His work ethic and innovation are truly unmatched.",
    initials: "AJ",
    color: "#a4ffc2",
  },
  {
    name: "Carry Smith",
    role: "CTO",
    company: "Innovate Labs",
    review: "Akash transformed our outdated platform into something modern and powerful. His skills are world-class.",
    initials: "CS",
    color: "#ffb4a4",
  },
];

type Props = { isOpen: boolean; onClose: () => void };

const TestimonialsPage = ({ isOpen, onClose }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="tr-page"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* particle background — same as main site */}
          <ParticleBackground />

          {/* close button */}
          <motion.button
            className="overlay-close"
            onClick={onClose}
            aria-label="Close reviews"
            initial={{ opacity: 0, scale: 0.3, rotate: -60 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.3, rotate: 60 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            data-cursor="disable"
          >
            <span className="close-x" />
          </motion.button>

          {/* decorative image — bottom right */}
          <div className="tr-deco-img-wrap">
            <img src="/images/reviews.png" alt="" className="tr-deco-img" />
          </div>

          {/* page content */}
          <div className="tr-inner">

            {/* header — left aligned */}
            <motion.div
              className="tr-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              <p className="tr-label">Testimonials</p>
              <h2 className="tr-title">
                What People <span>Say</span>
              </h2>
              <p className="tr-sub">Kind words from people I've worked with.</p>
            </motion.div>

            {/* cards grid */}
            <div className="tr-grid">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="tr-card"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.2 + i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="tr-card-glow" style={{ "--gc": t.color } as React.CSSProperties} />
                  <span className="tr-quote">"</span>
                  <p className="tr-review">"{t.review}"</p>
                  <div className="tr-divider" />
                  <div className="tr-person">
                    <div className="tr-avatar" style={{ "--ac": t.color } as React.CSSProperties}>
                      <span>{t.initials}</span>
                    </div>
                    <div className="tr-info">
                      <h4 className="tr-name">{t.name}</h4>
                      <p className="tr-role">{t.role}</p>
                      <p className="tr-company">@ {t.company}</p>
                    </div>
                  </div>
                  <span className="tc tc-tl" /><span className="tc tc-tr" />
                  <span className="tc tc-bl" /><span className="tc tc-br" />
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TestimonialsPage;
