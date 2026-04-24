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
              <h3>A Creative</h3>
              <h2 className="landing-info-h2">
                <div className="landing-h2-1">Designer</div>
                <div className="landing-h2-2">Developer</div>
              </h2>
              <h2>
                <div className="landing-h2-info">Developer</div>
                <div className="landing-h2-info-1">Designer</div>
              </h2>
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
