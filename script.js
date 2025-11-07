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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
    setupFilters();
    setupSmoothScroll();
});

// Fetch repositories from GitHub API
async function fetchGitHubRepos() {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = `
        <div class="loading-container" style="text-align: center; padding: 3rem; color: #64748b;">
            <div class="loading-spinner"></div>
            <p>Loading repositories from GitHub...</p>
        </div>
    `;
    
    try {
        const response = await fetch(GITHUB_API + '?per_page=100&sort=updated', {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
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
        // Fallback to static repository list if API fails
        allRepos = Object.keys(REPO_METADATA).map(repoName => {
            const metadata = REPO_METADATA[repoName];
            const category = CATEGORY_MAP[repoName] || 'other';
            
            return {
                name: repoName,
                title: metadata.title || repoName.replace(/_/g, ' ').replace(/-/g, ' '),
                description: metadata.description || 'GitHub repository',
                category: category,
                icon: metadata.icon || '📦',
                apps: metadata.apps || 'Project',
                tech: ['GitHub'],
                github: `https://github.com/${GITHUB_USERNAME}/${repoName}`,
                stars: 0,
                updated: new Date().toISOString()
            };
        });
        
        // Load all projects with fallback data
        loadProjects('all');
        
        // Update statistics
        updateStats();
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
function loadProjects(category) {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = '';
    
    const filteredRepos = category === 'all' 
        ? allRepos 
        : allRepos.filter(r => r.category === category);
    
    if (filteredRepos.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 3rem; color: #64748b;">No repositories found in this category.</div>';
        return;
    }
    
    filteredRepos.forEach((repo, index) => {
        const card = createProjectCard(repo);
        card.style.animationDelay = `${index * 0.05}s`;
        grid.appendChild(card);
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
            View on GitHub →
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
            const category = tab.dataset.category;
            loadProjects(category);
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
    if (window.scrollY > 50) {
        nav.style.boxShadow = 'var(--shadow)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to top functionality
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu toggle
document.getElementById('mobileMenuToggle').addEventListener('click', () => {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('mobileMenuToggle');
    navLinks.classList.toggle('active');
    
    // Update toggle icon
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.getElementById('mobileMenuToggle');
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
    });
});

// Add counter animation on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = element.dataset.original;
            clearInterval(timer);
        } else {
            const value = Math.floor(current);
            const original = element.dataset.original;
            if (original.includes('K+')) {
                element.textContent = value + 'K+';
            } else if (original.includes('+')) {
                element.textContent = value + '+';
            } else {
                element.textContent = value;
            }
        }
    }, 20);
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                stat.dataset.original = stat.textContent;
                const value = parseInt(stat.textContent.replace(/\D/g, ''));
                if (!isNaN(value)) {
                    animateCounter(stat, value);
                }
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    observer.observe(statsSection);
}
