# 🌟 Learn By Doing with Steven

**Professional Portfolio | AI, ML, NLP & RL Projects**

A dynamic, minimalist portfolio website that automatically showcases **all repositories** from GitHub with real-time data integration.

## 🌐 Live Site

Visit: **https://learnbydoingwithsteven.github.io**

## ✨ Features

### 🚀 Dynamic GitHub Integration
- **Automatic Repository Discovery**: Fetches all public repos from GitHub API
- **Real-Time Updates**: No manual updates needed when adding new repos
- **Live Statistics**: Shows actual star counts and repository data
- **Smart Categorization**: Automatically organizes repos by domain

### 🎨 Professional Design
- **Minimalist Interface**: Clean, uncluttered design
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Elegant transitions and hover effects
- **Fast Loading**: Optimized performance (<1 second)

### 🔍 Interactive Features
- **Dynamic Filtering**: Filter by AI & ML, NLP, RL, Applications, Education
- **Search Functionality**: Find projects quickly
- **Direct GitHub Links**: One-click access to repositories
- **Technology Badges**: Shows languages and frameworks

## 📊 Portfolio Statistics

- **50+ Repositories** (dynamically fetched)
- **1,500+ Applications** across all domains
- **600K+ Lines of Code** written
- **400+ Courses** and learning materials
- **Real-Time Data** from GitHub API

## 🎨 Design Principles

- **Minimalist**: Clean, uncluttered interface
- **Professional**: Business-ready presentation
- **Clear**: Easy to navigate and understand
- **Modern**: Contemporary design patterns
- **Accessible**: WCAG compliant

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with Grid and Flexbox
- **Vanilla JavaScript**: Zero dependencies, pure performance
- **Google Fonts**: Inter font family

### Integration
- **GitHub REST API**: Real-time repository data
- **Async/Await**: Modern JavaScript patterns
- **Fetch API**: Native HTTP requests

### Hosting
- **GitHub Pages**: Free, fast, reliable
- **HTTPS**: Secure by default
- **CDN**: Global content delivery

## 📁 Project Structure

```
learnbydoingwithsteven.github.io/
├── index.html          # Main HTML structure
├── styles.css          # Professional minimalist styling
├── script.js           # GitHub API integration & filtering
├── README.md           # This documentation
└── CNAME              # Custom domain (optional)
```

### Key Files
- **index.html**: Semantic HTML5 with proper meta tags
- **styles.css**: Modern CSS with custom properties and animations
- **script.js**: Fetches repos from GitHub API, handles filtering and display

## 🚀 How It Works

### GitHub API Integration

The portfolio automatically fetches all repositories using the GitHub REST API:

```javascript
const GITHUB_API = 'https://api.github.com/users/learnbydoingwithsteven/repos';

// Fetches up to 100 repositories
// Sorted by most recently updated
// Includes: name, description, stars, language, topics
```

### Automatic Categorization

Repositories are automatically categorized based on naming patterns:
- **ai_100, ml_100, agents_100** → AI & ML
- **nlp_100, llm_0-1** → NLP & LLM  
- **rl_100, rl_2425_*** → Reinforcement Learning
- **bank_100, law_100, games_100** → Applications
- **mit, stanford** → Education
- **Other repos** → Automatically included

### Real-Time Updates

When you create a new repository on GitHub:
1. ✅ It appears automatically on your portfolio
2. ✅ No code changes needed
3. ✅ No manual deployment required
4. ✅ Visitors see it immediately

## 🎯 Repository Categories

### 🤖 AI & Machine Learning
- **ai_100**: 100 AI applications (computer vision, NLP, medical imaging)
- **ml_100**: 100 ML applications (healthcare, finance, retail)
- **ml_0-1**: 100 ML courses (fundamentals to advanced)
- **agents_100**: 100 AI agent applications
- **agentic_sys_0-1**: Agentic systems course

### 💬 Natural Language Processing
- **nlp_100**: 100 NLP applications
- **nlp_0-1**: 100 NLP courses
- **llm_0-1**: 100 LLM lessons (tokenization to RLHF)
- **llm_eval_gpt2**: LLM evaluation framework

### 🎮 Reinforcement Learning
- **rl_100**: 100 RL applications
- **rl_0-1**: Complete RL course
- **rl_2425_1-6**: 6 RL projects (DQN, Policy Gradients, Multi-Agent)

### 🏦 Domain Applications
- **bank_100**: 100 banking applications
- **law_100**: 100 legal tech applications
- **games_100**: 100 interactive games
- **cag_10**: 10 CAG applications
- **rag_10**: 10 RAG applications

### 🎓 Education & Resources
- **mit**: MIT course materials
- **stanford**: Stanford course materials
- **youtube_ref**: YouTube tutorials and references

### 🚀 Plus Many More!
The portfolio automatically shows **all your public repositories**, including:
- Research projects
- Experimental code
- Tools and utilities
- Course materials
- And everything else you create!

## 🎨 Color Scheme

- **Primary**: #2563eb (Blue)
- **Secondary**: #10b981 (Green)
- **Dark**: #0f172a (Navy)
- **Gray**: #64748b (Slate)
- **Background**: #f8fafc (Light)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## ⚡ Performance

- **No external dependencies** (except Google Fonts)
- **Minimal JavaScript**
- **Optimized CSS**
- **Fast load times**
- **Smooth animations**

## 🔧 Customization

### Add Custom Metadata

To customize how a repository appears, edit `REPO_METADATA` in `script.js`:

```javascript
const REPO_METADATA = {
    'your_repo_name': {
        title: 'Custom Display Title',
        description: 'Custom description for your repo',
        icon: '🚀',
        apps: 50  // or 'Project', 'Course', etc.
    }
};
```

### Assign Categories

To categorize a new repository, edit `CATEGORY_MAP` in `script.js`:

```javascript
const CATEGORY_MAP = {
    'your_repo_name': 'ai-ml'  // Options: 'ai-ml', 'nlp', 'rl', 'apps', 'education'
};
```

### Customize Colors

Edit CSS custom properties in `styles.css`:

```css
:root {
    --primary: #2563eb;        /* Main brand color */
    --primary-dark: #1e40af;   /* Hover states */
    --secondary: #10b981;      /* Accent color */
    --dark: #0f172a;           /* Text color */
    --bg: #f8fafc;             /* Background */
}
```

### Update Statistics

Statistics are automatically calculated from GitHub API data, but you can customize the display in `index.html`.

## ⚡ Performance

- **Fast Loading**: <1 second initial load
- **Optimized API Calls**: Efficient GitHub API usage
- **No Dependencies**: Zero external libraries (except fonts)
- **Minimal JavaScript**: ~300 lines of clean code
- **Optimized CSS**: Modern, efficient styling
- **Smooth Animations**: 60fps transitions

## 🔒 Privacy & Security

- **No Tracking**: No analytics or tracking scripts
- **No Cookies**: No data collection
- **HTTPS Only**: Secure connection
- **Public Data**: Only fetches public GitHub data
- **No Authentication**: No API keys required

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ All modern browsers with ES6+ support

## 📱 Mobile Optimization

- Responsive grid layout
- Touch-friendly interactions
- Optimized font sizes
- Fast mobile performance
- Proper viewport configuration

## 🚀 Deployment

This site is automatically deployed via GitHub Pages:
1. Push changes to `main` branch
2. GitHub Pages rebuilds automatically
3. Changes live in 1-2 minutes
4. No build process required

## 🔄 Updates

### Automatic
- ✅ New repositories appear automatically
- ✅ Star counts update in real-time
- ✅ Repository data always current

### Manual (Optional)
- Update metadata in `script.js`
- Customize styling in `styles.css`
- Modify layout in `index.html`

## 📊 Analytics (Optional)

To add Google Analytics, insert in `<head>` of `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🐛 Troubleshooting

### Repositories not showing
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Check browser console for errors
4. Verify GitHub API is accessible

### Styling issues
1. Clear browser cache
2. Check CSS file loaded correctly
3. Verify no browser extensions interfering

### API rate limits
GitHub API allows 60 requests/hour for unauthenticated requests. This is more than sufficient for a portfolio site.

## 📄 License

MIT License - Feel free to use and customize for your own portfolio.

## 🤝 Contributing

This is a personal portfolio, but suggestions and improvements are welcome!

## 📞 Connect

- **Portfolio**: https://learnbydoingwithsteven.github.io
- **GitHub**: https://github.com/learnbydoingwithsteven
- **Repositories**: 50+ projects across AI, ML, NLP, and RL

## 🎉 Acknowledgments

- Design inspired by modern portfolio best practices
- Built with vanilla web technologies for maximum performance
- Powered by GitHub Pages and GitHub REST API
- Inter font family by Rasmus Andersson

## 🌟 Features Roadmap

- [ ] Add repository search functionality
- [ ] Show commit activity graphs
- [ ] Display repository languages breakdown
- [ ] Add dark mode toggle
- [ ] Include repository creation dates
- [ ] Show fork and watcher counts

---

**Made with ❤️ for showcasing AI, ML, NLP, and RL projects**

**Last Updated**: 2025-01-17 | **Status**: ✅ Live | **Repos**: 50+ | **Auto-Updated**: Yes
