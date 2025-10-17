// Project data
const projects = [
    {
        name: 'ai_100',
        title: 'AI Applications Suite',
        description: '100 production-ready AI applications covering computer vision, NLP, medical imaging, and predictive analytics with full-stack architecture.',
        category: 'ai-ml',
        icon: '🤖',
        apps: 100,
        tech: ['Python', 'React', 'FastAPI', 'Docker'],
        github: 'https://github.com/learnbydoingwithsteven/ai_100'
    },
    {
        name: 'ml_100',
        title: 'Machine Learning Applications',
        description: '100 ML applications across healthcare, finance, retail, transportation, and environmental domains with complete implementations.',
        category: 'ai-ml',
        icon: '🧠',
        apps: 100,
        tech: ['Python', 'TensorFlow', 'Scikit-learn', 'Docker'],
        github: 'https://github.com/learnbydoingwithsteven/ml_100'
    },
    {
        name: 'ml_0-1',
        title: 'ML Learning Path',
        description: '100 machine learning courses from fundamentals to advanced topics including supervised, unsupervised, and deep learning.',
        category: 'ai-ml',
        icon: '📚',
        apps: 100,
        tech: ['Python', 'Jupyter', 'PyTorch', 'TensorFlow'],
        github: 'https://github.com/learnbydoingwithsteven/ml_0-1'
    },
    {
        name: 'agents_100',
        title: 'AI Agents Collection',
        description: '100 autonomous AI agent applications featuring multi-agent systems, decision-making frameworks, and intelligent automation.',
        category: 'ai-ml',
        icon: '🤝',
        apps: 100,
        tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
        github: 'https://github.com/learnbydoingwithsteven/agents_100'
    },
    {
        name: 'agentic_sys_0-1',
        title: 'Agentic Systems Course',
        description: 'Comprehensive course on building AI agents from zero to one, covering architecture, planning, and multi-agent coordination.',
        category: 'ai-ml',
        icon: '🎓',
        apps: 'Course',
        tech: ['Python', 'LangChain', 'React', 'FastAPI'],
        github: 'https://github.com/learnbydoingwithsteven/agentic_sys_0-1'
    },
    {
        name: 'nlp_100',
        title: 'NLP Applications',
        description: '100 NLP applications for text classification, entity extraction, sentiment analysis, translation, and text generation.',
        category: 'nlp',
        icon: '💬',
        apps: 100,
        tech: ['Python', 'Transformers', 'spaCy', 'FastAPI'],
        github: 'https://github.com/learnbydoingwithsteven/nlp_100'
    },
    {
        name: 'nlp_0-1',
        title: 'NLP Learning Path',
        description: '100 NLP courses from text preprocessing to advanced transformers, covering all aspects of natural language processing.',
        category: 'nlp',
        icon: '📖',
        apps: 100,
        tech: ['Python', 'NLTK', 'Transformers', 'PyTorch'],
        github: 'https://github.com/learnbydoingwithsteven/nlp_0-1'
    },
    {
        name: 'llm_0-1',
        title: 'LLM Mastery Course',
        description: '100 lessons on Large Language Models from tokenization to RLHF, fine-tuning, and deployment strategies.',
        category: 'nlp',
        icon: '🔤',
        apps: 100,
        tech: ['Python', 'Transformers', 'OpenAI', 'LangChain'],
        github: 'https://github.com/learnbydoingwithsteven/llm_0-1'
    },
    {
        name: 'llm_eval_gpt2',
        title: 'LLM Evaluation Framework',
        description: 'Comprehensive framework for evaluating and benchmarking GPT-2 and other language models with metrics and analysis tools.',
        category: 'nlp',
        icon: '📊',
        apps: 'Framework',
        tech: ['Python', 'Transformers', 'PyTorch', 'Streamlit'],
        github: 'https://github.com/learnbydoingwithsteven/llm_eval_gpt2'
    },
    {
        name: 'rl_100',
        title: 'Reinforcement Learning Apps',
        description: '100 RL applications for robotics, trading, gaming, and smart systems with complete implementations and visualizations.',
        category: 'rl',
        icon: '🎮',
        apps: 100,
        tech: ['Python', 'Gymnasium', 'PyTorch', 'Streamlit'],
        github: 'https://github.com/learnbydoingwithsteven/rl_100'
    },
    {
        name: 'rl_0-1',
        title: 'RL Learning Path',
        description: 'Complete reinforcement learning course from zero to one, covering MDPs, value functions, policy gradients, and deep RL.',
        category: 'rl',
        icon: '🎯',
        apps: 'Course',
        tech: ['Python', 'Gymnasium', 'Stable-Baselines3'],
        github: 'https://github.com/learnbydoingwithsteven/rl_0-1'
    },
    {
        name: 'rl_2425_1',
        title: 'RL Project: Chaotic Chef',
        description: 'Tabular vs function approximation RL methods in a grid-world ingredient collection game with Q-learning and SARSA.',
        category: 'rl',
        icon: '👨‍🍳',
        apps: 'Project',
        tech: ['Python', 'Gymnasium', 'Streamlit', 'NumPy'],
        github: 'https://github.com/learnbydoingwithsteven/rl_2425_1'
    },
    {
        name: 'rl_2425_2',
        title: 'RL Project: The Gambler',
        description: 'Linear function approximation and feature design in simplified Blackjack with exploration strategies.',
        category: 'rl',
        icon: '🎰',
        apps: 'Project',
        tech: ['Python', 'Gymnasium', 'NumPy', 'Matplotlib'],
        github: 'https://github.com/learnbydoingwithsteven/rl_2425_2'
    },
    {
        name: 'rl_2425_3',
        title: 'RL Project: Primal Hunt',
        description: 'Deep Q-Networks (DQN) with experience replay and target networks for survival hunting game.',
        category: 'rl',
        icon: '🏹',
        apps: 'Project',
        tech: ['Python', 'PyTorch', 'Gymnasium', 'DQN'],
        github: 'https://github.com/learnbydoingwithsteven/rl_2425_3'
    },
    {
        name: 'rl_2425_4',
        title: 'RL Project: Push Your Luck',
        description: 'Policy gradient methods (REINFORCE, Actor-Critic) in dice-rolling treasure exploration game.',
        category: 'rl',
        icon: '🎲',
        apps: 'Project',
        tech: ['Python', 'PyTorch', 'Gymnasium', 'Policy Gradients'],
        github: 'https://github.com/learnbydoingwithsteven/rl_2425_4'
    },
    {
        name: 'rl_2425_5',
        title: 'RL Project: Harvest & Thrive',
        description: 'Continuous action spaces with policy-based RL for farm resource management and crop optimization.',
        category: 'rl',
        icon: '🌾',
        apps: 'Project',
        tech: ['Python', 'PyTorch', 'Continuous Control', 'PPO'],
        github: 'https://github.com/learnbydoingwithsteven/rl_2425_5'
    },
    {
        name: 'rl_2425_6',
        title: 'RL Project: Medieval Tournament',
        description: 'Multi-agent reinforcement learning in competitive knight tournament with strategic decision-making.',
        category: 'rl',
        icon: '⚔️',
        apps: 'Project',
        tech: ['Python', 'Multi-Agent', 'Game Theory', 'PyTorch'],
        github: 'https://github.com/learnbydoingwithsteven/rl_2425_6'
    },
    {
        name: 'bank_100',
        title: 'Banking Applications',
        description: '100 banking and finance applications covering risk management, fraud detection, AML, and compliance systems.',
        category: 'apps',
        icon: '🏦',
        apps: 100,
        tech: ['Python', 'React', 'FastAPI', 'PostgreSQL'],
        github: 'https://github.com/learnbydoingwithsteven/bank_100'
    },
    {
        name: 'law_100',
        title: 'Legal Technology Apps',
        description: '100 legal technology applications for case management, document generation, client services, and compliance.',
        category: 'apps',
        icon: '⚖️',
        apps: 100,
        tech: ['Python', 'React', 'FastAPI', 'Docker'],
        github: 'https://github.com/learnbydoingwithsteven/law_100'
    },
    {
        name: 'games_100',
        title: 'Interactive Games',
        description: '100 web-based games including puzzles, strategy, action, and educational games with modern frameworks.',
        category: 'apps',
        icon: '🎮',
        apps: 100,
        tech: ['React', 'TypeScript', 'Canvas', 'WebGL'],
        github: 'https://github.com/learnbydoingwithsteven/games_100'
    },
    {
        name: 'cag_10',
        title: 'CAG Applications',
        description: '10 Computer-Aided Generation applications for legal, medical, code review, and business automation.',
        category: 'apps',
        icon: '🔧',
        apps: 10,
        tech: ['Python', 'React', 'FastAPI', 'OpenAI'],
        github: 'https://github.com/learnbydoingwithsteven/cag_10'
    },
    {
        name: 'rag_10',
        title: 'RAG Applications',
        description: '10 Retrieval-Augmented Generation applications for intelligent document search and question answering.',
        category: 'apps',
        icon: '🔍',
        apps: 10,
        tech: ['Python', 'LangChain', 'ChromaDB', 'FastAPI'],
        github: 'https://github.com/learnbydoingwithsteven/rag_10'
    },
    {
        name: 'mit',
        title: 'MIT Course Materials',
        description: 'Collection of MIT course materials, projects, and implementations for computer science and AI topics.',
        category: 'education',
        icon: '🎓',
        apps: 'Materials',
        tech: ['Python', 'Jupyter', 'LaTeX', 'Various'],
        github: 'https://github.com/learnbydoingwithsteven/mit'
    },
    {
        name: 'stanford',
        title: 'Stanford Course Materials',
        description: 'Stanford course materials and projects covering machine learning, AI, and computer science fundamentals.',
        category: 'education',
        icon: '🏛️',
        apps: 'Materials',
        tech: ['Python', 'Jupyter', 'TensorFlow', 'PyTorch'],
        github: 'https://github.com/learnbydoingwithsteven/stanford'
    },
    {
        name: 'youtube_ref',
        title: 'YouTube Reference Materials',
        description: 'Curated collection of YouTube tutorials, courses, and reference materials for AI, ML, and programming.',
        category: 'education',
        icon: '📺',
        apps: 'References',
        tech: ['Documentation', 'Tutorials', 'Resources'],
        github: 'https://github.com/learnbydoingwithsteven/youtube_ref'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects('all');
    setupFilters();
    setupSmoothScroll();
});

// Load projects
function loadProjects(category) {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = '';
    
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(p => p.category === category);
    
    filteredProjects.forEach((project, index) => {
        const card = createProjectCard(project);
        card.style.animationDelay = `${index * 0.1}s`;
        grid.appendChild(card);
    });
}

// Create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => window.open(project.github, '_blank');
    
    const appsText = typeof project.apps === 'number' ? `${project.apps} Apps` : project.apps;
    
    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon">${project.icon}</div>
            <span class="project-category">${getCategoryName(project.category)}</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-stats">
            <div class="project-stat">
                <span>📦</span>
                <span>${appsText}</span>
            </div>
            <div class="project-stat">
                <span>⭐</span>
                <span>Open Source</span>
            </div>
        </div>
        <div class="project-tech">
            ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
        </div>
        <a href="${project.github}" class="project-link" onclick="event.stopPropagation()">
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
        'education': 'Education'
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
});
