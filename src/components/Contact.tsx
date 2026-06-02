import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import { MdClose, MdSend } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import "./styles/Contact.css";
import { smoother } from "./Navbar";

const services = [
  "Web Development",
  "UI / UX Design",
  "Mobile App Development",
  "Backend Development",
  "SEO Optimization",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [senderName, setSenderName] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Pause ScrollSmoother when user focuses any input — prevents mobile redirect
  useEffect(() => {
    const pause = () => { if (smoother) smoother.paused(true); };
    const resume = () => { if (smoother) smoother.paused(false); };
    const form = formRef.current;
    if (!form) return;
    form.addEventListener("focusin", pause);
    form.addEventListener("focusout", resume);
    return () => {
      form.removeEventListener("focusin", pause);
      form.removeEventListener("focusout", resume);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");

    emailjs.send(
      "service_z52i175",
      "template_iucpyhv",
      {
        from_name:  form.name,
        from_email: form.email,
        service:    form.service || "Not specified",
        message:    form.message,
      },
      { publicKey: "qaiUz3cywpKR-o02V" }
    ).then(() => {
      setSenderName(form.name);
      setForm({ name: "", email: "", service: "", message: "" });
      setStatus("success");
    }).catch(() => {
      setStatus("error");
    });
  };

  const closeCard = () => setStatus("idle");

  // Portal renders overlay directly into document.body — bypasses ScrollSmoother
  const overlay = status === "success" || status === "error"
    ? createPortal(
        <div className="cf-overlay" onClick={closeCard}>
          <div className="cf-card" onClick={(e) => e.stopPropagation()}>
            <button className="cf-card-close" onClick={closeCard}>
              <MdClose />
            </button>

            {status === "success" ? (
              <>
                <div className="cf-card-icon cf-card-icon--success">
                  <svg className="cf-checkmark" viewBox="0 0 52 52">
                    <circle className="cf-checkmark-circle" cx="26" cy="26" r="25" />
                    <path className="cf-checkmark-check" d="M14 27 l8 8 l16 -16" />
                  </svg>
                </div>
                <p className="cf-card-sub">Message Received</p>
                <h3>Thank You!</h3>
                <div className="cf-card-divider" />
                <p>
                  Your message has been sent successfully.<br />
                  I'll get back to you shortly, <strong>{senderName}</strong>.
                </p>
                <button className="cf-card-btn" onClick={closeCard}>Awesome</button>
              </>
            ) : (
              <>
                <div className="cf-card-icon cf-card-icon--error">
                  <svg className="cf-error-x" viewBox="0 0 52 52">
                    <path d="M16 16 l20 20 M36 16 l-20 20" />
                  </svg>
                </div>
                <p className="cf-card-sub">Send Failed</p>
                <h3>Something went wrong</h3>
                <div className="cf-card-divider" />
                <p>
                  Please try again or reach me at<br />
                  <strong>chakrabortyakash067@gmail.com</strong>
                </p>
                <button className="cf-card-btn cf-card-btn--error" onClick={closeCard}>
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">

        {/* ── Left ── */}
        <div className="contact-left">
          <div className="contact-img-wrap">
            <img
              src="/images/contact-transparent.png"
              alt="Astronaut"
              className="contact-astronaut"
              draggable={false}
            />
            <div className="contact-img-glow" />
          </div>
          <div className="contact-info">
            <p className="contact-info-label">Email</p>
            <a href="mailto:chakrabortyakash067@gmail.com" className="contact-info-value">
              chakrabortyakash067@gmail.com
            </a>
            <p className="contact-info-label" style={{ marginTop: 20 }}>Find me on</p>
            <div className="contact-socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaXTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="contact-form-card">
          <p className="contact-eyebrow">Get in touch</p>
          <h2 className="contact-title">Let's Work<br /><span>Together</span></h2>

          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="cf-row">
              <div className="cf-field">
                <label>Name <span className="cf-req">*</span></label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="off"
                />
              </div>
              <div className="cf-field">
                <label>Email <span className="cf-req">*</span></label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="cf-field">
              <label>
                Service Needed
                <span className="cf-optional"> — optional</span>
              </label>
              <select name="service" value={form.service} onChange={handleChange}>
                <option value="">Select a service (optional)</option>
                {services.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="cf-field">
              <label>Message <span className="cf-req">*</span></label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                rows={5}
              />
            </div>

            <button
              type="submit"
              className={`cf-submit ${status === "sending" ? "cf-sending" : ""}`}
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <span className="cf-petal-spinner">
                    <span /><span /><span /><span /><span />
                  </span>
                  <span className="cf-sending-text">Sending</span>
                </>
              ) : (
                <><MdSend /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>

      {overlay}
    </section>
  );
};

export default Contact;
