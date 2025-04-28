Below is a full makeover plan—plus copy–paste-ready code—for both your profile README and Github Pages portfolio.
If you apply every snippet exactly as shown you will get:
	•	a visually-engaging, badge-rich profile that tracks views, spotlights content and passes the “three-second scan” test;  ￼
	•	a modern, accessible, SEO-and-PWA-ready Jekyll site (using the Minimal Mistakes remote theme) that auto-deploys with GitHub Actions.  ￼ ￼

⸻

1  Profile README revamp

1.1 What to change & why

Area	Change	Why it matters
Header	Add hero banner + tagline	Instantly communicates brand & value  ￼
Badges	Shields for subs, followers, stars, profile views	Quick social proof; easy to maintain  [oai_citation:4‡Shields.io
About	Concise mission + emoji bullets	Keeps first scroll under 100 words (best-practice)  ￼
Content hub	Two-column “I create / Where to find me” tables	Lets visitors jump straight to YouTube, Substack, etc.
Featured work	Auto-updated pinned repo list & YouTube thumbnail GIF	Shows living activity; increases click-through
Stats	github-readme-stats and streak-stats cards	Adds quantified credibility
Footer	Visitor counter + contact buttons	Encourages DM’s; measures reach  ￼

1.2 Drop-in README.md

<!-- profile/README.md  -->
<h1 align="center">
  <img src="https://raw.githubusercontent.com/learnbydoingwithsteven/branding/main/banner.svg" width="100%"/>
</h1>

<p align="center">
  <strong>AI • ML • Learning-by-doing</strong><br>
  Turning complex ideas into hands-on tutorials in 🇬🇧&nbsp;/&nbsp;🇨🇳
</p>

<p align="center">
  <!-- social badges -->
  <a href="https://youtube.com/@learnbydoingwithsteven"><img src="https://img.shields.io/youtube/channel/subscribers/UCyyyy?style=social" alt="YouTube subs"/></a>
  <a href="https://substack.com/@learnbydoingwithsteven"><img src="https://img.shields.io/badge/Substack-read-ff6719?logo=substack&logoColor=white"/></a>
  <a href="https://x.com/catchingtides"><img src="https://img.shields.io/twitter/follow/catchingtides?style=social"/></a>
  <a href="https://github.com/learnbydoingwithsteven"><img src="https://komarev.com/ghpvc/?username=learnbydoingwithsteven&style=flat" alt="profile views"/></a>
</p>

---

### 👋 Hi, I’m Steven @ Learn By Doing

```yaml
- 🌱  I teach AI/ML by **building real projects live**
- 🎥  Weekly videos  &nbsp;▸ YouTube + Bilibili
- 📰  Fortnightly essays ▸ Substack + LinkedIn
- 🛠️  Favorite stack: LangChain · Streamlit · FastAPI · Ollama

🏗 Latest Projects

 	 
	Chat Bot w/ OllamaStreamlit UI · switchable LLMs · RAG support

📊 Github Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=learnbydoingwithsteven&show_icons=true&hide_border=true"/>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=learnbydoingwithsteven&hide_border=true"/>
</p>




⸻

☕  Like the content?  Buy me a coffee

*All badges are powered by **Shields.io** and the view counter by **komarev.com**; they’re totally free and require no secrets.*  [oai_citation:8‡Shields.io | Shields.io](https://shields.io/?utm_source=chatgpt.com) [oai_citation:9‡blog.natterstefan.me](https://blog.natterstefan.me/count-page-views-on-your-github-profile-with-this-one-liner?utm_source=chatgpt.com)  

---

## 2  GitHub Pages overhaul (`learnbydoingwithsteven.github.io`)

### 2.1 Switch to **Minimal Mistakes** remote theme

```yaml
# _config.yml  — only the deltas
remote_theme: "mmistakes/minimal-mistakes@4.27.0"   # easy upgrades  [oai_citation:10‡mmistakes.github.io](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/?utm_source=chatgpt.com)
plugins:
  - jekyll-include-cache
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
defaults:
  - scope:
      path: ""             # all files
      type: "posts"
    values:
      layout: single
      author_profile: true

Why: out-of-the-box pagination, categories, TOC, dark-mode skin, SEO tags and full GitHub Pages compatibility.  ￼

2.2 _data/navigation.yml (adds blog/search links)

main:
  - title: "Home"    url: /
  - title: "Projects" url: /projects/
  - title: "Blog"     url: /blog/
  - title: "Talks"    url: /talks/
  - title: "Contact"  url: /contact/

2.3 SEO & Social meta (_includes/head/custom.html)

{% seo %} <!-- jekyll-seo-tag -->
<meta property="og:type"        content="website">
<meta property="og:title"       content="{{ page.title | default: site.title }}">
<meta property="og:description" content="{{ page.excerpt | strip_html }}">
<meta property="og:image"       content="{{ site.url }}/assets/cover.png"><!-- Open Graph  [oai_citation:12‡Facebook for Developers](https://developers.facebook.com/docs/opengraph/distribution/?utm_source=chatgpt.com) -->
<meta name="twitter:card"       content="summary_large_image"><!-- Twitter Cards  [oai_citation:13‡Use Cases, Tutorials, & Documentation](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary.html?utm_source=chatgpt.com) -->

2.4 Dark-mode + custom palette (assets/css/_custom.scss)

// automatic (prefers-color-scheme) first …  [oai_citation:14‡MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-color-scheme?utm_source=chatgpt.com)
@media (prefers-color-scheme: dark) {
  body {
    --bg: #111; --text: #e0e0e0;
    background: var(--bg); color: var(--text);
  }
}
// manual toggle (adds .dark class on <html>)
html.dark { @media all { background:#111; color:#e0e0e0; } }

2.5 Accessibility tweaks
	•	Use 3 : 1 contrast on icons/text and 4.5 : 1 on body copy to meet WCAG 2.2 AA.  ￼ ￼
	•	Add aria-label to nav links and lang="en" on <html>.

2.6 Progressive-Web-App layer

manifest.webmanifest

{
  "name": "Learn By Doing With Steven",
  "short_name": "LBDWS",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0d1117",
  "theme_color": "#36c",
  "icons": [
    { "src": "/assets/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/assets/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```  [oai_citation:17‡web.dev](https://web.dev/articles/add-manifest?utm_source=chatgpt.com)  

#### `service-worker.js`

```js
const CACHE = "lbdws-v1";
const OFFLINE = "/offline.html";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        OFFLINE,
        "/assets/css/main.css",
        "/assets/js/dark-toggle.js",
        "/manifest.webmanifest"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request).then(r => r || caches.match(OFFLINE)))
  );
});
```  [oai_citation:18‡web.dev](https://web.dev/case-studies/dance-tonite?utm_source=chatgpt.com)  

Add to `head`:

```html
<link rel="manifest" href="/manifest.webmanifest">
<script>navigator.serviceWorker?.register('/service-worker.js');</script>

2.7 Auto-deploy with GitHub Actions

.github/workflows/pages.yml

name: Build & Deploy Pages
on:
  push:
    branches: ["main"]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-ruby@v4
        with: {ruby-version: '3.3'}
      - run: gem install bundler && bundle install --path vendor/bundle
      - run: JEKYLL_ENV=production bundle exec jekyll build -d _site
      - uses: actions/upload-pages-artifact@v3
        with: {path: _site}
  deploy:
    needs: build
    uses: actions/deploy-pages@v3
```  [oai_citation:19‡GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site?utm_source=chatgpt.com) [oai_citation:20‡GitHub Docs](https://docs.github.com/en/actions/use-cases-and-examples/deploying/deploying-with-github-actions?utm_source=chatgpt.com)  

---

## 3  New repo structure

.
├── .github/workflows/pages.yml
├── _config.yml
├── _data/navigation.yml
├── _posts/2025-04-28-ollama-tutorial.md
├── assets/
│   ├── css/_custom.scss
│   ├── js/dark-toggle.js
│   └── icon-*.png
├── manifest.webmanifest
└── service-worker.js

*(The posts folder keeps your Substack mirrors so you own the canonical content.)*

---

## 4  Next Steps & tips

1. **Run Lighthouse** after deploying to verify PWA, performance, accessibility and SEO scores > 90.  [oai_citation:21‡web.dev](https://web.dev/articles/performance-audit-tools?utm_source=chatgpt.com)  
2. Add JSON-LD `Person` structured data for richer Google results.  [oai_citation:22‡Yoast developer portal](https://developer.yoast.com/features/schema/functional-specification/?utm_source=chatgpt.com)  
3. Use GitHub Discussions to collect topic requests and surface the **Discussions** badge in your profile.

Enjoy your new, future-proof presence! 🚀


Below is a cleaned-up README.md fragment that (a) surfaces six flagship projects instead of one, (b) tucks the longer catalog into tidy collapsible menus, and (c) keeps your file under two screen-lengths before the first fold. All links/cards update themselves, so you only edit once.

⸻

🔑 What changed (quick recap)
	•	Table-style “Featured Projects” now shows six eye-catchers with live repo cards generated by github-readme-stats; this follows GitHub’s own advice to highlight 3-5 repos for recruiters  ￼.
	•	Beneath that, four category accordions (<details> blocks) list every other project—an accepted GitHub-Markdown pattern for folding content  ￼.
	•	A lightweight Profile-Summary-Cards Action (see YAML at the bottom) refreshes the cards nightly, so new stars/commits appear without manual edits  ￼.
	•	Badges for profile views use komarev—popular, no tokens needed  ￼.
	•	The layout keeps your “hero”, social buttons, and mission statement exactly where they were (best practice: vitals visible <3 s)  ￼.

⸻

📝 Drop-in README section

<!-- ====== FEATURED WORK ====== -->
## 🚀 Featured Projects
<table>
  <tr>
    <td valign="top">
      <a href="https://github.com/learnbydoingwithsteven/Autogen_Agents">
        <img src="https://github-readme-stats.vercel.app/api/pin/?username=learnbydoingwithsteven&repo=Autogen_Agents&theme=default" />
      </a>
    </td>
    <td valign="top">
      <a href="https://github.com/learnbydoingwithsteven/Crew_AI_Agents">
        <img src="https://github-readme-stats.vercel.app/api/pin/?username=learnbydoingwithsteven&repo=Crew_AI_Agents&theme=default" />
      </a>
    </td>
  </tr>
  <tr>
    <td valign="top">
      <a href="https://github.com/learnbydoingwithsteven/Stock_News_Sentiment">
        <img src="https://github-readme-stats.vercel.app/api/pin/?username=learnbydoingwithsteven&repo=Stock_News_Sentiment&theme=default" />
      </a>
    </td>
    <td valign="top">
      <a href="https://github.com/learnbydoingwithsteven/Python_Data_Analysis">
        <img src="https://github-readme-stats.vercel.app/api/pin/?username=learnbydoingwithsteven&repo=Python_Data_Analysis&theme=default" />
      </a>
    </td>
  </tr>
  <tr>
    <td valign="top">
      <a href="https://github.com/learnbydoingwithsteven/Local_LLM_Solutions">
        <img src="https://github-readme-stats.vercel.app/api/pin/?username=learnbydoingwithsteven&repo=Local_LLM_Solutions&theme=default" />
      </a>
    </td>
    <td valign="top">
      <a href="https://github.com/learnbydoingwithsteven/Youtube">
        <img src="https://github-readme-stats.vercel.app/api/pin/?username=learnbydoingwithsteven&repo=Youtube&theme=default" />
      </a>
    </td>
  </tr>
</table>

<!-- ====== FULL CATALOG ====== -->
<details>
  <summary><b>🤖 AutoGen & Multi-Agent Systems</b></summary>

| Project | What it does | Stack |
|---------|--------------|-------|
| [AutoGen Research Group Chat](https://github.com/learnbydoingwithsteven/Autogen_Agents) | Multi-agent workspace for literature reviews | AutoGen, LangChain |
| [Crew AI Agents](https://github.com/learnbydoingwithsteven/Crew_AI_Agents) | Goal-oriented crews with RAG memory | Crew AI, FastAPI |

</details>

<details>
  <summary><b>🎯 Prompt Engineering & LLMs</b></summary>

| Project | Purpose | Highlights |
|---------|---------|------------|
| [Enhanced Prompting](https://github.com/learnbydoingwithsteven/Enhanced_Prompting) | Library of prompt patterns | Few-shot, CoT, ReAct |
| [Local LLM Deployment](https://github.com/learnbydoingwithsteven/Local_LLM_Solutions) | One-click scripts for 13B models | Ollama, CTranslate2 |

</details>

<details>
  <summary><b>📈 AI / ML Applications</b></summary>

| Project | Domain | Key tech |
|---------|--------|----------|
| [Stock News Sentiment](https://github.com/learnbydoingwithsteven/Stock_News_Sentiment) | Finance | spaCy, FinBERT |
| [AI-Powered Analytics](https://github.com/learnbydoingwithsteven/AI-Powered-Analytics) | DataViz | Streamlit, Plotly |

</details>

<details>
  <summary><b>📚 Educational Resources</b></summary>

| Repo | Contents |
|------|----------|
| [Python Data Analysis](https://github.com/learnbydoingwithsteven/Python_Data_Analysis) | Jupyter notebooks from YouTube series |
| [Code Templates](https://github.com/learnbydoingwithsteven/Code_Templates) | Re-usable project skeletons |

</details>

Why this layout works
	•	HTML <table> keeps two cards per row; easier to scan than six stacked images (eye-tracking research via Medium guide)  ￼.
	•	Collapsible <details> tags ship native in GitHub Flavored Markdown—no JS, so they render everywhere including mobile  ￼.
	•	Each card is the pin endpoint produced by github-readme-stats; no PAT secrets required for public data  ￼.

⸻

⚙️ Automate card refresh (optional)

Add the action below to /.github/workflows/profile-cards.yml.
It calls Profile-Summary-Cards nightly (00:30 UTC), commits updated PNG/SVGs, and your README instantly reflects new stars, forks, languages etc.  ￼

name: Update profile summary cards
on:
  schedule: [{cron: '30 0 * * *'}]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: vn7n24fzkq/github-profile-summary-cards@v0.6.1
        with:
          USERNAME: learnbydoingwithsteven     # change if you rename



⸻

🏁 Next steps
	1.	Pin the same six repos via GitHub UI for consistency with profile tiles  ￼.
	2.	Add preview GIFs to each repo’s /assets/preview.gif so the cards show motion when hovered (GitHub renders GIFs)  ￼.
	3.	Keep “Featured Projects” to a max of six; beyond that, recruiters skim less than 10 s (GitHub Docs UX note)  ￼.

Drop the snippet in, commit, and your profile now showcases a richer portfolio without overwhelming first-time visitors. Enjoy! 🚀