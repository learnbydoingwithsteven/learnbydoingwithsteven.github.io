const data = window.PORTFOLIO_DATA;
let currentLang = "zh";

const app = document.getElementById("app");
const langSwitch = document.getElementById("lang-switch");

function tr(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[currentLang] ?? value.zh ?? value.en ?? value.it ?? "";
}

function hrefFor(value) {
  if (typeof value === "string") return value;
  return value[currentLang] ?? value.zh ?? value.en ?? value.it ?? "#";
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
  return `
    <div class="panel">
      <h2 class="panel-title">${tr({
        zh: "快速信息",
        en: "Quick facts",
        it: "Informazioni rapide"
      })}</h2>
      <div class="bullet-list">
        ${data.meta.facts
          .map(
            (fact) => `
              <div><strong>${tr(fact.label)}:</strong> ${tr(fact.value)}</div>
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
        zh: "关键指标",
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
        <span class="eyebrow">${tr(data.meta.eyebrow)}</span>
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
  return `
    <div class="section-heading">
      <div>
        <span class="section-kicker">${tr(section.kicker)}</span>
        <h2 class="section-title">${tr(section.title)}</h2>
      </div>
      <p class="section-lead">${tr(section.lead)}</p>
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

function renderPage() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : currentLang;
  document.title = `${data.meta.name} | ${tr({
    zh: "讲师介绍",
    en: "Lecturer Profile",
    it: "Profilo docente"
  })}`;

  renderLangSwitch();

  const documentsSection = data.ui?.showDocumentsSection ? renderDocuments() : "";
  const footerSection = data.ui?.showFooterSection ? renderFooter() : "";

  app.innerHTML = [
    renderHero(),
    renderCapabilities(),
    renderFit(),
    renderTimeline(),
    renderNetwork(),
    renderProjects(),
    documentsSection,
    footerSection
  ].join("");
}

renderPage();
