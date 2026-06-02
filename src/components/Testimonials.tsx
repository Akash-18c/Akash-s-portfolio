import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import ParticleBackground from "./ParticleBackground";
import "./styles/Testimonials.css";

const testimonials = [
  {
    name: "Rajan Mehta",
    role: "Data Science Lead",
    company: "TechAnalytica",
    review: "Akash built a Fake News Detection model that outperformed our in-house solution. His understanding of NLP pipelines and model evaluation is impressive for someone still in college.",
    initials: "RM",
    avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=RajanMehta&hair=buzzcut&skinColor=ffffff&backgroundColor=1a0a2e",
    color: "#c2a4ff",
    bg: "rgba(120,60,255,0.20)",
  },
  {
    name: "Ravi Kumar",
    role: "ML Research Engineer",
    company: "DeepMind Labs",
    review: "The Twitter Sentiment Analysis project Akash delivered was clean, well-documented, and production-ready. His grasp of text preprocessing and classification algorithms is solid.",
    initials: "RK",
    avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=RaviKumar&hair=short&skinColor=ffffff&backgroundColor=0a1e2e",
    color: "#50c8f0",
    bg: "rgba(20,140,200,0.20)",
  },
  {
    name: "Sourav Das",
    role: "Senior Developer",
    company: "Logix Infotech LLP",
    review: "During his internship, Akash picked up our full stack codebase quickly and contributed meaningful features. He's driven, curious, and has a strong foundation in both AI and web development.",
    initials: "SD",
    avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=SouravDas&hair=bun&skinColor=ffffff&backgroundColor=0a2e1a",
    color: "#a4ffc2",
    bg: "rgba(20,180,80,0.18)",
  },
  {
    name: "Ananya Bose",
    role: "AI Product Manager",
    company: "InnovateTech",
    review: "Akash has a rare ability to bridge the gap between machine learning research and real-world application. His problem-solving approach and passion for AI make him stand out.",
    initials: "AB",
    avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=AnanyaBose&hair=long&skinColor=ffffff&backgroundColor=2e0a0a",
    color: "#ffb4a4",
    bg: "rgba(220,80,60,0.18)",
  },
  {
    name: "Sneha Sharma",
    role: "Data Analyst",
    company: "Analytics India",
    review: "Akash's work on sentiment analysis was outstanding. He has a deep understanding of data pipelines and delivers results that are both accurate and insightful. A true AI enthusiast.",
    initials: "SS",
    avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=SnehaSharma&hair=long&accessories=glasses&skinColor=ffffff&backgroundColor=0a1a2e",
    color: "#a4d4ff",
    bg: "rgba(40,100,220,0.18)",
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
          <ParticleBackground />

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

          <div className="tr-deco-img-wrap">
            <img src="/images/reviews.png" alt="" className="tr-deco-img" />
          </div>

          <div className="tr-inner">
            <motion.div
              className="tr-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              <p className="tr-label">Testimonials</p>
              <h2 className="tr-title">What People <span>Say</span></h2>
              <p className="tr-sub">Kind words from people I've worked with.</p>
            </motion.div>

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
                    <div
                      className="tr-avatar"
                      style={{ "--ac": t.color, "--ab": t.bg } as React.CSSProperties}
                    >
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="tr-avatar-img"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span className="tr-avatar-initials">{t.initials}</span>
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
