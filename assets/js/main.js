/*
  Beginner-friendly data-first approach:
  - Update the PROJECTS array to change the Projects section cards.
  - Update the NOTES array to change the Blog / Notes section cards.
  - When you have real screenshots, set imageUrl to a real file in assets/img/ (or an external URL).
*/

const PROJECTS = [
  {
    title: "Telegram Calendar Bot - Messaging Automation",
    description:
      "A Telegram bot for managing calendar events with ICS import, automatic reminders, and admin-only management commands.",
    tech: ["Ruby", "Telegram Bot API", "ICS", "Redis", "Heroku"],
    githubUrl: "https://github.com/st93642/Calendar_bot",
    demoUrl: "",
    imageUrl: "assets/img/bot.png",
    imageAlt: "Screenshot of Telegram Calendar Bot interface",
  },
  {
    title: "Net_Set - Network Security Toolkit",
    description:
      "A collection of scripts and UI wrappers to configure secure network settings with IPv6, DNS-over-HTTPS (DoH), and strict security policies across Linux, Windows, and Android.",
    tech: ["Shell", "PowerShell", "Kotlin", "DNS-over-HTTPS", "IPv6", "Jetpack Compose"],
    githubUrl: "https://github.com/st93642/Net_Set",
    demoUrl: "",
    imageUrl: "assets/img/placeholder-project.svg",
    imageAlt: "Placeholder screenshot for Net_Set network security toolkit",
  },
  {
    title: "VDownloader - Cross-platform Video Downloader",
    description:
      "A modern, cross-platform video downloader with a GTK4 interface, bundling yt-dlp to download from popular platforms.",
    tech: ["Rust", "GTK4", "yt-dlp", "AppImage", "Windows Batch"],
    githubUrl: "https://github.com/st93642/VDownloader",
    demoUrl: "https://github.com/st93642/VDownloader/releases",
    imageUrl: "assets/img/vdownloader.png",
    imageAlt: "Screenshot of VDownloader desktop application",
  },
  {
    title: "PT Journal - Penetration Testing Learning App",
    description:
      "A GTK4/Libadwaita desktop application for penetration testing education, featuring tutorials, quizzes, and tool documentation—built with Rust.",
    tech: ["Rust", "GTK4", "Libadwaita", "OpenAI / Ollama"],
    githubUrl: "https://github.com/st93642/pt-journal",
    demoUrl: "",
    imageUrl: "assets/img/pt-journal.png",
    imageAlt: "Screenshot of PT Journal penetration testing app",
  },
  {
    title: "Uni Header - VS Code Extension",
    description:
      "A VS Code extension that inserts customizable institution headers/boilerplates and scaffolds projects across many languages, with study tools like Learn Mode, Pomodoro, and a calendar.",
    tech: ["JavaScript", "VS Code Extension API", "Node.js", "HTML", "CSS"],
    githubUrl: "https://github.com/st93642/TSI_Header",
    demoUrl: "https://marketplace.visualstudio.com/items?itemName=st93642.uni-header",
    imageUrl: "assets/img/tsi-header.png",
    imageAlt: "Screenshot of Uni Header VS Code extension",
  },
  {
    title: "Matrix & Vector Calculator - Interactive Web Tool",
    description:
      "Single-file interactive web apps for linear algebra, including a matrix calculator with symbolic algebra and a 2D/3D vector calculator with step-by-step visualization.",
    tech: ["HTML", "CSS", "JavaScript", "Linear Algebra"],
    githubUrl: "https://github.com/st93642/Matrix-Calculator",
    demoUrl: "",
    imageUrl: "assets/img/matrix-calculator.png",
    imageAlt: "Screenshot of Matrix and Vector Calculator web tool",
  },
  {
    title: "Libft - Custom C Utility Library",
    description:
      "A custom C library (42 School Libft) reimplementing common libc utilities and adding extra helpers, organized by function category.",
    tech: ["C", "Makefile", "Shell"],
    githubUrl: "https://github.com/st93642/Libft",
    demoUrl: "",
    imageUrl: "assets/img/libft.png",
    imageAlt: "Screenshot of Libft C library code",
  },
  {
    title: "Ollama Local Wrapper - Browser Chat UI",
    description:
      "A lightweight, browser-based chat interface for local Ollama models that runs without a backend server, including a single-file offline bundle.",
    tech: ["JavaScript", "HTML", "CSS", "Python", "Bootstrap", "Ollama"],
    githubUrl: "https://github.com/st93642/Ollama-local-wrapper",
    demoUrl: "",
    imageUrl: "assets/img/ollama.png",
    imageAlt: "Screenshot of Ollama Local Wrapper chat interface",
  },
];

const NOTES = [
  {
    title: "What I learned building a portfolio (stub)",
    date: "2025-01-15",
    summary: "Notes on keeping things simple: semantic HTML, responsive CSS, and a tiny bit of JavaScript for polish.",
    url: "#",
  },
  {
    title: "From dataset to chart: a repeatable workflow (stub)",
    date: "2025-02-02",
    summary: "A checklist for cleaning data, picking chart types, and validating insights before shipping a dashboard.",
    url: "#",
  },
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupFooterYear() {
  const yearNode = document.querySelector("[data-year]");
  if (!yearNode) return;
  yearNode.textContent = String(new Date().getFullYear());
}

function setupSmoothScroll() {
  const hashLinks = document.querySelectorAll('a[href^="#"]');

  hashLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }

      target.focus({ preventScroll: true });
      window.history.pushState(null, "", href);
    });
  });
}

function applyExternalLink(anchor, url, label) {
  if (!(anchor instanceof HTMLAnchorElement)) return;

  const safeUrl = typeof url === "string" && url.trim() ? url : "#";

  anchor.href = safeUrl;
  anchor.setAttribute("aria-label", label);

  if (safeUrl === "#") {
    anchor.setAttribute("aria-disabled", "true");
    anchor.tabIndex = -1;
    anchor.addEventListener("click", (e) => e.preventDefault());
  }
}

function renderProjects() {
  const container = document.querySelector("[data-projects]");
  const template = document.getElementById("project-card-template");

  if (!container || !(template instanceof HTMLTemplateElement)) return;

  container.innerHTML = "";

  PROJECTS.forEach((project) => {
    const fragment = template.content.cloneNode(true);

    const title = fragment.querySelector("[data-project-title]");
    const description = fragment.querySelector("[data-project-description]");
    const techList = fragment.querySelector("[data-project-tech]");

    const demoLink = fragment.querySelector("[data-project-demo]");
    const demoMediaLink = fragment.querySelector("[data-project-demo-link]");
    const githubLink = fragment.querySelector("[data-project-github]");

    const image = fragment.querySelector("[data-project-image]");

    if (title) title.textContent = project.title;
    if (description) description.textContent = project.description;

    if (image instanceof HTMLImageElement) {
      image.src = project.imageUrl;
      image.alt = project.imageAlt;
    }

    applyExternalLink(githubLink, project.githubUrl, `Open ${project.title} on GitHub (opens in a new tab)`);
    applyExternalLink(demoLink, project.demoUrl, `Open live demo for ${project.title} (opens in a new tab)`);
    applyExternalLink(demoMediaLink, project.demoUrl, `Open live demo for ${project.title} (opens in a new tab)`);

    if (techList instanceof HTMLUListElement) {
      techList.innerHTML = "";
      project.tech.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        techList.appendChild(li);
      });
    }

    container.appendChild(fragment);
  });
}

function renderNotes() {
  const container = document.querySelector("[data-notes]");
  const template = document.getElementById("note-card-template");

  if (!container || !(template instanceof HTMLTemplateElement)) return;

  container.innerHTML = "";

  NOTES.forEach((note) => {
    const fragment = template.content.cloneNode(true);

    const title = fragment.querySelector("[data-note-title]");
    const date = fragment.querySelector("[data-note-date]");
    const summary = fragment.querySelector("[data-note-summary]");
    const link = fragment.querySelector("[data-note-link]");

    if (title) title.textContent = note.title;
    if (summary) summary.textContent = note.summary;

    if (date) {
      const d = new Date(note.date);
      date.textContent = Number.isNaN(d.getTime()) ? note.date : d.toLocaleDateString(undefined, { dateStyle: "medium" });
    }

    applyExternalLink(link, note.url || "#", `Read note: ${note.title}`);

    container.appendChild(fragment);
  });
}

function setupActiveNavLink() {
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = navLinks
    .map((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return null;
      const section = document.querySelector(href);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const match = sections.find((s) => s.section === entry.target);
        if (!match) return;

        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.removeAttribute("aria-current"));
          match.link.setAttribute("aria-current", "page");
        }
      });
    },
    {
      root: null,
      threshold: 0.4,
    }
  );

  sections.forEach(({ section }) => observer.observe(section));
}

function setupMobileNavigation() {
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.querySelector(".nav__list");
  const navOverlay = document.querySelector(".nav__overlay");
  const navLinks = document.querySelectorAll(".nav__link");
  
  if (!navToggle || !navMenu) return;

  function toggleMenu() {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    const newState = !isExpanded;
    
    navToggle.setAttribute("aria-expanded", String(newState));
    navMenu.classList.toggle("nav--open", newState);
    navOverlay?.classList.toggle("nav--open", newState);
    
    // Prevent body scroll when menu is open
    if (newState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
  
  function closeMenu() {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("nav--open");
    navOverlay?.classList.remove("nav--open");
    document.body.style.overflow = "";
  }
  
  // Toggle menu on button click
  navToggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });
  
  // Close menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
  
  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("nav--open")) {
      closeMenu();
      navToggle.focus(); // Return focus to toggle button
    }
  });
  
  // Close menu when clicking on overlay
  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }
  
  // Close menu when clicking outside (outside navMenu and navToggle)
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (
      navMenu.classList.contains("nav--open") &&
      !navMenu.contains(target) &&
      !navToggle.contains(target) &&
      (!navOverlay || !navOverlay.contains(target))
    ) {
      closeMenu();
    }
  });
}

function setupRevealAnimations() {
  // Only run if IntersectionObserver is supported
  if (!("IntersectionObserver" in window)) return;
  
  // Get sections excluding hero, and all cards
  const sections = Array.from(document.querySelectorAll(".section")).filter(
    section => !section.classList.contains("hero")
  );
  const cards = Array.from(document.querySelectorAll(".card"));
  
  const elementsToAnimate = [...sections, ...cards];
  
  if (elementsToAnimate.length === 0) return;
  
  // Add initial state for animations
  elementsToAnimate.forEach((el) => {
    el.classList.add("reveal-element");
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = prefersReducedMotion 
      ? "none"
      : "opacity 0.6s ease-out, transform 0.6s ease-out";
  });
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          
          // Add a small stagger effect for cards within the same parent
          if (el.closest(".cards")) {
            const cards = Array.from(el.closest(".cards").children);
            const index = cards.indexOf(el);
            el.style.transitionDelay = prefersReducedMotion 
              ? "0ms" 
              : `${index * 100}ms`;
          }
          
          // Stop observing once the element has been revealed
          observer.unobserve(el);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );
  
  elementsToAnimate.forEach((el) => observer.observe(el));
}

// Initialize everything when DOM is ready
function init() {
  setupFooterYear();
  renderProjects();
  renderNotes();
  setupSmoothScroll();
  setupActiveNavLink();
  setupMobileNavigation();
  
  // Wait a bit to ensure content is rendered before setting up animations
  setTimeout(() => {
    setupRevealAnimations();
  }, 100);
}

// Run initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
