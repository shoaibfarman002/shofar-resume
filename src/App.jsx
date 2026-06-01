import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Download,
  Eye,
  FileCheck2,
  Github,
  Instagram,
  Laptop,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Palette,
  Phone,
  Rocket,
  Save,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  TabletSmartphone,
  UserRound,
  WandSparkles,
  X
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const owner = {
  name: "Shoaib Farman",
  role: "Frontend Developer",
  email: "imraankhan23180@gmail.com",
  instagram: "https://instagram.com/i.shoaib.002",
  linkedin: "https://www.linkedin.com/in/shoaib-farman-4b2b27402/",
  github: "https://github.com/shoaibfarman002",
  whatsapp: "https://wa.me/910000000000",
  phone: "tel:+910000000000"
};

const stats = [
  { value: 50000, suffix: "+", label: "Resumes Created" },
  { value: 10000, suffix: "+", label: "Active Users" },
  { value: 100, suffix: "+", label: "Resume Templates" },
  { value: 98, suffix: "%", label: "User Satisfaction" }
];

const features = [
  {
    icon: ShieldCheck,
    title: "ATS Friendly Resume",
    text: "Structured sections and keyword-ready formatting for modern hiring systems."
  },
  {
    icon: Download,
    title: "One Click PDF Download",
    text: "Export a polished resume PDF instantly from your live preview."
  },
  {
    icon: Save,
    title: "Auto Save Resume",
    text: "Your resume draft is stored locally as you type so momentum stays intact."
  },
  {
    icon: Moon,
    title: "Dark Mode",
    text: "A saved dark/light preference with a refined, low-glare interface."
  },
  {
    icon: Eye,
    title: "Live Preview",
    text: "Every form update is mirrored on the resume in real time."
  },
  {
    icon: TabletSmartphone,
    title: "Mobile Responsive",
    text: "Builder, templates, and contact flows adapt cleanly to every screen."
  },
  {
    icon: Share2,
    title: "Resume Sharing",
    text: "Dedicated sharing actions make it simple to send your resume link."
  },
  {
    icon: Palette,
    title: "Professional Templates",
    text: "Elegant layouts for freshers, developers, executives, and creatives."
  }
];

const categories = ["All", "Professional", "Modern", "Creative", "Developer", "Fresher", "Executive"];

const templates = [
  { name: "Boardroom Elite", category: "Professional", tone: "blue" },
  { name: "Atlas Modern", category: "Modern", tone: "cyan" },
  { name: "Studio Spark", category: "Creative", tone: "amber" },
  { name: "Code Matrix", category: "Developer", tone: "green" },
  { name: "Campus Launch", category: "Fresher", tone: "violet" },
  { name: "C-Suite Edge", category: "Executive", tone: "navy" },
  { name: "Minimal Prime", category: "Professional", tone: "slate" },
  { name: "Nova Grid", category: "Modern", tone: "rose" },
  { name: "Creator Flow", category: "Creative", tone: "orange" },
  { name: "Full Stack Pro", category: "Developer", tone: "indigo" },
  { name: "First Interview", category: "Fresher", tone: "teal" },
  { name: "Leadership One", category: "Executive", tone: "gold" }
];

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Product Designer",
    text: "Best Resume Builder I have ever used.",
    colors: ["#2563EB", "#F59E0B"]
  },
  {
    name: "Rahul Mehta",
    role: "Frontend Engineer",
    text: "The live preview helped me finish a professional resume in one sitting.",
    colors: ["#14B8A6", "#2563EB"]
  },
  {
    name: "Naina Sharma",
    role: "MBA Fresher",
    text: "Clean templates, smooth PDF export, and the design feels genuinely premium.",
    colors: ["#F59E0B", "#EF4444"]
  }
];

const faqs = [
  {
    q: "Is it free?",
    a: "Yes. The builder experience here is free to use and stores your draft in your browser."
  },
  {
    q: "Can I download PDF?",
    a: "Yes. Use the animated Download PDF button inside the live builder to export your resume."
  },
  {
    q: "Is ATS friendly?",
    a: "Yes. The resume preview uses clear headings, readable typography, and simple structure."
  },
  {
    q: "How many templates available?",
    a: "The showcase includes 12 modern templates across six professional categories."
  }
];

const initialResume = {
  name: "Shoaib Farman",
  title: "Frontend Developer",
  email: owner.email,
  phone: "+91 00000 00000",
  location: "India",
  summary:
    "Passionate Frontend Developer specializing in React.js, JavaScript, UI/UX Design and modern web experiences.",
  skills: "React.js, JavaScript, UI/UX Design, HTML, CSS, Vite",
  experience:
    "Frontend Developer - Built responsive dashboards, premium landing pages, and conversion-focused web applications with React.",
  education: "Bachelor's Degree - Computer Science",
  projects:
    "Top Resume Maker Pro - A premium ATS-friendly resume builder with live preview and PDF export."
};

function formatCount(value, suffix) {
  return `${new Intl.NumberFormat("en-US").format(value)}${suffix}`;
}

function avatarData(name, colors = ["#2563EB", "#F59E0B"]) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='${colors[0]}'/><stop offset='1' stop-color='${colors[1]}'/></linearGradient></defs><rect width='160' height='160' rx='44' fill='url(#g)'/><circle cx='122' cy='30' r='38' fill='white' opacity='.16'/><circle cx='32' cy='132' r='44' fill='white' opacity='.13'/><text x='80' y='93' text-anchor='middle' fill='white' font-family='Inter, Arial' font-size='46' font-weight='800'>${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("trmp-theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  const [templateFilter, setTemplateFilter] = useState("All");
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem("trmp-resume");
    return saved ? JSON.parse(saved) : initialResume;
  });
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [statsPlayed, setStatsPlayed] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [toast, setToast] = useState("");
  const [downloading, setDownloading] = useState(false);
  const resumeRef = useRef(null);
  const statsRef = useRef(null);
  const cursorRef = useRef(null);

  const filteredTemplates = useMemo(() => {
    if (templateFilter === "All") return templates;
    return templates.filter((template) => template.category === templateFilter);
  }, [templateFilter]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("trmp-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("trmp-resume", JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    const onMove = (event) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const slider = window.setInterval(() => {
      setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 4200);
    return () => window.clearInterval(slider);
  }, []);

  useEffect(() => {
    if (!statsRef.current || statsPlayed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStatsPlayed(true);
        stats.forEach((stat, index) => {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: stat.value,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => {
              setCounts((prev) => {
                const next = [...prev];
                next[index] = Math.round(counter.value);
                return next;
              });
            }
          });
        });
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsPlayed]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%"
            }
          }
        );
      });

      gsap.to(".parallax-float", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  function updateResume(field, value) {
    setResume((current) => ({ ...current, [field]: value }));
  }

  async function downloadPdf() {
    if (!resumeRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      pdf.addImage(imgData, "PNG", x, 0, imgWidth, imgHeight);
      pdf.save(`${resume.name || "top-resume-maker-pro"}-resume.pdf`);
      setToast("PDF downloaded successfully.");
    } catch (error) {
      setToast("PDF export failed. Please try again.");
    } finally {
      setDownloading(false);
      window.setTimeout(() => setToast(""), 3000);
    }
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    setToast("Message ready. Please send it from your email client.");
    window.setTimeout(() => setToast(""), 3000);
    event.currentTarget.reset();
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />
      <div className="site-shell">
        <Header
          theme={theme}
          setTheme={setTheme}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          scrollTo={scrollTo}
        />
        <main>
          <Hero scrollTo={scrollTo} />
          <StatsSection statsRef={statsRef} counts={counts} />
          <FeaturesSection />
          <TemplatesSection
            filteredTemplates={filteredTemplates}
            templateFilter={templateFilter}
            setTemplateFilter={setTemplateFilter}
            scrollTo={scrollTo}
          />
          <BuilderSection
            resume={resume}
            updateResume={updateResume}
            resumeRef={resumeRef}
            downloadPdf={downloadPdf}
            downloading={downloading}
          />
          <TestimonialsSection testimonialIndex={testimonialIndex} setTestimonialIndex={setTestimonialIndex} />
          <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
          <OwnerSection />
          <SocialSection />
          <ContactSection onSubmit={handleContactSubmit} />
        </main>
        <Footer scrollTo={scrollTo} />
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            role="status"
          >
            <Check size={18} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      <motion.div
        className="loading-mark"
        animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 1.1, repeat: Infinity }}
      >
        <FileCheck2 size={34} />
      </motion.div>
      <p>Top Resume Maker Pro</p>
      <span>Preparing premium workspace</span>
    </motion.div>
  );
}

function Header({ theme, setTheme, mobileOpen, setMobileOpen, scrollTo }) {
  const navItems = [
    ["Features", "features"],
    ["Templates", "templates"],
    ["Builder", "builder"],
    ["Owner", "owner"],
    ["Contact", "contact"]
  ];

  return (
    <header className="header">
      <button className="brand" onClick={() => scrollTo("home")} aria-label="Top Resume Maker Pro home">
        <span className="brand-icon">
          <FileCheck2 size={22} />
        </span>
        <span>
          <strong>Top Resume</strong>
          <small>Maker Pro</small>
        </span>
      </button>

      <nav className={`nav-links ${mobileOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <button key={id} onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <a href={owner.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
          <Github size={18} />
        </a>
        <button
          className="icon-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="menu-btn" onClick={() => setMobileOpen((open) => !open)} aria-label="Open menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Hero({ scrollTo }) {
  return (
    <section id="home" className="hero section-pad">
      <div className="hero-bg" aria-hidden="true">
        <span className="blob blob-one" />
        <span className="blob blob-two" />
        <span className="blob blob-three" />
      </div>
      <Particles />

      <div className="hero-content">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="eyebrow">
            <Sparkles size={16} />
            Premium ATS Resume Builder
          </span>
          <h1>Build a Professional Resume That Gets You Hired</h1>
          <p>Create ATS-friendly resumes with beautiful templates in minutes.</p>
          <div className="hero-actions">
            <button className="btn btn-primary magnetic" onClick={() => scrollTo("builder")}>
              Create Resume
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => scrollTo("templates")}>
              Explore Templates
              <Eye size={18} />
            </button>
          </div>
          <div className="trust-row" aria-label="Highlights">
            <span>
              <ShieldCheck size={16} />
              ATS ready
            </span>
            <span>
              <Download size={16} />
              PDF export
            </span>
            <span>
              <Save size={16} />
              Autosave
            </span>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual parallax-float"
          initial={{ opacity: 0, x: 42, rotateY: -12 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        >
          <div className="resume-3d">
            <ResumePreview resume={initialResume} compact />
          </div>
          <div className="floating-pill pill-one">
            <Award size={17} />
            98% satisfaction
          </div>
          <div className="floating-pill pill-two">
            <WandSparkles size={17} />
            Live editor
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 26 }).map((_, index) => (
        <span key={index} style={{ "--i": index }} />
      ))}
    </div>
  );
}

function StatsSection({ statsRef, counts }) {
  return (
    <section ref={statsRef} className="stats-section reveal" aria-label="Platform statistics">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card glass-card" key={stat.label}>
            <strong>{formatCount(counts[index], stat.suffix)}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="section-pad reveal">
      <SectionHeading
        eyebrow="Why professionals choose it"
        title="Everything needed for a polished resume"
        text="A fast, elegant builder shaped around real job-search workflows."
      />
      <div className="features-grid">
        {features.map(({ icon: Icon, title, text }, index) => (
          <motion.article
            className="feature-card glass-card"
            key={title}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            <span className="feature-icon">
              <Icon size={24} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function TemplatesSection({ filteredTemplates, templateFilter, setTemplateFilter, scrollTo }) {
  return (
    <section id="templates" className="section-pad reveal">
      <SectionHeading
        eyebrow="Resume templates showcase"
        title="12 premium templates for every career stage"
        text="Filter by category, preview the style, then jump straight into building."
      />
      <div className="filter-row" role="tablist" aria-label="Template categories">
        {categories.map((category) => (
          <button
            key={category}
            className={templateFilter === category ? "active" : ""}
            onClick={() => setTemplateFilter(category)}
            role="tab"
            aria-selected={templateFilter === category}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="templates-grid">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template) => (
            <motion.article
              layout
              className="template-card glass-card"
              key={template.name}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              whileHover={{ y: -8 }}
            >
              <TemplatePreview tone={template.tone} />
              <div>
                <span>{template.category}</span>
                <h3>{template.name}</h3>
              </div>
              <button className="btn btn-small" onClick={() => scrollTo("builder")}>
                Use Template
                <ArrowRight size={16} />
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function TemplatePreview({ tone }) {
  return (
    <div className={`template-preview tone-${tone}`} aria-label="Resume template preview">
      <div className="mini-head">
        <span />
        <div>
          <b />
          <i />
        </div>
      </div>
      <div className="mini-body">
        <aside>
          <span />
          <span />
          <span />
          <span />
        </aside>
        <main>
          <span />
          <span />
          <span />
          <span />
          <span />
        </main>
      </div>
    </div>
  );
}

function BuilderSection({ resume, updateResume, resumeRef, downloadPdf, downloading }) {
  const fields = [
    ["name", "Name", "text"],
    ["title", "Professional Title", "text"],
    ["email", "Email", "email"],
    ["phone", "Phone", "tel"],
    ["location", "Location", "text"]
  ];
  const textAreas = [
    ["summary", "Professional Summary"],
    ["skills", "Skills"],
    ["experience", "Experience"],
    ["education", "Education"],
    ["projects", "Projects"]
  ];

  return (
    <section id="builder" className="builder-section section-pad reveal">
      <SectionHeading
        eyebrow="Live resume builder"
        title="Edit on the left. Preview instantly on the right."
        text="Autosave is always on. Your browser keeps the latest draft locally."
      />
      <div className="builder-layout">
        <form className="builder-form glass-card" aria-label="Resume builder form">
          <div className="form-title">
            <span>
              <BriefcaseBusiness size={20} />
            </span>
            Resume Details
          </div>
          <div className="form-grid">
            {fields.map(([field, label, type]) => (
              <label key={field}>
                <span>{label}</span>
                <input
                  type={type}
                  value={resume[field]}
                  onChange={(event) => updateResume(field, event.target.value)}
                />
              </label>
            ))}
          </div>
          {textAreas.map(([field, label]) => (
            <label key={field}>
              <span>{label}</span>
              <textarea
                value={resume[field]}
                rows={field === "summary" ? 4 : 3}
                onChange={(event) => updateResume(field, event.target.value)}
              />
            </label>
          ))}
        </form>

        <div className="preview-panel">
          <div className="preview-toolbar glass-card">
            <span>
              <Eye size={18} />
              Live Preview
            </span>
            <button className="btn btn-primary download-btn" onClick={downloadPdf} disabled={downloading}>
              {downloading ? "Preparing..." : "Download PDF"}
              <Download size={18} />
            </button>
          </div>
          <div className="resume-stage">
            <ResumePreview refProp={resumeRef} resume={resume} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumePreview({ resume, compact = false, refProp }) {
  const skills = resume.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <article ref={refProp} className={`resume-preview ${compact ? "is-compact" : ""}`}>
      <header>
        <div className="resume-avatar">
          <img src={avatarData(resume.name || "TR", ["#2563EB", "#F59E0B"])} alt="" />
        </div>
        <div>
          <h2>{resume.name || "Your Name"}</h2>
          <p>{resume.title || "Professional Title"}</p>
        </div>
      </header>
      <div className="resume-contact">
        <span>{resume.email}</span>
        <span>{resume.phone}</span>
        <span>{resume.location}</span>
      </div>
      <section>
        <h3>Profile</h3>
        <p>{resume.summary}</p>
      </section>
      <section>
        <h3>Skills</h3>
        <div className="resume-skills">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>
      <section>
        <h3>Experience</h3>
        <p>{resume.experience}</p>
      </section>
      <section className="resume-columns">
        <div>
          <h3>Education</h3>
          <p>{resume.education}</p>
        </div>
        <div>
          <h3>Projects</h3>
          <p>{resume.projects}</p>
        </div>
      </section>
    </article>
  );
}

function TestimonialsSection({ testimonialIndex, setTestimonialIndex }) {
  const active = testimonials[testimonialIndex];
  return (
    <section className="section-pad reveal">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by ambitious job seekers"
        text="Auto-sliding review cards with clean proof and premium motion."
      />
      <div className="testimonial-wrap glass-card">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.name}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45 }}
          >
            <img src={avatarData(active.name, active.colors)} alt={`${active.name} profile`} />
            <div className="stars" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={19} fill="currentColor" />
              ))}
            </div>
            <blockquote>"{active.text}"</blockquote>
            <h3>{active.name}</h3>
            <p>{active.role}</p>
          </motion.article>
        </AnimatePresence>
        <div className="slider-dots" aria-label="Testimonials slider controls">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              className={index === testimonialIndex ? "active" : ""}
              onClick={() => setTestimonialIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ openFaq, setOpenFaq }) {
  return (
    <section className="section-pad reveal">
      <SectionHeading eyebrow="FAQ" title="Answers before you start" text="Quick clarity for the most common resume builder questions." />
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <article className="faq-item glass-card" key={faq.q}>
            <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
              <span>{faq.q}</span>
              <ChevronDown size={20} />
            </button>
            <AnimatePresence>
              {openFaq === index && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {faq.a}
                </motion.p>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
    </section>
  );
}

function OwnerSection() {
  return (
    <section id="owner" className="owner-section section-pad reveal">
      <div className="owner-card glass-card">
        <div className="owner-photo">
          <img src={avatarData(owner.name, ["#2563EB", "#F59E0B"])} alt="Shoaib Farman placeholder portrait" />
        </div>
        <div>
          <span className="eyebrow">
            <UserRound size={16} />
            About Me 
          </span>
          <h2>Shoaib Farman</h2>
          <h3>Frontend Developer</h3>
          <p>
            Passionate Frontend Developer specializing in React.js, JavaScript, UI/UX Design and modern web experiences. Currently learning JAVA for backend.
          </p>
          <div className="owner-actions">
            <SocialButton href={owner.github} icon={Github} label="View GitHub" />
            <SocialButton href={owner.linkedin} icon={Linkedin} label="Connect on LinkedIn" />
            <SocialButton href={owner.instagram} icon={Instagram} label="Follow on Instagram" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  const socials = [
    { label: "Instagram", href: owner.instagram, icon: Instagram, text: "@i.shoaib.002" },
    { label: "LinkedIn", href: owner.linkedin, icon: Linkedin, text: "Shoaib Farman" },
    { label: "GitHub", href: owner.github, icon: Github, text: "shoaibfarman002" },
    { label: "Gmail", href: `mailto:${owner.email}`, icon: Mail, text: owner.email }
  ];
  return (
    <section className="section-pad reveal">
      <SectionHeading
        eyebrow="Social media"
        title="Connect with the creator"
        text="Every social card opens in a new tab with a glow interaction."
      />
      <div className="social-grid">
        {socials.map(({ label, href, icon: Icon, text }) => (
          <a className="social-card glass-card" key={label} href={href} target="_blank" rel="noreferrer">
            <span>
              <Icon size={28} />
            </span>
            <h3>{label}</h3>
            <p>{text}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ onSubmit }) {
  return (
    <section id="contact" className="contact-section section-pad reveal">
      <SectionHeading
        eyebrow="Contact"
        title="Let us build your next professional presence"
        text="Send a message or use quick actions for WhatsApp, call, and email."
      />
      <div className="contact-layout">
        <form className="contact-form glass-card" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input required type="text" name="name" />
          </label>
          <label>
            <span>Email</span>
            <input required type="email" name="email" />
          </label>
          <label>
            <span>Subject</span>
            <input required type="text" name="subject" />
          </label>
          <label>
            <span>Message</span>
            <textarea required rows="5" name="message" />
          </label>
          <button className="btn btn-primary" type="submit">
            Send Message
            <Send size={18} />
          </button>
        </form>

        <div className="quick-contact">
          <a className="quick-card glass-card" href={owner.whatsapp} target="_blank" rel="noreferrer">
            <Send size={24} />
            <span>WhatsApp Button</span>
          </a>
          <a className="quick-card glass-card" href={owner.phone}>
            <Phone size={24} />
            <span>Call Button</span>
          </a>
          <a className="quick-card glass-card" href={`mailto:${owner.email}`} target="_blank" rel="noreferrer">
            <Mail size={24} />
            <span>Email Button</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ scrollTo }) {
  return (
    <footer className="footer">
      <div className="brand">
        <span className="brand-icon">
          <FileCheck2 size={22} />
        </span>
        <span>
          <strong>Top Resume</strong>
          <small>Maker Pro</small>
        </span>
      </div>
      <div className="footer-links">
        {["features", "templates", "builder", "owner", "contact"].map((id) => (
          <button key={id} onClick={() => scrollTo(id)}>
            {id}
          </button>
        ))}
      </div>
      <div className="footer-social">
        <a href={owner.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram size={18} />
        </a>
        <a href={owner.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a href={owner.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href={`mailto:${owner.email}`} target="_blank" rel="noreferrer" aria-label="Gmail">
          <Mail size={18} />
        </a>
      </div>
      <p>© 2026 Top Resume Maker Pro | Designed & Developed by Shoaib Farman</p>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <Rocket size={16} />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function SocialButton({ href, icon: Icon, label }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="btn btn-secondary">
      <Icon size={18} />
      {label}
    </a>
  );
}

export default App;
