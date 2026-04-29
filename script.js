/* =============================================
   Navigation: scroll-aware glass effect
   ============================================= */
const nav = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

/* =============================================
   i18n: PT-BR ↔ EN toggle
   ============================================= */
const I18N_STORAGE_KEY = "portfolio.lang";
let currentLang = "en";

const I18N = {
  en: {
    "doc.title": "Elias Galindo — Software Engineer",
    "lang.toggle": "PT-BR",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.badge": "Available for opportunities",
    "hero.title": "Software Engineer",
    "hero.specializedIn": "Specialized in",
    "hero.viewProjects": "View Projects",
    "hero.scroll": "scroll",
    "about.label": "About",
    "about.title":
      'Building reliable systems<br /><span class="accent">from Brazil to the world</span>',
    "about.p1":
      'I\'m a backend-focused Software Engineer passionate about systems programming and financial technology. With a strong foundation in low-level languages like <strong>Rust</strong> and <strong>C++</strong>, I build performant, reliable software that handles real business problems.',
    "about.highlight.kicker": "Recent experience",
    "about.highlight.title": "2+ years at a nationally recognized fintech",
    "about.highlight.sub":
      "Building backend systems with a strong focus on reliability, performance, and real-world financial workflows.",
    "about.p2":
      "From crafting APIs in <strong>C#</strong> and <strong>Node.js</strong> to building financial reporting tools in Rust and mobile experiences with <strong>Flutter</strong>, I enjoy working across the full depth of the stack — always prioritizing correctness, performance, and clean architecture.",
    "about.p3":
      "Currently open to backend, systems engineering, and fintech opportunities worldwide.",
    "about.stats.langs": "Languages & Frameworks",
    "about.stats.repos": "Public Repositories",
    "about.stats.years": "Years of Experience",
    "about.stats.based": "Based in Brazil",
    "skills.label": "Skills",
    "skills.title": "Technologies I work with",
    "skills.group.systems": "Systems & Backend",
    "skills.group.web": "Web & Frontend",
    "skills.group.mobile": "Mobile & Scripting",
    "projects.label": "Projects",
    "projects.title": "Selected work",
    "contact.label": "Contact",
    "contact.title": "Open to opportunities",
    "contact.text":
      "I'm currently available for backend engineering, systems programming, and fintech roles. If you're building something interesting, let's talk.",
    "contact.viewGithub": "View GitHub",
    "footer.copy":
      "© 2024 Elias Pires Abrão Galindo. Built with pure HTML, CSS & JS.",
  },
  "pt-BR": {
    "doc.title": "Elias Galindo — Engenheiro de Software",
    "lang.toggle": "EN",
    "nav.about": "Sobre",
    "nav.skills": "Skills",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "hero.badge": "Disponível para oportunidades",
    "hero.title": "Engenheiro de Software",
    "hero.specializedIn": "Especializado em",
    "hero.viewProjects": "Ver Projetos",
    "hero.scroll": "rolar",
    "about.label": "Sobre",
    "about.title":
      'Construindo sistemas confiáveis<br /><span class="accent">do Brasil para o mundo</span>',
    "about.p1":
      'Sou um Engenheiro de Software com foco em backend, apaixonado por programação de sistemas e tecnologia financeira. Com uma base forte em linguagens de baixo nível como <strong>Rust</strong> e <strong>C++</strong>, eu construo software performático e confiável para resolver problemas reais.',
    "about.highlight.kicker": "Experiência recente",
    "about.highlight.title": "2+ anos em uma fintech de reconhecimento nacional",
    "about.highlight.sub":
      "Construindo sistemas backend com foco em confiabilidade, performance e fluxos financeiros do mundo real.",
    "about.p2":
      "De APIs em <strong>C#</strong> e <strong>Node.js</strong> a ferramentas de relatórios financeiros em Rust e experiências mobile com <strong>Flutter</strong>, gosto de atuar em profundidade na stack — sempre priorizando correção, performance e arquitetura limpa.",
    "about.p3":
      "Atualmente aberto a oportunidades em backend, systems engineering e fintech no mundo todo.",
    "about.stats.langs": "Linguagens & Frameworks",
    "about.stats.repos": "Repositórios Públicos",
    "about.stats.years": "Anos de Experiência",
    "about.stats.based": "Baseado no Brasil",
    "skills.label": "Skills",
    "skills.title": "Tecnologias com as quais trabalho",
    "skills.group.systems": "Sistemas & Backend",
    "skills.group.web": "Web & Frontend",
    "skills.group.mobile": "Mobile & Scripts",
    "projects.label": "Projetos",
    "projects.title": "Trabalhos em destaque",
    "contact.label": "Contato",
    "contact.title": "Aberto a oportunidades",
    "contact.text":
      "Atualmente estou disponível para vagas em backend, programação de sistemas e fintech. Se você está construindo algo interessante, vamos conversar.",
    "contact.viewGithub": "Ver GitHub",
    "footer.copy":
      "© 2024 Elias Pires Abrão Galindo. Feito com HTML, CSS e JS puros.",
  },
};

const TYPING_PHRASES = {
  en: [
    "Backend Systems",
    "Financial Tech",
    "Rust & Systems Programming",
    "APIs & Microservices",
    "High-Performance Software",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
  ],
  "pt-BR": [
    "Sistemas Backend",
    "Tecnologia Financeira",
    "Rust & Programação de Sistemas",
    "APIs & Microservices",
    "Software de Alta Performance",
    "Ciência de Dados",
    "Machine Learning",
    "Inteligência Artificial",
  ],
};

function getInitialLang() {
  const saved = localStorage.getItem(I18N_STORAGE_KEY);
  if (saved === "pt-BR" || saved === "en") return saved;
  const navLang = navigator.language || "";
  return navLang.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
}

function applyI18n(lang) {
  const dict = I18N[lang] ?? I18N.en;
  currentLang = lang;

  document.documentElement.lang = lang === "pt-BR" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const v = dict[key];
    if (typeof v === "string") el.textContent = v;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (!key) return;
    const v = dict[key];
    if (typeof v === "string") el.innerHTML = v;
  });
}

function setLang(lang) {
  const normalized = lang === "pt-BR" ? "pt-BR" : "en";
  localStorage.setItem(I18N_STORAGE_KEY, normalized);
  applyI18n(normalized);
  setTypingLanguage(normalized);
}

/* =============================================
   Typing animation
   ============================================= */
let phrases = TYPING_PHRASES.en.slice();

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed");

let typingTimer = null;

function setTypingLanguage(lang) {
  phrases = (TYPING_PHRASES[lang] ?? TYPING_PHRASES.en).slice();
  phraseIndex = 0;
  charIndex = 0;
  isDeleting = false;
  if (typedEl) typedEl.textContent = "";
  if (typingTimer) clearTimeout(typingTimer);
// typing is initialized on DOMContentLoaded (after i18n is applied)
}

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, --charIndex);
  } else {
    typedEl.textContent = current.slice(0, ++charIndex);
  }

  let delay = isDeleting ? 45 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(type, delay);
}

type();

/* =============================================
   Scroll reveal with Intersection Observer
   ============================================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings within the same parent grid/group
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll(".reveal:not(.visible)"),
        );
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(
          () => {
            entry.target.classList.add("visible");
          },
          Math.min(delay, 400),
        );
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

function observeReveals(root = document) {
  root.querySelectorAll(".reveal").forEach((el) => {
    if (!el.classList.contains("visible")) revealObserver.observe(el);
  });
}

observeReveals();

/* =============================================
   Skill bars: animate width when visible
   ============================================= */
const bars = document.querySelectorAll(".bar-fill");
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const w = target.dataset.w;
        setTimeout(() => {
          target.style.width = w + "%";
        }, 200);
        barObserver.unobserve(target);
      }
    });
  },
  { threshold: 0.5 },
);

bars.forEach((bar) => barObserver.observe(bar));

/* =============================================
   Smooth active nav link highlight
   ============================================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => (a.style.color = ""));
        const active = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`,
        );
        if (active) active.style.color = "var(--accent)";
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((s) => sectionObserver.observe(s));

/* =============================================
   Project card: subtle mouse-tracking glow
   ============================================= */
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", x + "%");
    card.style.setProperty("--my", y + "%");
  });
});

/* =============================================
   Projects: load featured repos from GitHub
   ============================================= */
const GITHUB_USER = "EliasGalindo0";

// Add your next 3 important repos here (just the repo name).
const FEATURED_REPOS = [
  "PAICS",
  "real-time-analytics-engine",
  "ai-support-agent",
  "financial-data-platform",
  "crm-ze-vip",
  "MediSync",
  "financial-report-rust",
  "emailsenderapi",
  "neuro-sales",
];

// Per-repo overrides (title/description/tags/highlight).
// Keep this small and focused: it’s your “curated” project list.
const FEATURED_OVERRIDES = {
  PAICS: {
    title: "PAICS",
    description:
      "Production-grade veterinary reporting system that uses LLMs to draft ultrasound and X-ray reports. Full platform with auth, dashboards, FastAPI + Next.js, MongoDB, and a knowledge base + vector DB (ChromaDB) to support consistent reporting.",
    tags: ["In production", "LLM", "Vet Imaging", "FastAPI", "Next.js"],
    highlight: true,
  },
  "real-time-analytics-engine": {
    title: "Real-time Analytics Engine",
    description:
      "Real-time analytics pipeline focused on low-latency event processing, aggregation, and operational observability. Designed to handle high-throughput workloads with correctness and performance in mind.",
    tags: ["Real-time", "Analytics", "Performance", "Backend"],
    highlight: true,
  },
  "ai-support-agent": {
    title: "AI Support Agent",
    description:
      "AI-powered support agent showcasing tool-driven workflows, structured prompting, and automation-oriented architecture. Built to be extended with integrations and domain knowledge.",
    tags: ["AI", "Agents", "Automation"],
    highlight: true,
  },
  "financial-data-platform": {
    title: "Financial Data Platform",
    description:
      "FinTech-oriented platform project centered on performance, correctness, and maintainability for financial data processing workflows and reporting pipelines.",
    tags: ["FinTech", "Data", "Systems"],
    highlight: true,
  },
  "crm-ze-vip": {
    title: "CRM Zë VIP",
    description:
      "Private SaaS CRM used in production at my automotive detailing business. Built to manage customers, operations, and the full workflow end-to-end. Repo is private due to business data and product strategy.",
    tags: ["In production", "SaaS", "Private"],
    highlight: true,
    private: true,
  },
};

const FEATURED_OVERRIDES_I18N = {
  en: {
    PAICS: {
      title: "PAICS",
      description:
        "Production-grade veterinary reporting system that uses LLMs to draft ultrasound and X-ray reports. Full platform with auth, dashboards, FastAPI + Next.js, MongoDB, and a knowledge base + vector DB (ChromaDB) to support consistent reporting.",
      tags: ["In production", "LLM", "Vet Imaging", "FastAPI", "Next.js"],
    },
    "real-time-analytics-engine": {
      title: "Real-time Analytics Engine",
      description:
        "Real-time analytics pipeline focused on low-latency event processing, aggregation, and operational observability. Designed to handle high-throughput workloads with correctness and performance in mind.",
      tags: ["Real-time", "Analytics", "Performance", "Backend"],
    },
    "ai-support-agent": {
      title: "AI Support Agent",
      description:
        "AI-powered support agent showcasing tool-driven workflows, structured prompting, and automation-oriented architecture. Built to be extended with integrations and domain knowledge.",
      tags: ["AI", "Agents", "Automation"],
    },
    "financial-data-platform": {
      title: "Financial Data Platform",
      description:
        "FinTech-oriented platform project centered on performance, correctness, and maintainability for financial data processing workflows and reporting pipelines.",
      tags: ["FinTech", "Data", "Systems"],
    },
    "crm-ze-vip": {
      title: "CRM Zë VIP",
      description:
        "Private SaaS CRM used in production at my automotive detailing business. Built to manage customers, operations, and the full workflow end-to-end. Repo is private due to business data and product strategy.",
      tags: ["In production", "SaaS", "Private"],
    },
  },
  "pt-BR": {
    PAICS: {
      title: "PAICS",
      description:
        "Sistema de laudos veterinários em produção que usa LLM para apoiar a geração de laudos de ultrassom e raios-X. Plataforma completa com autenticação, dashboards, FastAPI + Next.js, MongoDB, base de conhecimento e vector DB (ChromaDB) para consistência e reuso de casos.",
      tags: ["Em produção", "LLM", "Imagem Vet", "FastAPI", "Next.js"],
    },
    "real-time-analytics-engine": {
      title: "Real-time Analytics Engine",
      description:
        "Pipeline de analytics em tempo real com foco em baixa latência para processamento de eventos, agregações e observabilidade. Pensado para alto throughput com performance e correção.",
      tags: ["Tempo real", "Analytics", "Performance", "Backend"],
    },
    "ai-support-agent": {
      title: "AI Support Agent",
      description:
        "Agente de suporte com IA mostrando workflows orientados a ferramentas, prompting estruturado e arquitetura focada em automação e extensibilidade.",
      tags: ["IA", "Agentes", "Automação"],
    },
    "financial-data-platform": {
      title: "Financial Data Platform",
      description:
        "Projeto de plataforma voltada a FinTech com foco em performance, correção e manutenibilidade para fluxos de processamento de dados e relatórios.",
      tags: ["FinTech", "Dados", "Sistemas"],
    },
    "crm-ze-vip": {
      title: "CRM Zë VIP",
      description:
        "SaaS CRM privado em produção usado na minha estética automotiva. Construído para gerenciar clientes, operação e workflow ponta a ponta. O repositório é privado por conter estratégia de produto e dados do negócio.",
      tags: ["Em produção", "SaaS", "Privado"],
    },
  },
};

const LANGUAGE_BADGE_CLASS = new Map([
  ["TypeScript", "badge-ts"],
  ["JavaScript", "badge-js"],
  ["Python", "badge-python"],
  ["Rust", "badge-rust"],
  ["Go", "badge-go"],
  ["C#", "badge-csharp"],
  ["C++", "badge-cpp"],
  ["Dart", "badge-dart"],
  ["PHP", "badge-php"],
]);

function esc(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function titleFromRepoName(name) {
  return name
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function projectCard(repo) {
  const override = FEATURED_OVERRIDES[repo.name] ?? null;
  const isHighlight = Boolean(override?.highlight);
  const lang = repo.language || "Project";
  const badgeClass = LANGUAGE_BADGE_CLASS.get(lang) ?? "badge-js";
  const localized = FEATURED_OVERRIDES_I18N[currentLang]?.[repo.name] ?? null;
  const title = localized?.title
    ? localized.title
    : override?.title
      ? override.title
    : repo.name === repo.name?.toLowerCase()
      ? titleFromRepoName(repo.name)
      : repo.name;
  const fallbackDesc =
    currentLang === "pt-BR"
      ? "Repositório do projeto no GitHub. Veja o README para detalhes, setup e uso."
      : "Project repository on GitHub. See README for details, setup, and usage.";
  const desc = localized?.description
    ? localized.description
    : override?.description
      ? override.description
      : repo.description?.trim() || fallbackDesc;

  const stars = Number(repo.stargazers_count || 0);
  const overrideTags = Array.isArray(localized?.tags)
    ? localized.tags
    : Array.isArray(override?.tags)
      ? override.tags
      : null;
  const footer = overrideTags?.length
    ? overrideTags.map((t) => `<span class="card-tag">${esc(t)}</span>`).join("")
    : stars > 0
      ? `<span class="card-star">★ ${stars}</span>`
      : `<span class="card-tag">${esc(lang)}</span>`;

  return `
    <article class="project-card reveal${isHighlight ? " project-card--highlight" : ""}">
      <div class="card-header">
        <span class="badge ${esc(badgeClass)}">${esc(lang)}</span>
        ${isHighlight ? `<span class="badge badge-featured">Featured</span>` : ""}
        ${
          repo.html_url
            ? `<a href="${esc(repo.html_url)}" target="_blank" rel="noopener" class="card-link" aria-label="View ${esc(repo.name)} on GitHub">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
        </a>`
            : ""
        }
      </div>
      <h3 class="card-title">${esc(title)}</h3>
      <p class="card-desc">${esc(desc)}</p>
      <div class="card-footer">
        ${footer}
      </div>
    </article>
  `.trim();
}

async function fetchRepo(repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${repoName}`,
    {
      headers: { Accept: "application/vnd.github+json" },
    },
  );
  if (!res.ok)
    throw new Error(`Failed to fetch repo ${repoName}: ${res.status}`);
  return await res.json();
}

function syntheticPrivateRepo(name) {
  return {
    name,
    html_url: null,
    language: "SaaS",
    description: null,
    stargazers_count: 0,
  };
}

async function renderFeaturedProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const uniqueNames = Array.from(new Set(FEATURED_REPOS)).filter(Boolean);
  if (uniqueNames.length === 0) return;

  try {
    const repos = await Promise.all(
      uniqueNames.map(async (name) => {
        const override = FEATURED_OVERRIDES[name] ?? null;
        if (override?.private) return syntheticPrivateRepo(name);
        return await fetchRepo(name);
      }),
    );
    grid.innerHTML = repos.map(projectCard).join("\n\n");

    // Re-enable reveal animation for new nodes
    observeReveals(grid);

    // Re-enable glow tracking for new cards
    grid.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      });
    });
  } catch (e) {
    // If GitHub is rate-limiting or offline, keep the static HTML.
    console.warn(e);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Init language toggle early
  const initialLang = getInitialLang();
  applyI18n(initialLang);
  setTypingLanguage(initialLang);

  const toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = localStorage.getItem(I18N_STORAGE_KEY) || initialLang;
      setLang(current === "pt-BR" ? "en" : "pt-BR");
    });
  }

  renderFeaturedProjects();
});
