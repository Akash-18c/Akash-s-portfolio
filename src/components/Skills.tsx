import { useEffect, useRef, useState } from "react";
import { FaJava } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import {
  SiPython, SiTensorflow, SiPytorch, SiKeras, SiScikitlearn,
  SiNumpy, SiPandas, SiOpencv, SiJupyter, SiStreamlit,
  SiFlask, SiFastapi, SiMysql, SiPostgresql, SiMongodb,
  SiGit, SiGithub, SiDocker, SiLinux, SiPlotly, SiAnaconda,
  SiReact, SiNextdotjs, SiTypescript,
} from "react-icons/si";
import "./styles/Skills.css";

const skills = [
  { icon: <SiPython />,       name: "Python",        category: "Language"  },
  { icon: <FaJava />,         name: "Java",          category: "Language"  },
  { icon: <SiTypescript />,   name: "TypeScript",    category: "Language"  },
  { icon: <SiTensorflow />,   name: "TensorFlow",    category: "AI / ML"   },
  { icon: <SiPytorch />,      name: "PyTorch",       category: "AI / ML"   },
  { icon: <SiKeras />,        name: "Keras",         category: "AI / ML"   },
  { icon: <SiScikitlearn />,  name: "Scikit-learn",  category: "AI / ML"   },
  { icon: <SiOpencv />,       name: "OpenCV",        category: "AI / ML"   },
  { icon: <SiNumpy />,        name: "NumPy",         category: "Data"      },
  { icon: <SiPandas />,       name: "Pandas",        category: "Data"      },
  { icon: <SiPlotly />,       name: "Plotly",        category: "Data"      },
  { icon: <SiJupyter />,      name: "Jupyter",       category: "Tools"     },
  { icon: <SiAnaconda />,     name: "Anaconda",      category: "Tools"     },
  { icon: <SiStreamlit />,    name: "Streamlit",     category: "Tools"     },
  { icon: <SiFlask />,        name: "Flask",         category: "Backend"   },
  { icon: <SiFastapi />,      name: "FastAPI",       category: "Backend"   },
  { icon: <SiReact />,        name: "React",         category: "Frontend"  },
  { icon: <SiNextdotjs />,    name: "Next.js",       category: "Frontend"  },
  { icon: <SiMysql />,        name: "MySQL",         category: "Database"  },
  { icon: <SiPostgresql />,   name: "PostgreSQL",    category: "Database"  },
  { icon: <SiMongodb />,      name: "MongoDB",       category: "Database"  },
  { icon: <SiGit />,          name: "Git",           category: "DevOps"    },
  { icon: <SiGithub />,       name: "GitHub",        category: "DevOps"    },
  { icon: <SiDocker />,       name: "Docker",        category: "DevOps"    },
  { icon: <SiLinux />,        name: "Linux",         category: "DevOps"    },
  { icon: <VscCode />,        name: "VS Code",       category: "Tools"     },
];

const repeated = [...skills, ...skills];

const Skills = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef(-1);
  const xRef = useRef(0);
  const lastRef = useRef(performance.now());
  const rafRef = useRef<number>(0);
  const touchYRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => { dirRef.current = e.deltaY > 0 ? -1 : 1; };
    const onTouchStart = (e: TouchEvent) => { touchYRef.current = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (touchYRef.current == null) return;
      dirRef.current = e.touches[0].clientY - touchYRef.current > 0 ? 1 : -1;
      touchYRef.current = e.touches[0].clientY;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useEffect(() => {
    const SPEED = 70;
    const tick = (now: number) => {
      if (!paused) {
        const dt = (now - lastRef.current) / 1000;
        const loop = (trackRef.current?.scrollWidth ?? 0) / 2;
        if (loop) {
          xRef.current += SPEED * dirRef.current * dt;
          if (xRef.current <= -loop) xRef.current += loop;
          if (xRef.current >= 0) xRef.current -= loop;
        }
        if (trackRef.current)
          trackRef.current.style.transform = `translateX(${xRef.current}px)`;
      }
      lastRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  return (
    <section className="skills-section" id="skills">
      <div className="skills-header">
        <h2 className="title skills-title">
          SK<span className="skills-accent">ILL</span>S
        </h2>
        <p className="skills-sub">Skillset &amp; Tools</p>
      </div>

      <div className="skills-strip-wrap">
        <div className="skills-fade skills-fade-left" />
        <div className="skills-fade skills-fade-right" />

        <div
          ref={trackRef}
          className="skills-track"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {repeated.map((s, i) => (
            <div key={i} className="skill-card">
              <div className="skill-card-glow" />
              <span className="skill-card-icon">{s.icon}</span>
              <span className="skill-card-name">{s.name}</span>
              <span className="skill-card-tag">{s.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
