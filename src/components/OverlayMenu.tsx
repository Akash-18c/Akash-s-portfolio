import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { smoother } from "./Navbar";
import TestimonialsPage from "./Testimonials";

const links = [
  { label: "About",   href: "#about",   num: "01" },
  { label: "Work",    href: "#work",    num: "02" },
  { label: "Skills",  href: "#skills",  num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

type Props = { isOpen: boolean; onClose: () => void };

const OverlayMenu = ({ isOpen, onClose }: Props) => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "calc(100% - 30px) 30px" : "calc(100% - 52px) 36px";

  const handleClick = (href: string) => {
    onClose();
    setTimeout(() => {
      if (smoother) smoother.paused(false);
      if (window.innerWidth > 1024 && smoother) {
        smoother.scrollTo(href, true, "top top");
      } else {
        const el = document.querySelector(href) as HTMLElement;
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, 700);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overlay-menu"
            initial={{ clipPath: `circle(0px at ${origin})` }}
            animate={{ clipPath: `circle(200% at ${origin})` }}
            exit={{ clipPath: `circle(0px at ${origin})` }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* close button */}
            <motion.button
              className="overlay-close"
              onClick={onClose}
              aria-label="Close menu"
              initial={{ opacity: 0, scale: 0.3, rotate: -60 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotate: 60 }}
              transition={{ delay: 0.38, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="close-x" />
            </motion.button>

            {/* content */}
            <div className="overlay-inner">
              <nav className="overlay-nav">
                <motion.p
                  className="overlay-section-label"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.22, duration: 0.4 }}
                >
                  Navigation
                </motion.p>

                <ul className="overlay-links">
                  {links.map(({ label, href, num }, i) => (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, y: 36, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 18, scale: 0.98 }}
                      transition={{ delay: 0.28 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={href}
                        onClick={() => handleClick(href)}
                        data-cursor="disable"
                        className="overlay-card"
                      >
                        <span className="overlay-card-glow" />
                        <span className="overlay-card-sheen" />
                        <span className="overlay-card-num">{num}</span>
                        <span className="overlay-card-label">{label}</span>
                        <span className="overlay-card-arrow">↗</span>
                      </a>
                    </motion.li>
                  ))}

                  {/* Reviews — 05 */}
                  <motion.li
                    initial={{ opacity: 0, y: 36, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.98 }}
                    transition={{ delay: 0.28 + links.length * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => { onClose(); setTimeout(() => setReviewsOpen(true), 400); }}
                      data-cursor="disable"
                      className="overlay-card overlay-card-btn"
                    >
                      <span className="overlay-card-glow" />
                      <span className="overlay-card-sheen" />
                      <span className="overlay-card-num">05</span>
                      <span className="overlay-card-label">Reviews</span>
                      <span className="overlay-card-arrow">↗</span>
                    </button>
                  </motion.li>
                </ul>
              </nav>

              {/* deco column */}
              <motion.div
                className="overlay-deco"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{ delay: 0.42, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="overlay-deco-line" />
                <span className="overlay-deco-label">Portfolio · 2026</span>
              </motion.div>
            </div>

            {/* footer */}
            <motion.div
              className="overlay-footer"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.62, duration: 0.4 }}
            >
              <span>Akash Chakraborty</span>
              <span className="overlay-footer-dot" />
              <span>AI & ML Developer</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews full-page */}
      <TestimonialsPage isOpen={reviewsOpen} onClose={() => setReviewsOpen(false)} />
    </>
  );
};

export default OverlayMenu;
