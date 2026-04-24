import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useCallback, useRef } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    name: "AI Travel Agent",
    category: "Webelopment",
    tools: "React, TypeScript, Three.js, ML Models",
    image: "/images/Ai travel agent .jpeg",
    live: "",
    github: "https://github.com/Akash-18c/Ai-travel-agent.git",
  },
  {
    num: "02",
    name: "Momo Website ",
    category: "Full Stack",
    tools: "Next.js, Node.js, MongoDB, Tailwind",
    image: "/images/momo shop web .jpeg",
    live: "https://mdb-restrocafe.onrender.com",
    github: "https://github.com/Akash-18c/Momo-shop-web.git",
  },
  {
    num: "03",
    name: "Dashboard UI",
    category: "Frontend",
    tools: "React, TypeScript, Recharts",
    image: "/images/robot-transparent.png",
    live: "",
    github: "",
  },
  {
    num: "04",
    name: "REST API Service",
    category: "Backend",
    tools: "Node.js, Express, PostgreSQL, Docker",
    image: "/images/robot-transparent.png",
    live: "",
    github: "",
  },
  {
    num: "05",
    name: "Mobile UI Kit",
    category: "UI Design",
    tools: "Figma, Prototyping, Design System",
    image: "/images/robot-transparent.png",
    live: "",
    github: "",
  },
  {
    num: "06",
    name: "AI Chat App",
    category: "Full Stack",
    tools: "Python, FastAPI, React, WebSocket",
    image: "/images/robot-transparent.png",
    live: "",
    github: "",
  },
];

const Work = () => {
  const [current, setCurrent] = useState(0);
  const total = projects.length;
  const stRef = useRef<ScrollTrigger | null>(null);
  const translateXRef = useRef(0);

  const goTo = useCallback((idx: number) => {
    const next = (idx + total) % total;
    setCurrent(next);
    // On desktop: scroll the page so GSAP pin moves to that card
    if (stRef.current && translateXRef.current > 0) {
      const progress = next / (total - 1);
      const scrollTarget = stRef.current.start + progress * (stRef.current.end - stRef.current.start);
      window.scrollTo({ top: scrollTarget, behavior: "smooth" });
    }
  }, [total]);

  // GSAP horizontal scroll (desktop only)
  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const init = () => {
      if (window.innerWidth < 1025) return;

      ctx = gsap.context(() => {
        const boxes = document.querySelectorAll(".work-box");
        const section = document.querySelector(".work-section") as HTMLElement;
        const flex = document.querySelector(".work-flex") as HTMLElement;
        if (!boxes.length || !section || !flex) return;

        const boxWidth = (boxes[0] as HTMLElement).offsetWidth;
        const totalWidth = boxWidth * boxes.length;
        const viewWidth = section.offsetWidth;
        const translateX = totalWidth - viewWidth;
        translateXRef.current = translateX;

        stRef.current = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          id: "work",
          onUpdate: (self) => {
            gsap.set(flex, { x: -translateX * self.progress });
            // sync active card
            const idx = Math.round(self.progress * (total - 1));
            setCurrent(idx);
          },
        });
      });
    };

    const t = setTimeout(init, 100);

    return () => {
      clearTimeout(t);
      ScrollTrigger.getById("work")?.kill();
      ctx?.revert();
      stRef.current = null;
    };
  }, [total]);

  return (
    <div className="work-section" id="work">
      <div className="work-container">

        {/* Header row */}
        <div className="work-topbar">
          <div className="work-header">
            <p className="work-label">Portfolio</p>
            <h2 className="work-title">My <span>Work</span></h2>
          </div>

          <div className="work-controls">
            <span className="work-counter">
              <span className="work-counter-cur">{String(current + 1).padStart(2, "0")}</span>
              <span className="work-counter-sep"> / </span>
              <span className="work-counter-tot">{String(total).padStart(2, "0")}</span>
            </span>
            <button className="work-ctrl-btn" onClick={() => goTo(current - 1)} aria-label="Previous" data-cursor="disable">
              <MdArrowBack />
            </button>
            <button className="work-ctrl-btn" onClick={() => goTo(current + 1)} aria-label="Next" data-cursor="disable">
              <MdArrowForward />
            </button>
          </div>
        </div>

        {/* Work rows */}
        <div className="work-flex">
          {projects.map((p, i) => (
            <div
              className={`work-box${i === current ? " work-box--active" : ""}`}
              key={i}
              onClick={() => setCurrent(i)}
            >
              <div className="work-info">
                <div className="work-title-row">
                  <h3 className="work-num">{p.num}</h3>
                  <div className="work-name-wrap">
                    <h4 className="work-name">{p.name}</h4>
                    <p className="work-category">{p.category}</p>
                  </div>
                </div>
                <div className="work-meta">
                  <div className="work-tools-row">
                    <span className="work-tools-label">Stack</span>
                    <p className="work-tools">{p.tools}</p>
                  </div>
                  <div className="work-actions">
                    <a
                      href={p.live || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn work-btn--live"
                      data-cursor="disable"
                      onClick={e => !p.live && e.preventDefault()}
                    >
                      <FaExternalLinkAlt /> Live
                    </a>
                    <a
                      href={p.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn work-btn--github"
                      data-cursor="disable"
                      onClick={e => !p.github && e.preventDefault()}
                    >
                      <FaGithub /> Code
                    </a>
                  </div>
                </div>
              </div>
              <WorkImage image={p.image} alt={p.name} link={p.live || undefined} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Work;
