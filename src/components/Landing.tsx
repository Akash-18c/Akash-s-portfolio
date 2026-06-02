import "./styles/Landing.css";

const Landing = () => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">

          {/* ── Left column: all text ── */}
          <div className="landing-left">
            <div className="landing-intro">
              <h2>Hello! I'm</h2>
              <h1>
                Akash
                <br />
                <span>Chakraborty</span>
              </h1>
            </div>
            <div className="landing-info">
              <div className="landing-role-badge">
                <span className="landing-role-dot" />
                <span className="landing-role-text">An Aspiring</span>
              </div>
              <div className="landing-flip-wrap">
                <div className="landing-flip-track">
                  <span className="landing-flip-word">AI Developer</span>
                  <span className="landing-flip-word">ML Engineer</span>
                  <span className="landing-flip-word">AI Developer</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: robot ── */}
          <div className="robot-wrapper">
            <img
              src="/images/robot-transparent.png"
              alt="Robot mascot"
              className="robot-img"
              draggable={false}
            />
            <div className="robot-glow" />
          </div>

        </div>
      </div>
    </>
  );
};

export default Landing;
