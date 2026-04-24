import { FaDownload } from "react-icons/fa";
import "./styles/About.css";

const stats = [
  { value: "2+",  label: "Years Exp." },
  { value: "15+", label: "Projects"   },
  { value: "8+",  label: "Clients"    },
];

const timeline = [
  {
    year: "2024 – Present",
    role: "Full Stack Developer",
    place: "Freelance",
    desc: "Building modern web applications for clients worldwide using React, Next.js and Node.js.",
  },
  {
    year: "2023 – 2024",
    role: "Frontend Developer",
    place: "",
    desc: "Developed responsive UIs and design systems, improving performance by 40%.",
  },
  {
    year: "2023 - 2027",
    role: "BCA - Computer Applications",
    place: "Adamas University",
    desc: "Graduated with honours. Focused on software engineering and data structures.",
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
            I'm a passionate Full Stack Developer who loves crafting beautiful,
            performant web experiences. I bridge the gap between design and
            engineering — turning ideas into polished digital products with clean
            code and thoughtful UX.
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

          {/* Resume button */}
          <a
            href="/resume.pdf"
            download="Akash_Chakraborty_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="about-resume-btn"
            data-cursor="disable"
          >
            <FaDownload />
            Download Resume
          </a>

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
