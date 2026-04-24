import "./styles/Career.css";

const experiences = [
  {
    year: "2024 – Present",
    role: "Full Stack Developer",
    company: "Freelance",
    desc: "Building modern web applications for clients worldwide using React, Next.js and Node.js.",
    type: "work",
  },
  {
    year: "2023 – 2024",
    role: "Frontend Developer",
    company: "Tech Startup",
    desc: "Developed responsive UIs and design systems, improving performance by 40%.",
    type: "work",
  },
];

const education = [
  {
    year: "2021 – 2024",
    role: "B.Tech — Computer Science",
    company: "University",
    desc: "Graduated with honours. Focused on software engineering and data structures.",
    type: "edu",
  },
  {
    year: "2019 – 2021",
    role: "Higher Secondary (Science)",
    company: "School",
    desc: "Completed with distinction in Physics, Chemistry, Mathematics and Computer Science.",
    type: "edu",
  },
];

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-columns">
          {/* Experience */}
          <div className="career-col">
            <p className="career-col-label">Work Experience</p>
            <div className="career-items">
              {experiences.map((item, i) => (
                <div key={i} className="career-card">
                  <div className="career-card-top">
                    <div>
                      <h4>{item.role}</h4>
                      <h5>{item.company}</h5>
                    </div>
                    <span className="career-year">{item.year}</span>
                  </div>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="career-col">
            <p className="career-col-label">Education</p>
            <div className="career-items">
              {education.map((item, i) => (
                <div key={i} className="career-card career-card--edu">
                  <div className="career-card-top">
                    <div>
                      <h4>{item.role}</h4>
                      <h5>{item.company}</h5>
                    </div>
                    <span className="career-year">{item.year}</span>
                  </div>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
