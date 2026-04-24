import { useEffect } from "react";
import About from "./About";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import Skills from "./Skills";
import setSplitText from "./utils/splitText";
import ParticleBackground from "./ParticleBackground";

const MainContainer = () => {
  useEffect(() => {
    const resizeHandler = () => setSplitText();
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="container-main">
      <ParticleBackground />
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Skills />
            <Work />
            <Contact />
          </div>
          <footer className="site-footer">
            <p>© {new Date().getFullYear()} Akash Chakraborty. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
