// Fetch repositories directly from GitHub API
const GITHUB_USERNAME = 'learnbydoingwithsteven';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Category mappings based on repository names
const CATEGORY_MAP = {
    'ai_100': 'ai-ml',
    'ml_100': 'ai-ml',
    'ml_0-1': 'ai-ml',
    'agents_100': 'ai-ml',
    'agentic_sys_0-1': 'ai-ml',
    'nlp_100': 'nlp',
    'nlp_0-1': 'nlp',
    'llm_0-1': 'nlp',
    'llm_eval_gpt2': 'nlp',
    'rl_100': 'rl',
    'rl_0-1': 'rl',
    'rl_2425_1': 'rl',
    'rl_2425_2': 'rl',
    'rl_2425_3': 'rl',
    'rl_2425_4': 'rl',
    'rl_2425_5': 'rl',
    'rl_2425_6': 'rl',
    'bank_100': 'apps',
    'law_100': 'apps',
    'games_100': 'apps',
    'cag_10': 'apps',
    'rag_10': 'apps',
    'mit': 'education',
    'stanford': 'education',
    'youtube_ref': 'education'
};

// Repository metadata (titles, descriptions, icons)
const REPO_METADATA = {
    'ai_100': {
        title: 'AI Applications Suite',
        description: '100 production-ready AI applications covering computer vision, NLP, medical imaging, and predictive analytics.',
        icon: '🤖',
        apps: 100
    },
    'ml_100': {
        title: 'Machine Learning Applications',
        description: '100 ML applications across healthcare, finance, retail, transportation, and environmental domains.',
        icon: '🧠',
        apps: 100
    },
    'ml_0-1': {
        title: 'ML Learning Path',
        description: '100 machine learning courses from fundamentals to advanced topics including deep learning.',
        icon: '📚',
        apps: 100
    },
    'agents_100': {
        title: 'AI Agents Collection',
        description: '100 autonomous AI agent applications featuring multi-agent systems and intelligent automation.',
        icon: '🤝',
        apps: 100
    },
    'agentic_sys_0-1': {
        title: 'Agentic Systems Course',
        description: 'Comprehensive course on building AI agents from zero to one with architecture and planning.',
        icon: '🎓',
        apps: 'Course'
    },
    'nlp_100': {
        title: 'NLP Applications',
        description: '100 NLP applications for text classification, entity extraction, sentiment analysis, and generation.',
        icon: '💬',
        apps: 100
    },
    'nlp_0-1': {
        title: 'NLP Learning Path',
        description: '100 NLP courses from text preprocessing to advanced transformers.',
        icon: '📖',
        apps: 100
    },
    'llm_0-1': {
        title: 'LLM Mastery Course',
        description: '100 lessons on Large Language Models from tokenization to RLHF and deployment.',
        icon: '🔤',
        apps: 100
    },
    'llm_eval_gpt2': {
        title: 'LLM Evaluation Framework',
        description: 'Comprehensive framework for evaluating and benchmarking GPT-2 and other language models.',
        icon: '📊',
        apps: 'Framework'
    },
    'rl_100': {
        title: 'Reinforcement Learning Apps',
        description: '100 RL applications for robotics, trading, gaming, and smart systems.',
        icon: '🎮',
        apps: 100
    },
    'rl_0-1': {
        title: 'RL Learning Path',
        description: 'Complete reinforcement learning course covering MDPs, value functions, and deep RL.',
        icon: '🎯',
        apps: 'Course'
    },
    'rl_2425_1': {
        title: 'RL Project: Chaotic Chef',
        description: 'Tabular vs function approximation RL methods in a grid-world game.',
        icon: '👨‍🍳',
        apps: 'Project'
    },
    'rl_2425_2': {
        title: 'RL Project: The Gambler',
        description: 'Linear function approximation and feature design in simplified Blackjack.',
        icon: '🎰',
        apps: 'Project'
    },
    'rl_2425_3': {
        title: 'RL Project: Primal Hunt',
        description: 'Deep Q-Networks (DQN) with experience replay and target networks.',
        icon: '🏹',
        apps: 'Project'
    },
    'rl_2425_4': {
        title: 'RL Project: Push Your Luck',
        description: 'Policy gradient methods (REINFORCE, Actor-Critic) in dice-rolling game.',
        icon: '🎲',
        apps: 'Project'
    },
    'rl_2425_5': {
        title: 'RL Project: Harvest & Thrive',
        description: 'Continuous action spaces with policy-based RL for farm management.',
        icon: '🌾',
        apps: 'Project'
    },
    'rl_2425_6': {
        title: 'RL Project: Medieval Tournament',
        description: 'Multi-agent reinforcement learning in competitive knight tournament.',
        icon: '⚔️',
        apps: 'Project'
    },
    'bank_100': {
        title: 'Banking Applications',
        description: '100 banking and finance applications covering risk management, fraud detection, and compliance.',
        icon: '🏦',
        apps: 100
    },
    'law_100': {
        title: 'Legal Technology Apps',
        description: '100 legal technology applications for case management and document generation.',
        icon: '⚖️',
        apps: 100
    },
    'games_100': {
        title: 'Interactive Games',
        description: '100 web-based games including puzzles, strategy, and educational games.',
        icon: '🎮',
        apps: 100
    },
    'cag_10': {
        title: 'CAG Applications',
        description: '10 Computer-Aided Generation applications for business automation.',
        icon: '🔧',
        apps: 10
    },
    'rag_10': {
        title: 'RAG Applications',
        description: '10 Retrieval-Augmented Generation applications for intelligent document search.',
        icon: '🔍',
        apps: 10
    },
    'mit': {
        title: 'MIT Course Materials',
        description: 'Collection of MIT course materials and projects for computer science and AI.',
        icon: '🎓',
        apps: 'Materials'
    },
    'stanford': {
        title: 'Stanford Course Materials',
        description: 'Stanford course materials covering machine learning and AI fundamentals.',
        icon: '🏛️',
        apps: 'Materials'
    },
    'youtube_ref': {
        title: 'YouTube Reference Materials',
        description: 'Curated collection of YouTube tutorials and reference materials.',
        icon: '📺',
        apps: 'References'
    }
};

let allRepos = [];
let currentCategory = 'all';
let currentSearch = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
    setupFilters();
    setupSmoothScroll();
    setupNavigationToggle();
    setupProjectSearch();
});

// Fetch repositories from GitHub API
async function fetchGitHubRepos() {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading repositories from GitHub...</p>
        </div>
    `;
    
    try {
        const response = await fetch(GITHUB_API + '?per_page=100&sort=updated');
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Process and enrich repository data
        allRepos = repos.map(repo => {
            const metadata = REPO_METADATA[repo.name] || {};
            const category = CATEGORY_MAP[repo.name] || 'other';
            
            // Detect technologies from repo data
            const tech = [];
            if (repo.language) tech.push(repo.language);
            if (repo.topics) {
                repo.topics.forEach(topic => {
                    if (['react', 'typescript', 'docker', 'fastapi', 'python'].includes(topic.toLowerCase())) {
                        tech.push(topic);
                    }
                });
            }
            
            return {
                name: repo.name,
                title: metadata.title || repo.name.replace(/_/g, ' ').replace(/-/g, ' '),
                description: metadata.description || repo.description || 'GitHub repository',
                category: category,
                icon: metadata.icon || '📦',
                apps: metadata.apps || 'Project',
                tech: tech.length > 0 ? tech : ['GitHub'],
                github: repo.html_url,
                stars: repo.stargazers_count,
                updated: repo.updated_at
            };
        });
        
        // Load all projects initially
        loadProjects('all');

        // Update statistics
        updateStats();

    } catch (error) {
        console.error('Error fetching repositories:', error);
        grid.innerHTML = `
            <div class="loading-container">
                <p style="color: #ef4444; font-weight: 600;">Failed to load repositories from GitHub.</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Error: ${error.message}</p>
                <button onclick="fetchGitHubRepos()" class="btn btn-primary" style="margin-top: 1rem;">
                    Try Again
                </button>
            </div>
        `;
    }
}

// Update statistics in hero section
function updateStats() {
    const repoCount = allRepos.length;
    const appCount = allRepos.reduce((sum, repo) => {
        return sum + (typeof repo.apps === 'number' ? repo.apps : 0);
    }, 0);
    
    // Update stat numbers if elements exist
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers[0]) statNumbers[0].textContent = repoCount;
    if (statNumbers[1]) statNumbers[1].textContent = appCount + '+';
}

// Load projects
function loadProjects(category = currentCategory, searchTerm = currentSearch) {
    const grid = document.getElementById('projectGrid');
    const hint = document.getElementById('projectHint');

    currentCategory = category;
    currentSearch = searchTerm;

    grid.innerHTML = '';

    const trimmedSearch = searchTerm.trim();
    const normalizedSearch = trimmedSearch.toLowerCase();

    const filteredRepos = category === 'all'
        ? allRepos
        : allRepos.filter(r => r.category === category);

    const searchFilteredRepos = normalizedSearch
        ? filteredRepos.filter(repo => {
            const haystack = [
                repo.title,
                repo.description,
                repo.name,
                ...(repo.tech || [])
            ].join(' ').toLowerCase();
            return haystack.includes(normalizedSearch);
        })
        : filteredRepos;

    if (hint) {
        updateSearchHint(hint, searchFilteredRepos.length, filteredRepos.length, category, trimmedSearch);
    }

    if (searchFilteredRepos.length === 0) {
        grid.innerHTML = `
            <div class="project-empty">
                <h3>No repositories match your filters yet</h3>
                <p>Try switching categories or clearing your search to explore the full collection.</p>
            </div>
        `;
        return;
    }

    searchFilteredRepos.forEach((repo, index) => {
        const card = createProjectCard(repo);
        card.style.animationDelay = `${index * 0.05}s`;
        card.style.opacity = '0';
        grid.appendChild(card);

        // Trigger animation
        setTimeout(() => {
            card.style.opacity = '1';
        }, 10);
    });
}

// Create project card
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => window.open(repo.github, '_blank');
    
    const appsText = typeof repo.apps === 'number' ? `${repo.apps} Apps` : repo.apps;
    const starsText = repo.stars > 0 ? `⭐ ${repo.stars}` : '⭐ Open Source';
    
    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon">${repo.icon}</div>
            <span class="project-category">${getCategoryName(repo.category)}</span>
        </div>
        <h3 class="project-title">${repo.title}</h3>
        <p class="project-description">${repo.description}</p>
        <div class="project-stats">
            <div class="project-stat">
                <span>📦</span>
                <span>${appsText}</span>
            </div>
            <div class="project-stat">
                <span>${starsText}</span>
            </div>
        </div>
        <div class="project-tech">
            ${repo.tech.slice(0, 4).map(t => `<span class="tech-badge">${t}</span>`).join('')}
        </div>
        <a href="${repo.github}" class="project-link" onclick="event.stopPropagation()">
            View on GitHub
        </a>
    `;
    
    return card;
}

// Get category display name
function getCategoryName(category) {
    const names = {
        'ai-ml': 'AI & ML',
        'nlp': 'NLP & LLM',
        'rl': 'Reinforcement Learning',
        'apps': 'Applications',
        'education': 'Education',
        'other': 'Other'
    };
    return names[category] || category;
}

// Setup filter tabs
function setupFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
            tab.setAttribute('aria-selected', 'true');
            const category = tab.dataset.category;
            loadProjects(category, currentSearch);
        });
    });
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const backToTop = document.querySelector('.back-to-top');

    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function setupNavigationToggle() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const navLinkItems = navLinks ? navLinks.querySelectorAll('a') : [];

    if (!navToggle || !navLinks || !navOverlay) return;

    const closeNav = () => {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('visible');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    };

    const openNav = () => {
        navLinks.classList.add('active');
        navOverlay.classList.add('visible');
        navToggle.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-open');
    };

    const toggleNav = () => {
        if (navLinks.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    };

    navToggle.addEventListener('click', toggleNav);
    navOverlay.addEventListener('click', closeNav);

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeNav();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeNav();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNav();
        }
    });
}

function setupProjectSearch() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;

    const handleSearch = (value) => {
        loadProjects(currentCategory, value);
    };

    searchInput.addEventListener('input', (event) => {
        handleSearch(event.target.value || '');
    });

    searchInput.addEventListener('search', (event) => {
        handleSearch(event.target.value || '');
    });
}

function updateSearchHint(element, visibleCount, categoryCount, category, searchTerm) {
    const categoryName = getCategoryName(category).toLowerCase();

    if (searchTerm) {
        element.textContent = `Showing ${visibleCount} result${visibleCount === 1 ? '' : 's'} for “${searchTerm}” in ${categoryName}.`;
    } else if (category !== 'all') {
        element.textContent = `Showing ${categoryCount} curated repositories in ${categoryName}.`;
    } else {
        element.textContent = 'Showing all curated repositories.';
    }
}
