import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Copy,
  Crop,
  Download,
  ExternalLink,
  Eye,
  FileBadge,
  FileCheck2,
  FileText,
  Gauge,
  Github,
  Globe2,
  GraduationCap,
  GripVertical,
  Heart,
  Home,
  ImagePlus,
  Instagram,
  Languages,
  LayoutDashboard,
  Layers3,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Moon,
  Palette,
  PenLine,
  Phone,
  Plus,
  Printer,
  Redo2,
  RefreshCcw,
  RotateCcw,
  Save,
  SearchCheck,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Trash2,
  Trophy,
  Twitter,
  Undo2,
  UnlockKeyhole,
  Upload,
  UserCog,
  UserRound,
  WandSparkles,
  X
} from "lucide-react";

const STORAGE_KEY = "shofar-resume-builder-state-v1";
const THEME_KEY = "shofar-resume-builder-theme";

const owner = {
  name: "Shoaib Farman",
  role: "Frontend Developer",
  github: "https://github.com/shoaibfarman002",
  linkedin: "https://www.linkedin.com/in/shoaib-farman-4b2b27402/?skipRedirect=true",
  instagram: "https://www.instagram.com/i.shoaib.002/",
  email: "imraankhan23180@gmail.com"
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "builder", label: "Builder", icon: PenLine },
  { id: "templates", label: "Templates", icon: Layers3 },
  { id: "story", label: "My Story", icon: BookOpen },
  { id: "admin", label: "Admin", icon: UserCog }
];

const wizardSteps = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "content", label: "Content", icon: FileText },
  { id: "design", label: "Design", icon: Palette },
  { id: "ai", label: "AI Tools", icon: WandSparkles },
  { id: "export", label: "Export", icon: Download }
];

const colorPresets = [
  { name: "Azure", accent: "#2563eb", second: "#14b8a6" },
  { name: "Emerald", accent: "#059669", second: "#0f766e" },
  { name: "Royal", accent: "#1d4ed8", second: "#7c3aed" },
  { name: "Gold", accent: "#b7791f", second: "#0f172a" },
  { name: "Coral", accent: "#e11d48", second: "#f97316" },
  { name: "Mono", accent: "#111827", second: "#6b7280" }
];

const socialConfigs = [
  { id: "github", label: "GitHub", icon: Github, placeholder: owner.github },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: owner.linkedin },
  { id: "portfolio", label: "Portfolio", icon: Globe2, placeholder: "https://yourportfolio.com" },
  { id: "instagram", label: "Instagram", icon: Instagram, placeholder: owner.instagram },
  { id: "twitter", label: "Twitter/X", icon: Twitter, placeholder: "https://x.com/username" }
];

const documentFields = [
  { id: "aadhaar", label: "Aadhaar Card Number" },
  { id: "pan", label: "PAN Card Number" },
  { id: "passport", label: "Passport Number" },
  { id: "drivingLicense", label: "Driving License Number" }
];

const baseSections = [
  {
    id: "summary",
    title: "Professional Summary",
    icon: ClipboardCheck,
    content:
      "Frontend Developer focused on React.js, JavaScript, Tailwind CSS, UI/UX design, and responsive product experiences. Currently building backend strength with Java while working toward becoming a full-stack developer."
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
    content:
      "Frontend Developer | Real-world Projects\nBuilt premium dashboards, resume builders, admission portals, and responsive web interfaces with React.js, reusable components, and polished UI states."
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    content: "BCA Program | Delhi\nFocused on software development, frontend engineering, Java programming, and practical product building."
  },
  {
    id: "skills",
    title: "Skills",
    icon: Award,
    content: "React.js, JavaScript, HTML, CSS, Tailwind CSS, UI/UX Design, Responsive Design, Framer Motion"
  },
  {
    id: "technicalSkills",
    title: "Technical Skills",
    icon: Code2,
    content: "Vite, Git, GitHub, REST APIs, Component Architecture, Accessibility, Performance Optimization"
  },
  {
    id: "projects",
    title: "Projects",
    icon: FileCheck2,
    content:
      "SHOFAR Resume Builder | React.js, Framer Motion, PDF Export\nCreated an ATS-friendly resume builder with 20+ templates, live preview, profile controls, AI writing helpers, and analytics."
  },
  {
    id: "certifications",
    title: "Certifications",
    icon: FileBadge,
    content: "Frontend Development Practice | UI/UX Design Projects | Java Backend Learning Path"
  },
  {
    id: "achievements",
    title: "Achievements",
    icon: Trophy,
    content: "Mastered frontend fundamentals in 4-5 months by building multiple real-world projects and complete user interfaces."
  },
  {
    id: "languages",
    title: "Languages",
    icon: Languages,
    content: "English, Hindi, Urdu"
  },
  {
    id: "hobbies",
    title: "Hobbies",
    icon: Heart,
    content: "Coding, UI exploration, learning backend development, product design"
  },
  {
    id: "references",
    title: "References",
    icon: UserRound,
    content: "Available upon request."
  }
];

const templateCategories = ["All", "Corporate", "Creative", "Minimal", "Developer", "Premium"];

const templates = [
  {
    id: "executive-blue",
    name: "Executive Blue",
    category: "Corporate",
    layout: "split",
    header: "band",
    accent: "#2563eb",
    second: "#0f172a",
    font: "Inter",
    description: "Sharp leadership layout with strong blue structure."
  },
  {
    id: "professional-gray",
    name: "Professional Gray",
    category: "Corporate",
    layout: "classic",
    header: "line",
    accent: "#4b5563",
    second: "#111827",
    font: "Inter",
    description: "Quiet corporate polish with ATS-safe spacing."
  },
  {
    id: "modern-black",
    name: "Modern Black",
    category: "Corporate",
    layout: "rail",
    header: "dark",
    accent: "#111827",
    second: "#64748b",
    font: "Poppins",
    description: "Bold black header and editorial section flow."
  },
  {
    id: "consultant-slate",
    name: "Consultant Slate",
    category: "Corporate",
    layout: "timeline",
    header: "letter",
    accent: "#334155",
    second: "#0891b2",
    font: "Inter",
    description: "Consulting-style timeline with crisp hierarchy."
  },
  {
    id: "designer-purple",
    name: "Designer Purple",
    category: "Creative",
    layout: "cards",
    header: "gradient",
    accent: "#7c3aed",
    second: "#ec4899",
    font: "Poppins",
    description: "Creative blocks, expressive header, and portfolio energy."
  },
  {
    id: "creative-orange",
    name: "Creative Orange",
    category: "Creative",
    layout: "asymmetric",
    header: "capsule",
    accent: "#f97316",
    second: "#0f766e",
    font: "Poppins",
    description: "Warm creative resume with asymmetric panels."
  },
  {
    id: "uiux-gradient",
    name: "UI/UX Gradient",
    category: "Creative",
    layout: "grid",
    header: "gradient",
    accent: "#06b6d4",
    second: "#8b5cf6",
    font: "Inter",
    description: "Product design inspired layout with soft gradients."
  },
  {
    id: "brand-studio",
    name: "Brand Studio",
    category: "Creative",
    layout: "mosaic",
    header: "poster",
    accent: "#db2777",
    second: "#f59e0b",
    font: "Poppins",
    description: "Portfolio-style storytelling for visual careers."
  },
  {
    id: "clean-white",
    name: "Clean White",
    category: "Minimal",
    layout: "classic",
    header: "line",
    accent: "#0f172a",
    second: "#94a3b8",
    font: "Inter",
    description: "Simple white resume with maximum readability."
  },
  {
    id: "ats-friendly",
    name: "ATS Friendly",
    category: "Minimal",
    layout: "ats",
    header: "plain",
    accent: "#111827",
    second: "#6b7280",
    font: "Inter",
    description: "Clean headings, simple text, and scanner-ready order."
  },
  {
    id: "elegant-simple",
    name: "Elegant Simple",
    category: "Minimal",
    layout: "elegant",
    header: "letter",
    accent: "#6d5dfc",
    second: "#0f172a",
    font: "Georgia",
    description: "Elegant serif headings with restrained details."
  },
  {
    id: "academic-classic",
    name: "Academic Classic",
    category: "Minimal",
    layout: "columns",
    header: "plain",
    accent: "#475569",
    second: "#0f172a",
    font: "Georgia",
    description: "Academic spacing for education-heavy profiles."
  },
  {
    id: "github-inspired",
    name: "GitHub Inspired",
    category: "Developer",
    layout: "sidebar",
    header: "code",
    accent: "#24292f",
    second: "#2da44e",
    font: "Inter",
    description: "Developer-friendly resume with repository-style sections."
  },
  {
    id: "tech-dark",
    name: "Tech Dark",
    category: "Developer",
    layout: "dark",
    header: "dark",
    accent: "#22c55e",
    second: "#38bdf8",
    font: "Inter",
    description: "High-contrast technical layout for modern engineers."
  },
  {
    id: "developer-pro",
    name: "Developer Pro",
    category: "Developer",
    layout: "rail",
    header: "code",
    accent: "#4f46e5",
    second: "#14b8a6",
    font: "Inter",
    description: "Project-led layout with technical skill rail."
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    category: "Developer",
    layout: "grid",
    header: "metric",
    accent: "#0d9488",
    second: "#4338ca",
    font: "Inter",
    description: "Metric-led format for data and analytics profiles."
  },
  {
    id: "luxury-gold",
    name: "Luxury Gold",
    category: "Premium",
    layout: "elegant",
    header: "gold",
    accent: "#b7791f",
    second: "#171717",
    font: "Georgia",
    description: "Premium gold details with executive spacing."
  },
  {
    id: "emerald-green",
    name: "Emerald Green",
    category: "Premium",
    layout: "split",
    header: "band",
    accent: "#059669",
    second: "#064e3b",
    font: "Inter",
    description: "Fresh premium layout with confident green accents."
  },
  {
    id: "royal-blue",
    name: "Royal Blue",
    category: "Premium",
    layout: "mosaic",
    header: "poster",
    accent: "#1d4ed8",
    second: "#7c3aed",
    font: "Poppins",
    description: "Royal color system with strong portfolio sections."
  },
  {
    id: "modern-navy",
    name: "Modern Navy",
    category: "Premium",
    layout: "columns",
    header: "dark",
    accent: "#0f172a",
    second: "#38bdf8",
    font: "Inter",
    description: "Premium navy system for polished professional resumes."
  },
  {
    id: "startup-slate",
    name: "Startup Slate",
    category: "Premium",
    layout: "asymmetric",
    header: "metric",
    accent: "#475569",
    second: "#f97316",
    font: "Inter",
    description: "Founder-ready layout with compact impact blocks."
  },
  {
    id: "product-manager",
    name: "Product Manager",
    category: "Corporate",
    layout: "cards",
    header: "capsule",
    accent: "#0ea5e9",
    second: "#f59e0b",
    font: "Inter",
    description: "Outcome-focused cards for strategy and delivery."
  }
];

const storyChapters = [
  {
    year: "Class 7",
    title: "A New City",
    text:
      "After Class 7, Shoaib moved to Delhi to stay with relatives and continue his studies. It was the beginning of learning independence far earlier than most people expect."
  },
  {
    year: "2022",
    title: "First Lines of Code",
    text:
      "In Class 9, he started coding. Curiosity turned into practice, and practice slowly became a real passion for building digital experiences."
  },
  {
    year: "2024-2025",
    title: "The Kota Detour",
    text:
      "During Class 11 and Class 12, he stepped away from coding because his father wanted him to become a doctor. He moved to Kota and prepared for NEET at ALLEN Kota."
  },
  {
    year: "Nov 2025",
    title: "Everything Changed",
    text:
      "In November 2025, his father suddenly suffered kidney failure. The family went through hospitals, treatments, fear, and exhaustion."
  },
  {
    year: "Jan 11",
    title: "Loss",
    text:
      "After being admitted to a hospital in Kolkata, his father passed away on January 11. That phase deeply affected his life and mental health."
  },
  {
    year: "NEET",
    title: "Three Months Left",
    text:
      "With only three months remaining before the NEET exam, he felt lost and overwhelmed. The path in front of him no longer felt like his own."
  },
  {
    year: "Return",
    title: "Back To Technology",
    text:
      "Eventually, he chose to return to his original passion: technology and development. It was not an escape, but a decision to rebuild."
  },
  {
    year: "Now",
    title: "Full-Stack Path",
    text:
      "He enrolled in a BCA program in Delhi, mastered frontend fundamentals in 4-5 months through real projects, and is now learning Java for backend development."
  }
];

const sampleUsers = [
  { name: "Ayesha Khan", plan: "Free", resumes: 3, status: "Active" },
  { name: "Rahul Mehta", plan: "Premium", resumes: 7, status: "Active" },
  { name: "Naina Sharma", plan: "Free", resumes: 2, status: "Review" }
];

const feedbackItems = [
  { name: "Recruiter Mode", status: "Planned", note: "Add keyword comparison against job descriptions." },
  { name: "More ATS Layouts", status: "Live", note: "Expanded with minimal and classic templates." },
  { name: "Photo Cropper", status: "Live", note: "Zoom and reposition controls added." }
];

function createId(prefix = "resume") {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const sectionIconMap = Object.fromEntries(baseSections.map((section) => [section.id, section.icon]));

function safeText(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function safeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function createResume(title = "Shoaib Farman Resume") {
  return {
    id: createId(),
    title,
    templateId: "executive-blue",
    accent: "#2563eb",
    second: "#14b8a6",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    profile: {
      fullName: "Shoaib Farman",
      role: "Frontend Developer",
      email: owner.email,
      phone: "+91 00000 00000",
      location: "Delhi, India",
      address: "Delhi, India",
      website: "",
      photo: "",
      showPhoto: true,
      photoZoom: 1,
      photoX: 0,
      photoY: 0
    },
    socials: {
      github: owner.github,
      linkedin: owner.linkedin,
      portfolio: "",
      instagram: owner.instagram,
      twitter: ""
    },
    documents: {
      visible: false,
      aadhaar: "",
      pan: "",
      passport: "",
      drivingLicense: ""
    },
    sections: baseSections.map((section) => ({ ...section })),
    notes: "Auto-saved locally."
  };
}

function normalizeSection(section, fallback = {}) {
  const id = safeText(section?.id, fallback.id || createId("section"));
  return {
    id,
    title: safeText(section?.title, fallback.title || "Custom Section"),
    icon: sectionIconMap[id] || FileText,
    content: safeText(section?.content, fallback.content || "")
  };
}

function normalizeResume(resume) {
  const defaults = createResume(safeText(resume?.title, "Shoaib Farman Resume"));
  const incomingSections = Array.isArray(resume?.sections) ? resume.sections : [];
  const sectionMap = new Map(incomingSections.map((section) => [section?.id, section]));
  const repairedBaseSections = baseSections.map((section) => normalizeSection(sectionMap.get(section.id), section));
  const customSections = incomingSections
    .filter((section) => section?.id && !sectionIconMap[section.id])
    .map((section) => normalizeSection(section));

  return {
    ...defaults,
    ...resume,
    id: safeText(resume?.id, defaults.id),
    title: safeText(resume?.title, defaults.title),
    templateId: templates.some((template) => template.id === resume?.templateId) ? resume.templateId : defaults.templateId,
    accent: safeText(resume?.accent, defaults.accent),
    second: safeText(resume?.second, defaults.second),
    createdAt: safeText(resume?.createdAt, defaults.createdAt),
    updatedAt: safeText(resume?.updatedAt, defaults.updatedAt),
    profile: {
      ...defaults.profile,
      ...(resume?.profile || {}),
      fullName: safeText(resume?.profile?.fullName, defaults.profile.fullName),
      role: safeText(resume?.profile?.role, defaults.profile.role),
      email: safeText(resume?.profile?.email, defaults.profile.email),
      phone: safeText(resume?.profile?.phone, defaults.profile.phone),
      location: safeText(resume?.profile?.location, defaults.profile.location),
      address: safeText(resume?.profile?.address, defaults.profile.address),
      website: safeText(resume?.profile?.website, defaults.profile.website),
      photo: safeText(resume?.profile?.photo, defaults.profile.photo),
      showPhoto: typeof resume?.profile?.showPhoto === "boolean" ? resume.profile.showPhoto : defaults.profile.showPhoto,
      photoZoom: safeNumber(resume?.profile?.photoZoom, defaults.profile.photoZoom),
      photoX: safeNumber(resume?.profile?.photoX, defaults.profile.photoX),
      photoY: safeNumber(resume?.profile?.photoY, defaults.profile.photoY)
    },
    socials: {
      ...defaults.socials,
      ...(resume?.socials || {})
    },
    documents: {
      ...defaults.documents,
      ...(resume?.documents || {}),
      visible: typeof resume?.documents?.visible === "boolean" ? resume.documents.visible : defaults.documents.visible
    },
    sections: [...repairedBaseSections, ...customSections]
  };
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const first = createResume();
      return { resumes: [first], activeId: first.id };
    }
    const parsed = JSON.parse(stored);
    if (!parsed.resumes?.length) throw new Error("No resumes found");
    const resumes = parsed.resumes.map((resume) => normalizeResume(resume));
    const activeId = resumes.some((resume) => resume.id === parsed.activeId) ? parsed.activeId : resumes[0].id;
    return { resumes, activeId };
  } catch {
    const first = createResume();
    return { resumes: [first], activeId: first.id };
  }
}

function parseItems(content) {
  return String(content || "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function isChipSection(id) {
  return ["skills", "technicalSkills", "languages", "hobbies"].includes(id);
}

function getTemplate(templateId) {
  return templates.find((template) => template.id === templateId) || templates[0];
}

function calculateResumeMetrics(resume) {
  const profile = resume?.profile || {};
  const sections = Array.isArray(resume?.sections) ? resume.sections : [];
  const socialsObject = resume?.socials || {};
  const sectionText = sections.map((section) => safeText(section?.content)).join(" ");
  const requiredProfile = ["fullName", "role", "email", "phone", "location"];
  const profileScore = requiredProfile.filter((field) => profile[field]).length / requiredProfile.length;
  const filledSections = sections.filter((section) => safeText(section?.content).trim().length > 18).length;
  const sectionScore = sections.length ? filledSections / sections.length : 0;
  const socials = Object.values(socialsObject).filter(Boolean).length;
  const actionWords = ["built", "created", "developed", "optimized", "improved", "managed", "designed", "implemented"];
  const actionScore = actionWords.filter((word) => sectionText.toLowerCase().includes(word)).length / actionWords.length;
  const hasNumbers = /\d/.test(sectionText) ? 1 : 0;
  const completion = Math.round((profileScore * 0.35 + sectionScore * 0.45 + Math.min(socials / 3, 1) * 0.2) * 100);
  const ats = Math.round((profileScore * 30 + sectionScore * 34 + actionScore * 20 + hasNumbers * 10 + Math.min(socials, 3) * 2));

  const suggestions = [];
  if (profileScore < 1) suggestions.push("Complete all contact fields for recruiter clarity.");
  if (!hasNumbers) suggestions.push("Add numbers, scale, duration, or impact metrics to improve credibility.");
  if (actionScore < 0.45) suggestions.push("Use stronger action verbs such as built, optimized, improved, and implemented.");
  if (!sections.find((section) => section.id === "projects")?.content?.trim()) {
    suggestions.push("Add at least one project with tools, responsibilities, and outcomes.");
  }
  if (!suggestions.length) suggestions.push("Strong foundation. Tailor keywords for each job description before applying.");

  return {
    completion,
    ats: Math.min(100, Math.max(0, ats)),
    filledSections,
    socialCount: socials,
    suggestions
  };
}

function avatarData(name, accent = "#2563eb", second = "#14b8a6") {
  const initials = String(name || "SR")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='${accent}'/><stop offset='1' stop-color='${second}'/></linearGradient></defs><rect width='240' height='240' rx='56' fill='url(#g)'/><circle cx='190' cy='44' r='58' fill='white' opacity='.16'/><circle cx='42' cy='202' r='70' fill='white' opacity='.12'/><text x='120' y='139' text-anchor='middle' fill='white' font-family='Inter, Arial' font-size='70' font-weight='800'>${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function App() {
  const initialState = useMemo(() => loadState(), []);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "dark");
  const [resumes, setResumes] = useState(initialState.resumes);
  const [activeId, setActiveId] = useState(initialState.activeId);
  const [activeView, setActiveView] = useState("dashboard");
  const [wizardStep, setWizardStep] = useState("profile");
  const [templateFilter, setTemplateFilter] = useState("All");
  const [draggingId, setDraggingId] = useState("");
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [toast, setToast] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [lastSaved, setLastSaved] = useState("");
  const [storyProgress, setStoryProgress] = useState(0);
  const resumeRef = useRef(null);
  const storyRef = useRef(null);

  const currentResume = useMemo(
    () => resumes.find((resume) => resume.id === activeId) || resumes[0],
    [activeId, resumes]
  );
  const currentTemplate = useMemo(() => getTemplate(currentResume.templateId), [currentResume.templateId]);
  const metrics = useMemo(() => calculateResumeMetrics(currentResume), [currentResume]);
  const filteredTemplates = useMemo(() => {
    if (templateFilter === "All") return templates;
    return templates.filter((template) => template.category === templateFilter);
  }, [templateFilter]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ resumes, activeId }));
    setLastSaved(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, [activeId, resumes]);

  useEffect(() => {
    setPast([]);
    setFuture([]);
  }, [activeId]);

  useEffect(() => {
    const node = storyRef.current;
    if (!node) return undefined;
    const update = () => {
      const max = node.scrollWidth - node.clientWidth;
      setStoryProgress(max > 0 ? Math.round((node.scrollLeft / max) * 100) : 0);
    };
    node.addEventListener("scroll", update, { passive: true });
    update();
    return () => node.removeEventListener("scroll", update);
  }, [activeView]);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2800);
  }

  function commitResume(nextResume, options = { history: true }) {
    const updated = { ...nextResume, updatedAt: new Date().toISOString() };
    if (options.history) {
      setPast((items) => [...items.slice(-34), currentResume]);
      setFuture([]);
    }
    setResumes((items) => items.map((resume) => (resume.id === currentResume.id ? updated : resume)));
  }

  function updateResume(updater, options) {
    const nextResume = typeof updater === "function" ? updater(currentResume) : { ...currentResume, ...updater };
    commitResume(nextResume, options);
  }

  function createNewResume() {
    const next = createResume("Untitled Resume");
    setResumes((items) => [next, ...items]);
    setActiveId(next.id);
    setActiveView("builder");
    setWizardStep("profile");
    showToast("New resume created.");
  }

  function duplicateResume(id = currentResume.id) {
    const source = resumes.find((resume) => resume.id === id) || currentResume;
    const next = {
      ...clone(source),
      id: createId(),
      title: `${source.title} Copy`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setResumes((items) => [next, ...items]);
    setActiveId(next.id);
    showToast("Resume duplicated.");
  }

  function deleteResume(id = currentResume.id) {
    if (resumes.length === 1) {
      const replacement = createResume();
      setResumes([replacement]);
      setActiveId(replacement.id);
      showToast("Last resume reset.");
      return;
    }
    const nextResumes = resumes.filter((resume) => resume.id !== id);
    setResumes(nextResumes);
    if (activeId === id) setActiveId(nextResumes[0].id);
    showToast("Resume deleted.");
  }

  function undo() {
    const previous = past[past.length - 1];
    if (!previous) return;
    setFuture((items) => [currentResume, ...items.slice(0, 34)]);
    setPast((items) => items.slice(0, -1));
    setResumes((items) => items.map((resume) => (resume.id === currentResume.id ? previous : resume)));
  }

  function redo() {
    const next = future[0];
    if (!next) return;
    setPast((items) => [...items.slice(-34), currentResume]);
    setFuture((items) => items.slice(1));
    setResumes((items) => items.map((resume) => (resume.id === currentResume.id ? next : resume)));
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
      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageHeight = (canvas.height * pageWidth) / canvas.width;
      let position = 0;
      let remainingHeight = imageHeight;

      pdf.addImage(image, "PNG", 0, position, pageWidth, imageHeight);
      remainingHeight -= pageHeight;
      while (remainingHeight > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(image, "PNG", 0, position, pageWidth, imageHeight);
        remainingHeight -= pageHeight;
      }

      pdf.save(`${currentResume.profile.fullName || "shofar"}-resume.pdf`);
      showToast("High quality PDF downloaded.");
    } catch (error) {
      showToast("PDF export failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  function applyTemplate(template) {
    updateResume((resume) => ({
      ...resume,
      templateId: template.id,
      accent: template.accent,
      second: template.second
    }));
    showToast(`${template.name} applied.`);
  }

  function handleStoryMove(direction) {
    const node = storyRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(520, node.clientWidth * 0.82), behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="workspace">
        <TopBar
          activeView={activeView}
          currentResume={currentResume}
          resumes={resumes}
          setActiveId={setActiveId}
          theme={theme}
          setTheme={setTheme}
          lastSaved={lastSaved}
        />

        <AnimatePresence mode="wait">
          {activeView === "dashboard" && (
            <Dashboard
              key="dashboard"
              currentResume={currentResume}
              currentTemplate={currentTemplate}
              metrics={metrics}
              resumes={resumes}
              setActiveId={setActiveId}
              setActiveView={setActiveView}
              createNewResume={createNewResume}
              duplicateResume={duplicateResume}
              deleteResume={deleteResume}
              downloadPdf={downloadPdf}
              downloading={downloading}
            />
          )}

          {activeView === "builder" && (
            <Builder
              key="builder"
              resume={currentResume}
              template={currentTemplate}
              metrics={metrics}
              wizardStep={wizardStep}
              setWizardStep={setWizardStep}
              updateResume={updateResume}
              applyTemplate={applyTemplate}
              undo={undo}
              redo={redo}
              canUndo={past.length > 0}
              canRedo={future.length > 0}
              draggingId={draggingId}
              setDraggingId={setDraggingId}
              resumeRef={resumeRef}
              downloadPdf={downloadPdf}
              downloading={downloading}
              showToast={showToast}
            />
          )}

          {activeView === "templates" && (
            <TemplatesGallery
              key="templates"
              templateFilter={templateFilter}
              setTemplateFilter={setTemplateFilter}
              filteredTemplates={filteredTemplates}
              activeTemplateId={currentResume.templateId}
              applyTemplate={applyTemplate}
              setActiveView={setActiveView}
            />
          )}

          {activeView === "story" && (
            <StoryExperience
              key="story"
              storyRef={storyRef}
              progress={storyProgress}
              onMove={handleStoryMove}
            />
          )}

          {activeView === "admin" && (
            <AdminPanel
              key="admin"
              resumes={resumes}
              metrics={metrics}
              templateCount={templates.length}
              createNewResume={createNewResume}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="pdf-export-node" aria-hidden="true">
        <ResumePaper resume={currentResume} template={currentTemplate} refProp={resumeRef} />
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast glass-panel"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            role="status"
          >
            <Check size={18} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Sidebar({ activeView, setActiveView }) {
  return (
    <aside className="side-nav glass-panel">
      <button className="brand-lockup" onClick={() => setActiveView("dashboard")} aria-label="Open dashboard">
        <span className="brand-mark">
          <FileCheck2 size={24} />
        </span>
        <span>
          <strong>SHOFAR</strong>
          <small>Resume Builder</small>
        </span>
      </button>

      <nav aria-label="Main workspace">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={activeView === id ? "active" : ""} onClick={() => setActiveView(id)}>
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="owner-pocket">
        <p>Owner</p>
        <strong>Shoaib Farman</strong>
        <div>
          <a href={owner.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href={owner.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
          <a href={owner.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={17} />
          </a>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ activeView, currentResume, resumes, setActiveId, theme, setTheme, lastSaved }) {
  const activeNav = navItems.find((item) => item.id === activeView);
  return (
    <header className="topbar glass-panel">
      <div>
        <span className="micro-label">{activeNav?.label || "Workspace"}</span>
        <h1>{activeView === "dashboard" ? "Interactive Resume Dashboard" : "SHOFAR Resume Builder"}</h1>
      </div>

      <div className="topbar-actions">
        <label className="resume-switcher">
          <span>Resume</span>
          <select value={currentResume.id} onChange={(event) => setActiveId(event.target.value)}>
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.title}
              </option>
            ))}
          </select>
        </label>
        <span className="save-state">
          <Save size={15} />
          Auto saved {lastSaved}
        </span>
        <div className="owner-links" aria-label="Owner social links">
          <a href={owner.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={owner.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href={owner.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={18} />
          </a>
        </div>
        <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}

function Dashboard({
  currentResume,
  currentTemplate,
  metrics,
  resumes,
  setActiveId,
  setActiveView,
  createNewResume,
  duplicateResume,
  deleteResume,
  downloadPdf,
  downloading
}) {
  return (
    <Screen>
      <section className="hero-dashboard glass-panel">
        <div>
          <span className="eyebrow">
            <Sparkles size={16} />
            Modern premium UI/UX
          </span>
          <h2>Create, improve, preview, and export ATS-friendly resumes.</h2>
          <p>
            A complete glassmorphism resume workspace with templates, analytics, local AI writing helpers, live color
            customization, and one-click PDF export.
          </p>
          <div className="action-row">
            <button className="primary-button" onClick={createNewResume}>
              <Plus size={18} />
              Create New Resume
            </button>
            <button className="secondary-button" onClick={() => setActiveView("builder")}>
              <PenLine size={18} />
              Edit Existing Resume
            </button>
            <button className="secondary-button" onClick={downloadPdf} disabled={downloading}>
              <Download size={18} />
              {downloading ? "Preparing" : "Download PDF"}
            </button>
          </div>
        </div>
        <div className="dashboard-preview">
          <ResumePaper resume={currentResume} template={currentTemplate} compact />
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard icon={Gauge} label="ATS Score" value={`${metrics.ats}%`} tone="blue" />
        <MetricCard icon={Activity} label="Profile Progress" value={`${metrics.completion}%`} tone="green" />
        <MetricCard icon={Layers3} label="Templates" value={`${templates.length}+`} tone="gold" />
        <MetricCard icon={FileText} label="Saved Resumes" value={resumes.length} tone="pink" />
      </section>

      <section className="dashboard-grid">
        <div className="glass-panel resume-manager">
          <PanelHeader icon={BriefcaseBusiness} title="Resume Manager" text="Create, edit, duplicate, delete, or preview saved resumes." />
          <div className="resume-list">
            {resumes.map((resume) => (
              <article key={resume.id} className={resume.id === currentResume.id ? "active" : ""}>
                <button
                  className="resume-row-main"
                  onClick={() => {
                    setActiveId(resume.id);
                    setActiveView("builder");
                  }}
                >
                  <span>{resume.profile.fullName || resume.title}</span>
                  <small>{getTemplate(resume.templateId).name}</small>
                </button>
                <div>
                  <button className="icon-button" onClick={() => duplicateResume(resume.id)} aria-label="Duplicate resume">
                    <Copy size={16} />
                  </button>
                  <button className="icon-button danger" onClick={() => deleteResume(resume.id)} aria-label="Delete resume">
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <AnalyticsDashboard metrics={metrics} />
      </section>
    </Screen>
  );
}

function Builder({
  resume,
  template,
  metrics,
  wizardStep,
  setWizardStep,
  updateResume,
  applyTemplate,
  undo,
  redo,
  canUndo,
  canRedo,
  draggingId,
  setDraggingId,
  resumeRef,
  downloadPdf,
  downloading,
  showToast
}) {
  return (
    <Screen>
      <section className="builder-shell">
        <div className="builder-column">
          <div className="builder-toolbar glass-panel">
            <div className="wizard-track" aria-label="Resume creation progress">
              {wizardSteps.map((step, index) => {
                const Icon = step.icon;
                const activeIndex = wizardSteps.findIndex((item) => item.id === wizardStep);
                return (
                  <button
                    key={step.id}
                    className={wizardStep === step.id ? "active" : index < activeIndex ? "done" : ""}
                    onClick={() => setWizardStep(step.id)}
                  >
                    <Icon size={17} />
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="history-actions">
              <button className="icon-button" onClick={undo} disabled={!canUndo} aria-label="Undo">
                <Undo2 size={17} />
              </button>
              <button className="icon-button" onClick={redo} disabled={!canRedo} aria-label="Redo">
                <Redo2 size={17} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {wizardStep === "profile" && <ProfilePanel key="profile" resume={resume} updateResume={updateResume} showToast={showToast} />}
            {wizardStep === "content" && (
              <ContentPanel
                key="content"
                resume={resume}
                updateResume={updateResume}
                draggingId={draggingId}
                setDraggingId={setDraggingId}
              />
            )}
            {wizardStep === "design" && (
              <DesignPanel key="design" resume={resume} updateResume={updateResume} applyTemplate={applyTemplate} />
            )}
            {wizardStep === "ai" && <AiPanel key="ai" resume={resume} updateResume={updateResume} metrics={metrics} showToast={showToast} />}
            {wizardStep === "export" && (
              <ExportPanel
                key="export"
                resume={resume}
                template={template}
                metrics={metrics}
                downloadPdf={downloadPdf}
                downloading={downloading}
              />
            )}
          </AnimatePresence>
        </div>

        <PreviewPanel
          resume={resume}
          template={template}
          metrics={metrics}
          resumeRef={resumeRef}
          downloadPdf={downloadPdf}
          downloading={downloading}
        />
      </section>
    </Screen>
  );
}

function ProfilePanel({ resume, updateResume, showToast }) {
  const fileRef = useRef(null);

  function updateProfile(field, value) {
    updateResume((current) => ({ ...current, profile: { ...current.profile, [field]: value } }));
  }

  function updateSocial(field, value) {
    updateResume((current) => ({ ...current, socials: { ...current.socials, [field]: value } }));
  }

  function updateDocument(field, value) {
    updateResume((current) => ({ ...current, documents: { ...current.documents, [field]: value } }));
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile("photo", reader.result);
      showToast("Profile photo uploaded.");
    };
    reader.readAsDataURL(file);
  }

  return (
    <MotionPanel className="editor-panel">
      <PanelHeader icon={UserRound} title="Profile Details" text="Upload a photo, crop it visually, and fill personal/contact information." />

      <div className="profile-grid">
        <div className="photo-editor glass-lite">
          <div className="photo-frame">
            <ProfileImage resume={resume} />
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} hidden />
          <div className="photo-actions">
            <button className="secondary-button" onClick={() => fileRef.current?.click()}>
              <Upload size={17} />
              Upload Photo
            </button>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={resume.profile.showPhoto}
                onChange={(event) => updateProfile("showPhoto", event.target.checked)}
              />
              <span>Show photo</span>
            </label>
          </div>
          <RangeControl icon={Crop} label="Resize" min="0.8" max="1.8" step="0.05" value={resume.profile.photoZoom} onChange={(value) => updateProfile("photoZoom", Number(value))} />
          <RangeControl label="Move X" min="-30" max="30" value={resume.profile.photoX} onChange={(value) => updateProfile("photoX", Number(value))} />
          <RangeControl label="Move Y" min="-30" max="30" value={resume.profile.photoY} onChange={(value) => updateProfile("photoY", Number(value))} />
        </div>

        <div className="form-grid two">
          <TextField label="Resume Title" value={resume.title} onChange={(value) => updateResume({ ...resume, title: value })} />
          <TextField label="Full Name" value={resume.profile.fullName} onChange={(value) => updateProfile("fullName", value)} />
          <TextField label="Professional Title" value={resume.profile.role} onChange={(value) => updateProfile("role", value)} />
          <TextField label="Email" type="email" value={resume.profile.email} onChange={(value) => updateProfile("email", value)} />
          <TextField label="Phone" value={resume.profile.phone} onChange={(value) => updateProfile("phone", value)} />
          <TextField label="Portfolio Website" value={resume.profile.website} onChange={(value) => updateProfile("website", value)} />
          <TextField label="Location" value={resume.profile.location} onChange={(value) => updateProfile("location", value)} />
          <TextField label="Address Details" value={resume.profile.address} onChange={(value) => updateProfile("address", value)} />
        </div>
      </div>

      <PanelHeader icon={Globe2} title="Social Links" text="Paste profile links. Matching icons automatically appear on the resume." compact />
      <div className="social-editor">
        {socialConfigs.map(({ id, label, icon: Icon, placeholder }) => (
          <label key={id} className="social-input">
            <button type="button" className="icon-button" onClick={() => document.getElementById(`social-${id}`)?.focus()} aria-label={label}>
              <Icon size={18} />
            </button>
            <input id={`social-${id}`} value={resume.socials[id]} placeholder={placeholder} onChange={(event) => updateSocial(id, event.target.value)} />
          </label>
        ))}
      </div>

      <PanelHeader icon={ShieldCheck} title="Identity Documents" text="Optional details stay hidden unless the privacy toggle is enabled." compact />
      <div className="document-panel glass-lite">
        <label className="privacy-toggle">
          <input
            type="checkbox"
            checked={resume.documents.visible}
            onChange={(event) => updateDocument("visible", event.target.checked)}
          />
          <span>{resume.documents.visible ? <UnlockKeyhole size={18} /> : <LockKeyhole size={18} />}</span>
          <strong>{resume.documents.visible ? "Visible on resume" : "Hidden from resume"}</strong>
        </label>
        <div className="form-grid two">
          {documentFields.map((field) => (
            <TextField
              key={field.id}
              label={field.label}
              value={resume.documents[field.id]}
              onChange={(value) => updateDocument(field.id, value)}
            />
          ))}
        </div>
      </div>
    </MotionPanel>
  );
}

function ContentPanel({ resume, updateResume, draggingId, setDraggingId }) {
  function updateSection(id, patch) {
    updateResume((current) => ({
      ...current,
      sections: current.sections.map((section) => (section.id === id ? { ...section, ...patch } : section))
    }));
  }

  function addCustomSection() {
    updateResume((current) => ({
      ...current,
      sections: [
        ...current.sections,
        {
          id: createId("custom"),
          title: "Custom Section",
          icon: FileText,
          content: "Add your custom resume content here."
        }
      ]
    }));
  }

  function removeSection(id) {
    updateResume((current) => ({
      ...current,
      sections: current.sections.filter((section) => section.id !== id)
    }));
  }

  function moveSection(targetId) {
    if (!draggingId || draggingId === targetId) return;
    updateResume((current) => {
      const next = [...current.sections];
      const from = next.findIndex((section) => section.id === draggingId);
      const to = next.findIndex((section) => section.id === targetId);
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return { ...current, sections: next };
    });
    setDraggingId("");
  }

  return (
    <MotionPanel className="editor-panel">
      <PanelHeader
        icon={GripVertical}
        title="Resume Sections"
        text="Drag sections to reorder them. Add custom sections for anything unique to your career."
        action={
          <button className="secondary-button" onClick={addCustomSection}>
            <Plus size={17} />
            Add Custom
          </button>
        }
      />

      <div className="section-editor-list">
        {resume.sections.map((section) => (
          <article
            key={section.id}
            draggable
            onDragStart={() => setDraggingId(section.id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => moveSection(section.id)}
            className={draggingId === section.id ? "dragging" : ""}
          >
            <div className="section-editor-head">
              <span className="drag-handle">
                <GripVertical size={18} />
              </span>
              <input value={section.title} onChange={(event) => updateSection(section.id, { title: event.target.value })} />
              {section.id.startsWith("custom") && (
                <button className="icon-button danger" onClick={() => removeSection(section.id)} aria-label="Remove section">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <textarea
              rows={isChipSection(section.id) ? 3 : 5}
              value={section.content}
              onChange={(event) => updateSection(section.id, { content: event.target.value })}
            />
          </article>
        ))}
      </div>
    </MotionPanel>
  );
}

function DesignPanel({ resume, updateResume, applyTemplate }) {
  return (
    <MotionPanel className="editor-panel">
      <PanelHeader icon={Palette} title="Template And Colors" text="Switch templates, choose presets, or use unlimited accent colors with live preview." />

      <div className="color-customizer glass-lite">
        <div className="form-grid two">
          <label>
            <span>Accent Color</span>
            <input
              type="color"
              value={resume.accent}
              onChange={(event) => updateResume((current) => ({ ...current, accent: event.target.value }))}
            />
          </label>
          <label>
            <span>Secondary Color</span>
            <input
              type="color"
              value={resume.second}
              onChange={(event) => updateResume((current) => ({ ...current, second: event.target.value }))}
            />
          </label>
        </div>
        <div className="preset-row">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateResume((current) => ({ ...current, accent: preset.accent, second: preset.second }))}
              style={{ "--preset-a": preset.accent, "--preset-b": preset.second }}
            >
              <span />
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="template-strip">
        {templates.map((template) => (
          <button
            key={template.id}
            className={resume.templateId === template.id ? "active" : ""}
            onClick={() => applyTemplate(template)}
          >
            <MiniTemplate template={template} />
            <span>{template.name}</span>
          </button>
        ))}
      </div>
    </MotionPanel>
  );
}

function AiPanel({ resume, updateResume, metrics, showToast }) {
  function updateSection(id, content) {
    updateResume((current) => ({
      ...current,
      sections: current.sections.map((section) => (section.id === id ? { ...section, content } : section))
    }));
  }

  function getSection(id) {
    return resume.sections.find((section) => section.id === id)?.content || "";
  }

  function generateSummary() {
    const skills = parseItems(getSection("skills")).slice(0, 5).join(", ");
    updateSection(
      "summary",
      `${resume.profile.role || "Developer"} with hands-on experience building responsive, user-focused web applications. Skilled in ${skills || "modern frontend development"}, with a strong focus on clean UI, performance, and practical problem solving.`
    );
    showToast("AI summary generated.");
  }

  function suggestSkills() {
    const current = parseItems(getSection("skills"));
    const suggestions = [
      "Component Architecture",
      "Accessibility",
      "API Integration",
      "Performance Optimization",
      "Java Backend Fundamentals",
      "Problem Solving"
    ].filter((skill) => !current.map((item) => item.toLowerCase()).includes(skill.toLowerCase()));
    updateSection("skills", [...current, ...suggestions.slice(0, 5)].join(", "));
    showToast("Skill suggestions added.");
  }

  function generateProject() {
    updateSection(
      "projects",
      "SHOFAR Resume Builder | React.js, Framer Motion, PDF Export\nDeveloped a premium ATS-friendly resume platform with a dashboard, 20+ dynamic templates, profile image controls, privacy-safe document fields, local AI writing tools, analytics, and high-quality PDF export."
    );
    showToast("Project description generated.");
  }

  function improveResume() {
    const achievements = getSection("achievements");
    updateSection(
      "achievements",
      `${achievements}\nImproved resume quality with stronger action verbs, complete contact details, project impact, technical keywords, and ATS-readable section structure.`.trim()
    );
    showToast("Improvement suggestions applied.");
  }

  const tools = [
    { title: "AI Resume Summary Generator", text: "Create a concise recruiter-ready summary.", icon: Sparkles, action: generateSummary },
    { title: "AI Skill Suggestions", text: "Add relevant frontend and full-stack skills.", icon: Award, action: suggestSkills },
    { title: "AI Project Description Generator", text: "Turn projects into impact-focused descriptions.", icon: Code2, action: generateProject },
    { title: "AI Resume Improvement Suggestions", text: "Apply practical quality improvements.", icon: WandSparkles, action: improveResume },
    { title: "ATS Score Checker", text: `Current score is ${metrics.ats}%.`, icon: SearchCheck, action: () => showToast(`ATS score checked: ${metrics.ats}%.`) }
  ];

  return (
    <MotionPanel className="editor-panel">
      <PanelHeader icon={WandSparkles} title="AI Resume Tools" text="Local smart helpers improve wording, skills, projects, and ATS readiness instantly." />
      <div className="ai-grid">
        {tools.map(({ title, text, icon: Icon, action }) => (
          <button key={title} className="ai-card glass-lite" onClick={action}>
            <span>
              <Icon size={22} />
            </span>
            <strong>{title}</strong>
            <small>{text}</small>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>

      <div className="suggestion-box glass-lite">
        <h3>ATS Improvement Notes</h3>
        {metrics.suggestions.map((suggestion) => (
          <p key={suggestion}>
            <Check size={16} />
            {suggestion}
          </p>
        ))}
      </div>
    </MotionPanel>
  );
}

function ExportPanel({ resume, template, metrics, downloadPdf, downloading }) {
  return (
    <MotionPanel className="editor-panel">
      <PanelHeader icon={Download} title="Export And Review" text="Download a print-friendly, high-quality PDF or print directly from the browser." />

      <div className="export-grid">
        <MetricCard icon={Gauge} label="ATS Score" value={`${metrics.ats}%`} tone="blue" />
        <MetricCard icon={Activity} label="Progress" value={`${metrics.completion}%`} tone="green" />
      </div>

      <div className="export-actions glass-lite">
        <button className="primary-button" onClick={downloadPdf} disabled={downloading}>
          <Download size={18} />
          {downloading ? "Preparing PDF" : "Download Resume as PDF"}
        </button>
        <button className="secondary-button" onClick={() => window.print()}>
          <Printer size={18} />
          Print Friendly View
        </button>
      </div>

      <div className="export-summary glass-lite">
        <h3>{resume.profile.fullName}</h3>
        <p>Template: {template.name}</p>
        <p>PDF export uses the live preview, readable typography, real text layers through the page, and ATS-friendly section names.</p>
      </div>
    </MotionPanel>
  );
}

function PreviewPanel({ resume, template, metrics, resumeRef, downloadPdf, downloading }) {
  return (
    <aside className="preview-column">
      <div className="preview-toolbar glass-panel">
        <div>
          <span className="micro-label">Resume Preview</span>
          <strong>{template.name}</strong>
        </div>
        <div>
          <span className="score-pill">
            <Gauge size={15} />
            {metrics.ats}% ATS
          </span>
          <button className="icon-button" onClick={downloadPdf} disabled={downloading} aria-label="Download PDF">
            <Download size={17} />
          </button>
        </div>
      </div>
      <div className="resume-stage">
        <ResumePaper resume={resume} template={template} refProp={resumeRef} />
      </div>
    </aside>
  );
}

function TemplatesGallery({ templateFilter, setTemplateFilter, filteredTemplates, activeTemplateId, applyTemplate, setActiveView }) {
  return (
    <Screen>
      <PanelHeader icon={Layers3} title="20+ Professional Resume Templates" text="Each template changes layout, typography, header treatment, section arrangement, and color system." />
      <div className="filter-tabs" role="tablist" aria-label="Template categories">
        {templateCategories.map((category) => (
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

      <motion.div layout className="template-gallery">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template) => (
            <motion.article
              layout
              key={template.id}
              className={`template-card glass-panel ${activeTemplateId === template.id ? "active" : ""}`}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
            >
              <MiniTemplate template={template} large />
              <div>
                <span className="micro-label">{template.category}</span>
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </div>
              <button
                className={activeTemplateId === template.id ? "secondary-button selected" : "primary-button"}
                onClick={() => {
                  applyTemplate(template);
                  setActiveView("builder");
                }}
              >
                {activeTemplateId === template.id ? <Check size={17} /> : <ArrowRight size={17} />}
                {activeTemplateId === template.id ? "Applied" : "Use Template"}
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Screen>
  );
}

function StoryExperience({ storyRef, progress, onMove }) {
  return (
    <Screen>
      <section className="story-hero glass-panel">
        <div>
          <span className="eyebrow">
            <BookOpen size={16} />
            Cinematic storytelling timeline
          </span>
          <h2>My story is not a straight line. It is a return.</h2>
          <p>
            A horizontal, motion-led timeline about Delhi, coding, Kota, loss, and choosing technology again with a
            clearer sense of purpose.
          </p>
        </div>
        <div className="story-controls">
          <button className="icon-button" onClick={() => onMove(-1)} aria-label="Previous story card">
            <ChevronRight className="rotate-left" size={18} />
          </button>
          <button className="icon-button" onClick={() => onMove(1)} aria-label="Next story card">
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      <section className="story-shell">
        <div className="story-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div ref={storyRef} className="story-track" aria-label="Horizontal story timeline">
          {storyChapters.map((chapter, index) => (
            <motion.article
              key={chapter.title}
              className="story-card glass-panel"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ root: storyRef, amount: 0.45 }}
              transition={{ duration: 0.55, delay: index * 0.03 }}
              style={{ "--story-index": index }}
            >
              <span className="story-year">{chapter.year}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.text}</p>
              <div className="story-path" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </section>
    </Screen>
  );
}

function AdminPanel({ resumes, metrics, templateCount, createNewResume }) {
  return (
    <Screen>
      <section className="admin-hero glass-panel">
        <PanelHeader icon={UserCog} title="Admin Panel" text="Manage users, templates, analytics, and feedback from one operational surface." />
        <button className="primary-button" onClick={createNewResume}>
          <Plus size={18} />
          Create Resume
        </button>
      </section>

      <section className="metrics-grid">
        <MetricCard icon={UserRound} label="Users" value={sampleUsers.length} tone="blue" />
        <MetricCard icon={Layers3} label="Templates" value={templateCount} tone="green" />
        <MetricCard icon={BarChart3} label="Avg ATS" value={`${metrics.ats}%`} tone="gold" />
        <MetricCard icon={FileText} label="Resumes" value={resumes.length} tone="pink" />
      </section>

      <section className="admin-grid">
        <AdminTable title="User Management" icon={UserRound} rows={sampleUsers} />
        <div className="glass-panel template-management">
          <PanelHeader icon={Layers3} title="Template Management" text="All template groups are active and switch live." compact />
          {templateCategories.slice(1).map((category) => (
            <div key={category} className="admin-row">
              <span>{category}</span>
              <strong>{templates.filter((template) => template.category === category).length} templates</strong>
              <small>Active</small>
            </div>
          ))}
        </div>
        <AnalyticsDashboard metrics={metrics} compact />
        <div className="glass-panel feedback-panel">
          <PanelHeader icon={Send} title="Feedback Management" text="Recent product feedback status." compact />
          {feedbackItems.map((item) => (
            <article key={item.name}>
              <span>{item.status}</span>
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>
    </Screen>
  );
}

function AdminTable({ title, icon: Icon, rows }) {
  return (
    <div className="glass-panel admin-table">
      <PanelHeader icon={Icon} title={title} text="Sample user records for the admin experience." compact />
      {rows.map((row) => (
        <div key={row.name} className="admin-row">
          <span>{row.name}</span>
          <strong>{row.plan}</strong>
          <small>{row.resumes} resumes</small>
          <em>{row.status}</em>
        </div>
      ))}
    </div>
  );
}

function AnalyticsDashboard({ metrics, compact = false }) {
  return (
    <div className={`glass-panel analytics-panel ${compact ? "compact" : ""}`}>
      <PanelHeader icon={BarChart3} title="Resume Analytics Dashboard" text="Live quality, completion, and ATS readiness signals." compact />
      <div className="score-rings">
        <ProgressRing value={metrics.completion} label="Progress" />
        <ProgressRing value={metrics.ats} label="ATS" />
      </div>
      <div className="analytics-lines">
        <p>
          <FileText size={16} />
          {metrics.filledSections} sections filled
        </p>
        <p>
          <Globe2 size={16} />
          {metrics.socialCount} social links active
        </p>
        <p>
          <SearchCheck size={16} />
          {metrics.suggestions[0]}
        </p>
      </div>
    </div>
  );
}

function ResumePaper({ resume, template, compact = false, refProp }) {
  const visibleSections = resume.sections.filter((section) => section.content.trim());
  const sidebarLayouts = ["sidebar", "split", "rail", "dark", "columns"];
  const sideIds = ["skills", "technicalSkills", "languages", "hobbies", "references"];
  const hasSidebar = sidebarLayouts.includes(template.layout);
  const sideSections = hasSidebar ? visibleSections.filter((section) => sideIds.includes(section.id)) : [];
  const mainSections = hasSidebar ? visibleSections.filter((section) => !sideIds.includes(section.id)) : visibleSections;
  const activeSocials = socialConfigs.filter((item) => resume.socials[item.id]);

  const style = {
    "--resume-accent": resume.accent || template.accent,
    "--resume-second": resume.second || template.second,
    "--resume-font": template.font === "Georgia" ? "Georgia, serif" : `${template.font}, Inter, Arial, sans-serif`
  };

  return (
    <article
      ref={refProp}
      className={`resume-paper layout-${template.layout} header-${template.header} ${compact ? "compact" : ""}`}
      style={style}
    >
      <header className="resume-header">
        {resume.profile.showPhoto && (
          <div className="resume-photo">
            <ProfileImage resume={resume} />
          </div>
        )}
        <div className="resume-identity">
          <span>{resume.profile.role || "Professional Title"}</span>
          <h2>{resume.profile.fullName || "Your Name"}</h2>
          <p>{getSectionText(resume, "summary")}</p>
        </div>
      </header>

      <div className="resume-contact">
        {resume.profile.email && <span>{resume.profile.email}</span>}
        {resume.profile.phone && <span>{resume.profile.phone}</span>}
        {resume.profile.location && <span>{resume.profile.location}</span>}
        {resume.profile.website && <span>{resume.profile.website}</span>}
      </div>

      {activeSocials.length > 0 && (
        <div className="resume-socials">
          {activeSocials.map(({ id, label, icon: Icon }) => (
            <a key={id} href={resume.socials[id]}>
              <Icon size={13} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      )}

      <div className="resume-body">
        {hasSidebar && (
          <aside className="resume-sidebar">
            {sideSections.map((section) => (
              <ResumeSection key={section.id} section={section} />
            ))}
            <DocumentsBlock resume={resume} />
          </aside>
        )}
        <main className="resume-main">
          {mainSections.map((section) => (
            <ResumeSection key={section.id} section={section} />
          ))}
          {!hasSidebar && <DocumentsBlock resume={resume} />}
        </main>
      </div>
    </article>
  );
}

function ResumeSection({ section }) {
  const Icon = section.icon || FileText;
  const items = parseItems(section.content);

  return (
    <section className={`resume-section section-${section.id}`}>
      <h3>
        <Icon size={14} />
        {section.title}
      </h3>
      {isChipSection(section.id) ? (
        <div className="resume-chips">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : (
        <div className="resume-lines">
          {String(section.content)
            .split("\n")
            .filter(Boolean)
            .map((line) => (
              <p key={line}>{line}</p>
            ))}
        </div>
      )}
    </section>
  );
}

function DocumentsBlock({ resume }) {
  const visibleDocs = documentFields.filter((field) => resume.documents[field.id]);
  if (!resume.documents.visible || visibleDocs.length === 0) return null;

  return (
    <section className="resume-section document-block">
      <h3>
        <ShieldCheck size={14} />
        Identity Documents
      </h3>
      <div className="resume-lines">
        {visibleDocs.map((field) => (
          <p key={field.id}>
            <strong>{field.label}:</strong> {resume.documents[field.id]}
          </p>
        ))}
      </div>
    </section>
  );
}

function ProfileImage({ resume }) {
  const source = resume.profile.photo || avatarData(resume.profile.fullName, resume.accent, resume.second);
  return (
    <img
      src={source}
      alt=""
      style={{
        transform: `scale(${resume.profile.photoZoom}) translate(${resume.profile.photoX}px, ${resume.profile.photoY}px)`
      }}
    />
  );
}

function getSectionText(resume, id) {
  return resume.sections.find((section) => section.id === id)?.content || "";
}

function MiniTemplate({ template, large = false }) {
  return (
    <div
      className={`mini-template mini-${template.layout} ${large ? "large" : ""}`}
      style={{ "--mini-a": template.accent, "--mini-b": template.second }}
    >
      <div className="mini-header">
        <span />
        <div>
          <b />
          <i />
        </div>
      </div>
      <div className="mini-content">
        <aside>
          <span />
          <span />
          <span />
        </aside>
        <main>
          <span />
          <span />
          <span />
          <span />
        </main>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, tone }) {
  return (
    <article className={`metric-card glass-panel tone-${tone}`}>
      <span>
        <Icon size={22} />
      </span>
      <div>
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
    </article>
  );
}

function ProgressRing({ value, label }) {
  return (
    <div className="progress-ring" style={{ "--progress": value }}>
      <span>{value}%</span>
      <small>{label}</small>
    </div>
  );
}

function PanelHeader({ icon: Icon, title, text, action, compact = false }) {
  return (
    <div className={`panel-header ${compact ? "compact" : ""}`}>
      <span className="panel-icon">
        <Icon size={20} />
      </span>
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action && <div className="panel-action">{action}</div>}
    </div>
  );
}

function TextField({ label, value, onChange, type = "text" }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function RangeControl({ icon: Icon, label, value, onChange, min, max, step = "1" }) {
  return (
    <label className="range-control">
      <span>
        {Icon && <Icon size={15} />}
        {label}
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Screen({ children }) {
  return (
    <motion.main
      className="screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28 }}
    >
      {children}
    </motion.main>
  );
}

function MotionPanel({ children, className = "" }) {
  return (
    <motion.section
      className={`glass-panel ${className}`}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </motion.section>
  );
}

export default App;
