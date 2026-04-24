import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import OverlayMenu from "./OverlayMenu";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
// gsap.config({ trialWarn: false });
export let smoother: ScrollSmoother;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    document.querySelectorAll(".header ul a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const el = e.currentTarget as HTMLAnchorElement;
          smoother.scrollTo(el.getAttribute("data-href"), true, "top top");
        }
      });
    });

    window.addEventListener("resize", () => ScrollSmoother.refresh(true));
  }, []);

  return (
    <>
      <div className="header">
        {/* Logo */}
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src="/images/logo-transparent.png" alt="AC" className="navbar-logo" />
          <span className="navbar-name">Akash</span>
        </a>

        {/* Centre email — desktop only */}
        <a href="mailto:chakrabortyakash067@gmail.com" className="navbar-connect" data-cursor="disable">
          chakrabortyakash067@gmail.com
        </a>

        {/* Desktop pill: links + hamburger */}
        <ul className="nav-pill">
          <li><a data-href="#about"   href="#about"><HoverLinks text="ABOUT" /></a></li>
          <li><a data-href="#work"    href="#work"><HoverLinks text="WORK" /></a></li>
          <li><a data-href="#contact" href="#contact"><HoverLinks text="CONTACT" /></a></li>
          <li className="nav-divider" aria-hidden="true" />
          <li>
            <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" data-cursor="disable">
              <span /><span /><span />
            </button>
          </li>
        </ul>

        {/* Mobile: hamburger only */}
        <button
          className={`nav-hamburger nav-hamburger-mobile${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          data-cursor="disable"
        >
          <span /><span /><span />
        </button>
      </div>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;
