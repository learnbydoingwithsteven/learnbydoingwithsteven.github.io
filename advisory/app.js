const data = window.PORTFOLIO_DATA;
let currentLang = "zh";

const app = document.getElementById("app");
const langSwitch = document.getElementById("lang-switch");
const homeBrand = document.querySelector("[data-home-brand]");

function tr(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[currentLang] ?? value.zh ?? value.en ?? value.it ?? "";
}

function hrefFor(value) {
  if (typeof value === "string") return value;
  return value[currentLang] ?? value.zh ?? value.en ?? value.it ?? "#";
}

function syncHomeBrand() {
  if (!homeBrand) return;

  const copy = {
    zh: {
      label: "\u8fd4\u56de\u9996\u9875",
      caption: "Learn By Doing with Steven"
    },
    en: {
      label: "Back to home",
      caption: "Learn By Doing with Steven"
    },
    it: {
      label: "Torna alla home",
      caption: "Learn By Doing with Steven"
    }
  };

  const labelNode = homeBrand.querySelector(".brand-label");
  const captionNode = homeBrand.querySelector(".brand-caption");

  if (labelNode) labelNode.textContent = copy[currentLang].label;
  if (captionNode) captionNode.textContent = copy[currentLang].caption;
}

function renderLangSwitch() {
  langSwitch.innerHTML = data.languages
    .map(
      (language) => `
        <button
          class="lang-button ${language.code === currentLang ? "is-active" : ""}"
          data-lang="${language.code}"
          type="button"
        >
          ${language.label}
        </button>
      `
    )
    .join("");

  langSwitch.querySelectorAll(".lang-button").forEach((button) => {
    button.addEventListener("click", () => {
      currentLang = button.dataset.lang;
      renderPage();
    });
  });
}

function renderFacts() {
  const factsTitle = tr(data.meta.factsTitle);

  return `
    <div class="panel">
      ${factsTitle ? `<h2 class="panel-title">${factsTitle}</h2>` : ""}
      <div class="facts-list">
        ${data.meta.facts
          .map(
            (fact) => `
              <div class="fact-item">
                <span class="fact-label">${tr(fact.label)}</span>
                <span class="fact-value">${tr(fact.value)}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderMetrics() {
  return `
    <div class="panel">
      <h2 class="panel-title">${tr({
        zh: "\u5173\u952e\u6307\u6807",
        en: "Key metrics",
        it: "Metriche chiave"
      })}</h2>
      <div class="metric-grid">
        ${data.metrics
          .map(
            (metric) => `
              <div class="metric-card">
                <span class="metric-value">${metric.value}</span>
                <span class="metric-label">${tr(metric.label)}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderHero() {
  const eyebrow = tr(data.meta.eyebrow);
  const heroActions = data.ui?.showHeroActions
    ? `
        <div class="hero-actions">
          ${data.heroActions
            .map(
              (action) => `
                <a class="action-link is-${action.style}" href="${hrefFor(action.href)}" target="_blank" rel="noreferrer">
                  ${tr(action.label)}
                </a>
              `
            )
            .join("")}
        </div>
      `
    : "";

  return `
    <section id="hero" class="hero">
      <div class="hero-card">
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}
        <h1 class="hero-title">
          ${data.meta.name}
          <span class="sub">${tr(data.meta.title)}</span>
        </h1>
        <p class="hero-summary">${tr(data.meta.subtitle)} ${tr(data.meta.summary)}</p>
        ${heroActions}
      </div>
      <div class="hero-side">
        ${renderFacts()}
        ${renderMetrics()}
      </div>
    </section>
  `;
}

function renderSectionHeading(section) {
  const kicker = tr(section.kicker);
  const lead = tr(section.lead);

  return `
    <div class="section-heading">
      <div>
        ${kicker ? `<span class="section-kicker">${kicker}</span>` : ""}
        <h2 class="section-title">${tr(section.title)}</h2>
      </div>
      ${lead ? `<p class="section-lead">${lead}</p>` : ""}
    </div>
  `;
}

function renderCapabilities() {
  return `
    <section class="content-section">
      ${renderSectionHeading(data.sections.capabilities)}
      <div class="capability-grid">
        ${data.capabilities
          .map(
            (item) => `
              <article class="fit-card">
                <span class="fit-tag">${tr(item.tag)}</span>
                <h3 class="fit-title">${tr(item.title)}</h3>
                <p class="fit-copy">${tr(item.copy)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderFit() {
  return `
    <section class="content-section">
      ${renderSectionHeading(data.sections.fit)}
      <div class="fit-grid">
        ${data.fitCards
          .map(
            (item) => `
              <article class="fit-card">
                <span class="fit-tag">${tr(item.tag)}</span>
                <h3 class="fit-title">${tr(item.title)}</h3>
                <p class="fit-copy">${tr(item.copy)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderTimeline() {
  return `
    <section class="content-section">
      ${renderSectionHeading(data.sections.timeline)}
      <div class="timeline-grid">
        ${data.timeline
          .map(
            (item) => `
              <article class="timeline-card">
                <span class="timeline-period">${item.period}</span>
                <h3 class="timeline-title">${tr(item.title)}</h3>
                <p class="timeline-copy">${tr(item.copy)}</p>
                <ul class="timeline-list">
                  ${item.bullets[currentLang]
                    .map((bullet) => `<li>${bullet}</li>`)
                    .join("")}
                </ul>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderNetwork() {
  return `
    <section class="content-section">
      ${renderSectionHeading(data.sections.network)}
      <div class="media-grid">
        ${data.mediaCards
          .map(
            (item) => `
              <article class="media-card">
                <h3 class="media-title">${tr(item.title)}</h3>
                <p class="media-copy">${tr(item.copy)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderTeachingShowcase() {
  const showcase = data.teachingShowcase;
  if (!showcase) return "";

  const filteredItems = showcase.items.filter((item) => item.language === currentLang || item.language === "all");

  if (filteredItems.length === 0) return "";

  const itemsHtml = filteredItems
    .map((item) => {
      const language = item.languageLabel
        ? tr(item.languageLabel)
        : tr({
            zh: item.language === "zh" ? "\u4e2d\u6587" : (item.language === "en" ? "\u82f1\u6587" : "\u610f\u5927\u5229\u8bed"),
            en: item.language === "zh" ? "Chinese" : (item.language === "en" ? "English" : "Italian"),
            it: item.language === "zh" ? "Cinese" : (item.language === "en" ? "Inglese" : "Italiano")
          });
      const archive = tr(showcase.terms[item.archive]);
      const alt = `${tr(item.project)} ${language} ${tr(showcase.terms.montageAlt)}`;

      return `
        <article class="teaching-card reveal">
          <div class="teaching-badges">
            <span class="group-badge">${tr(item.project)}</span>
            <span class="metric-chip">${language}</span>
          </div>
          <h3 class="card-title">${tr(item.project)} / ${language}</h3>
          <p class="card-copy">${item.count} ${tr(showcase.terms.firstSlideCovers)} / ${archive}</p>
          <div class="teaching-image-wrap">
            <img class="teaching-image" src="${item.image}" alt="${alt}" loading="lazy">
          </div>
          <p class="teaching-folder">
            <span class="teaching-folder-label">${tr(showcase.terms.sourceFolder)}:</span>
            <span class="teaching-folder-value">${item.folder}</span>
          </p>
        </article>
      `;
    })
    .join("");

  return `
    <section class="content-section">
      ${renderSectionHeading(showcase.section)}
      <div class="teaching-grid">
        ${itemsHtml}
      </div>
    </section>
  `;
}

function renderProjects() {
  return `
    <section class="content-section">
      ${renderSectionHeading(data.sections.projects)}
      <div class="project-grid">
        ${data.projects
          .map(
            (project) => `
              <article class="project-card">
                <img class="project-thumb" src="${project.image}" alt="${project.title}">
                <span class="project-tag">${tr(project.tag)}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-copy">${tr(project.copy)}</p>
                <ul class="project-list">
                  ${project.bullets[currentLang]
                    .map((bullet) => `<li>${bullet}</li>`)
                    .join("")}
                </ul>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderDocuments() {
  return `
    <section class="content-section">
      ${renderSectionHeading(data.sections.docs)}
      <div class="doc-grid">
        ${data.documents
          .map(
            (doc) => `
              <article class="doc-card">
                <h3 class="doc-title">${tr(doc.title)}</h3>
                <p class="doc-copy">${tr(doc.copy)}</p>
                <div class="doc-links">
                  ${doc.links
                    .map(
                      (link) => `
                        <a class="doc-link" href="${link.href}" target="_blank" rel="noreferrer">
                          ${link.label}
                        </a>
                      `
                    )
                    .join("")}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <section class="footer-card">
      <h2 class="footer-title">${tr(data.sections.footer.title)}</h2>
      <p class="footer-copy">${tr(data.sections.footer.copy)}</p>
      <div class="contact-links">
        ${data.contacts
          .map(
            (contact) => `
              <a class="contact-link" href="${contact.href}" target="_blank" rel="noreferrer">
                ${contact.label}
              </a>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function normalizeTeachingCards() {
  document.querySelectorAll(".teaching-card").forEach((card) => {
    const project = card.querySelector(".group-badge")?.textContent?.trim();
    const language = card.querySelector(".metric-chip")?.textContent?.trim();
    const title = card.querySelector(".card-title");
    const copy = card.querySelector(".card-copy");

    if (project && title) {
      title.textContent = project;
    }

    if (language && copy) {
      const normalized = copy.textContent.replace(/\s+.\s+/g, " / ").replace(/\s+/g, " ").trim();
      copy.textContent = `${language} / ${normalized}`;
    }
  });
}

let revealObserver = null;
function bindReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
  }

  document.querySelectorAll(".hero, .content-section, .panel, .footer-card, .reveal").forEach((el, index) => {
    el.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 70}ms`);
    if (!el.classList.contains("is-visible")) {
      revealObserver.observe(el);
    }
  });
}

function revealNow() {
  document.querySelectorAll(".hero, .content-section, .panel, .footer-card, .reveal").forEach((el, index) => {
    el.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 70}ms`);
    if (index < 8) {
      setTimeout(() => el.classList.add("is-visible"), 55 * index);
    }
  });
}


function renderPage() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : currentLang;
  document.title = `${data.meta.name} | ${tr({
    zh: "\u987e\u95ee\u4e0e\u8bb2\u5e08\u7b80\u4ecb",
    en: "Advisory and Lecturer Profile",
    it: "Profilo di consulenza e docenza"
  })}`;

  renderLangSwitch();
  syncHomeBrand();

  const documentsSection = data.ui?.showDocumentsSection ? renderDocuments() : "";
  const footerSection = data.ui?.showFooterSection ? renderFooter() : "";

  app.innerHTML = [
    renderHero(),
    renderCapabilities(),
    renderFit(),
    renderTimeline(),
    renderNetwork(),
    renderTeachingShowcase(),
    renderProjects(),
    documentsSection,
    footerSection
  ].join("");

  normalizeTeachingCards();
  revealNow();
  bindReveal();
}

renderPage();
