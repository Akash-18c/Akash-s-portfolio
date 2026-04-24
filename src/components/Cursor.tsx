import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove, { passive: true });

    const loop = () => {
      cursorPos.x += (mousePos.x - cursorPos.x) * 0.1;
      cursorPos.y += (mousePos.y - cursorPos.y) * 0.1;
      // center the 80px blob on the cursor
      cursor.style.transform = `translate(${cursorPos.x - 40}px, ${cursorPos.y - 40}px)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="cursor-blob" ref={cursorRef}>
      <div className="cursor-blob-inner" />
    </div>
  );
};

export default Cursor;
