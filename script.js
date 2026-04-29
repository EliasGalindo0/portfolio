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
   Typing animation
   ============================================= */
const phrases = [
  "Backend Systems",
  "Financial Tech",
  "Rust & Systems Programming",
  "APIs & Microservices",
  "High-Performance Software",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed");

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

  setTimeout(type, delay);
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
  const title = override?.title
    ? override.title
    : repo.name === repo.name?.toLowerCase()
      ? titleFromRepoName(repo.name)
      : repo.name;
  const desc = override?.description
    ? override.description
    : repo.description?.trim() ||
      "Project repository on GitHub. See README for details, setup, and usage.";

  const stars = Number(repo.stargazers_count || 0);
  const overrideTags = Array.isArray(override?.tags) ? override.tags : null;
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
  renderFeaturedProjects();
});
