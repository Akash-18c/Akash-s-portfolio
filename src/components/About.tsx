import { FaDownload, FaEye } from "react-icons/fa";
import "./styles/About.css";

const stats = [
  { value: "4th", label: "Year BCA"   },
  { value: "10+", label: "Projects"   },
  { value: "AI",  label: "Focused"    },
];

const timeline = [
  {
    year: "2023 – 2027",
    role: "BCA - Computer Applications",
    place: "Adamas University",
    desc: "Currently in final year, focused on AI, Machine Learning, and Data Science.",
  },
  {
    year: "Jul – Aug 2025",
    role: "Full Stack Intern",
    place: "Logix Infotech LLP, Noida",
    desc: "1-month internship building and integrating full stack web features using modern technologies.",
  },
  {
    year: "2024 – Present",
    role: "AI & ML Projects",
    place: "Self-driven",
    desc: "Built Fake News Detection and Twitter Sentiment Analysis using Python, NLP, and machine learning.",
  },
];

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-grid">

        {/* ── LEFT: Photo column ── */}
        <div className="about-photo-col">
          <div className="about-photo-wrap">
            {/* decorative corner brackets */}
            <span className="ab-corner ab-corner-tl" />
            <span className="ab-corner ab-corner-tr" />
            <span className="ab-corner ab-corner-bl" />
            <span className="ab-corner ab-corner-br" />

            <img
              src="/images/Akash img .jpeg"
              alt="Akash Chakraborty"
              className="about-photo"
            />

            {/* floating name badge */}
            <div className="about-name-badge">
              <span className="about-name-badge-dot" />
              <span>Akash Chakraborty</span>
            </div>
          </div>


        </div>

        {/* ── RIGHT: Content column ── */}
        <div className="about-content-col">

          {/* Label */}
          <p className="about-label title">About Me</p>

          {/* Name */}
          <h2 className="about-name">
            Akash<br />
            <span className="about-name-accent">Chakraborty</span>
          </h2>

          {/* Bio */}
          <p className="about-bio para">
            BCA student passionate about Artificial Intelligence, Machine Learning, and Data Science.
            Experienced in building projects like Fake News Detection and Twitter Sentiment Analysis
            using Python and machine learning tools. Skilled in data analysis, NLP, and problem-solving,
            with a strong interest in creating intelligent solutions for real-world challenges. Currently
            exploring advanced AI technologies and seeking opportunities to grow as an AI and Software Developer.
          </p>

          {/* Stats */}
          <div className="about-stats">
            {stats.map(({ value, label }) => (
              <div key={label} className="about-stat-card">
                <span className="about-stat-value">{value}</span>
                <span className="about-stat-label">{label}</span>
              </div>
            ))}
          </div>

          {/* Resume buttons */}
          <div className="about-resume-btns">
            <a
              href="/Akash_Chakraborty_Resume.pdf"
              download="Akash_Chakraborty_Resume.pdf"
              className="about-resume-btn"
              data-cursor="disable"
            >
              <FaDownload />
              Download
            </a>
            <a
              href="/Akash_Chakraborty_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="about-resume-btn about-resume-btn--view"
              data-cursor="disable"
            >
              <FaEye />
              View
            </a>
          </div>

          {/* Timeline */}
          <div className="about-timeline">
            <p className="about-timeline-label">Experience &amp; Education</p>
            {timeline.map(({ year, role, place, desc }, i) => (
              <div key={i} className="about-tl-item">
                <div className="about-tl-dot" />
                <div className="about-tl-body">
                  <span className="about-tl-year">{year}</span>
                  <p className="about-tl-role">{role} <span className="about-tl-place">@ {place}</span></p>
                  <p className="about-tl-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
