/**
 * Structured CV data (source: Ashish_Khanijo_CV_new.pdf).
 * Translatable fields are { en, de }; resolve them with `tr(value, locale)`.
 * Phase 4: the chatbot's knowledge base will be generated from this same data.
 */
import type { Locale } from "@/i18n/config";

export type T = { en: string; de: string };
export const tr = (v: T, locale: Locale) => v[locale];

export const contact = {
  email: "askhanijo20@gmail.com",
  // Base64 so the number isn't plain text in the HTML; revealed on click.
  phoneEncoded: "KzQzIDY3NzYzMTA4MzI1",
  location: { en: "Vienna, Austria", de: "Wien, Österreich" },
  github: "https://github.com/AshishKhanijo20",
  linkedin: "https://www.linkedin.com/in/ashish-khanijo-19109819b",
};

export type Camp = {
  /** Alpine label shown above the entry */
  camp: T;
  period: T;
  title: T;
  org: string;
  place: T;
  points: T[];
};

/** Career "ascent", summit first. */
export const ascent: Camp[] = [
  {
    camp: { en: "Summit push", de: "Gipfelsturm" },
    period: { en: "Jun 2026 – Present", de: "Jun 2026 – heute" },
    title: { en: "IT Innovation Intern", de: "IT Innovation Intern" },
    org: "International Atomic Energy Agency (IAEA)",
    place: { en: "Vienna, Austria", de: "Wien, Österreich" },
    points: [
      {
        en: "Built an AI agent prototype automating SDLC tasks with custom tools and Model Context Protocol (MCP) integrations.",
        de: "Prototyp eines KI-Agenten entwickelt, der SDLC-Aufgaben mit eigenen Tools und Model-Context-Protocol-(MCP)-Integrationen automatisiert.",
      },
      {
        en: "Worked with security, DevOps and developer teams on secure coding, threat modeling and safe deployment of AI systems.",
        de: "Mit Security-, DevOps- und Entwicklungsteams an sicherem Coding, Threat Modeling und sicherem Deployment von KI-Systemen gearbeitet.",
      },
      {
        en: "Automated emergency-response workflows with Power Automate, Power Apps and Copilot Studio.",
        de: "Notfall-Workflows mit Power Automate, Power Apps und Copilot Studio automatisiert.",
      },
      {
        en: "Ran workshops and demos to help teams adopt new AI tools and frameworks.",
        de: "Workshops und Demos geleitet, um Teams beim Einsatz neuer KI-Tools zu unterstützen.",
      },
    ],
  },
  {
    camp: { en: "High camp", de: "Hochlager" },
    period: { en: "Dec 2021 – May 2026", de: "Dez 2021 – Mai 2026" },
    title: { en: "Software Engineer", de: "Softwareentwickler" },
    org: "HCL Technologies",
    place: { en: "Noida, India", de: "Noida, Indien" },
    points: [
      {
        en: "Designed and implemented backend components in C# and .NET following enterprise practices.",
        de: "Backend-Komponenten in C# und .NET nach Enterprise-Standards entworfen und umgesetzt.",
      },
      {
        en: "Built data pipelines for AI-based monitoring automation — ingestion, processing and analysis.",
        de: "Datenpipelines für KI-gestütztes Monitoring entwickelt — Ingestion, Verarbeitung und Analyse.",
      },
      {
        en: "Optimized critical SQL queries and contributed to hybrid real-time/batch monitoring designs.",
        de: "Kritische SQL-Abfragen optimiert und an hybriden Echtzeit-/Batch-Architekturen mitgewirkt.",
      },
    ],
  },
  {
    camp: { en: "Base camp", de: "Basislager" },
    period: { en: "Nov 2020 – Nov 2021", de: "Nov 2020 – Nov 2021" },
    title: { en: "Apprenticeship", de: "Ausbildung" },
    org: "HCL Technologies",
    place: { en: "Noida, India", de: "Noida, Indien" },
    points: [
      {
        en: "One-year apprenticeship in C# and .NET — application development, backend services and debugging — leading to a full-time role.",
        de: "Einjährige Ausbildung in C# und .NET — Anwendungsentwicklung, Backend-Services und Debugging — mit anschließender Festanstellung.",
      },
    ],
  },
];

export const skillGroups: { title: T; items: string[] }[] = [
  {
    title: { en: "AI & ML", de: "KI & ML" },
    items: ["LLM agents", "Model Context Protocol", "Generative AI", "Machine Learning", "TensorFlow", "Keras", "OpenCV"],
  },
  {
    title: { en: "Backend & Data", de: "Backend & Daten" },
    items: ["C# / .NET", "Python", "SQL", "FastAPI", "SQLModel", "PostgreSQL", "SQL Server", "Pandas", "Streamlit"],
  },
  {
    title: { en: "Tools & Platforms", de: "Tools & Plattformen" },
    items: ["Docker", "AWS EC2", "Git / GitHub", "GitLab", "Power Automate", "Power Apps", "Copilot Studio"],
  },
];

export const education = {
  degree: {
    en: "B.Sc. Design and Computing (Work-Integrated Learning)",
    de: "B.Sc. Design and Computing (berufsbegleitend)",
  },
  school: "BITS Pilani",
  period: "2022 – 2026",
  note: {
    en: "CGPA 8.60/10 — completed alongside full-time work at HCL.",
    de: "CGPA 8,60/10 — berufsbegleitend neben Vollzeitstelle bei HCL abgeschlossen.",
  },
};

export const certifications: string[] = [
  "Machine Learning Specialization — Coursera",
  "Machine Learning & Deep Learning — NPTEL",
  "Data Analytics with Python — NPTEL",
  "Cloud IoT Edge ML — NPTEL",
];

export const languages: { name: T; level: T }[] = [
  { name: { en: "English", de: "Englisch" }, level: { en: "Fluent (C1/C2)", de: "Fließend (C1/C2)" } },
  { name: { en: "German", de: "Deutsch" }, level: { en: "Intermediate (B1/B2)", de: "Mittelstufe (B1/B2)" } },
  { name: { en: "Hindi", de: "Hindi" }, level: { en: "Native", de: "Muttersprache" } },
];

export const stats: { value: string; label: T }[] = [
  { value: "4.5+", label: { en: "years engineering", de: "Jahre Entwicklung" } },
  { value: "IAEA", label: { en: "AI innovation, Vienna", de: "KI-Innovation, Wien" } },
  { value: "8.6", label: { en: "CGPA, BITS Pilani", de: "CGPA, BITS Pilani" } },
  { value: "3", label: { en: "languages spoken", de: "Sprachen" } },
];
