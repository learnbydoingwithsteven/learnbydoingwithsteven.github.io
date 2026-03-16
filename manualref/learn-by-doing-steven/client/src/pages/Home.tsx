import { useState } from "react";
import {
  ChevronDown,
  Github,
  ExternalLink,
  Mail,
  Heart,
  Calendar,
  Users,
  Podcast,
  Share2,
  BookOpen,
  Zap,
  Globe,
  Music,
  Video,
  MessageCircle,
  Briefcase,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkItem {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

interface LinkCategory {
  id: string;
  title: string;
  titleCn: string;
  icon: string;
  color: string;
  links: LinkItem[];
}

/**
 * Design Philosophy: Modern Minimalist with SOTA Level Enhancements
 * - Clean white background with deep charcoal text
 * - Strategic lime green (#84CC16) accents for interactive elements
 * - Organized link cards with category badges
 * - Smooth animations and hover effects
 * - Responsive grid layout with visual hierarchy
 */
export default function Home() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const linkCategories: LinkCategory[] = [
    {
      id: "scheduling",
      title: "Book an Appointment",
      titleCn: "预约时间",
      icon: "📅",
      color: "from-blue-50 to-blue-100",
      links: [
        { name: "cal.com", url: "https://cal.com", description: "Calendar scheduling" },
        { name: "Google Calendar", url: "https://calendar.app.google", description: "Google Calendar integration" },
        { name: "Chilipiper", url: "https://gmail.chilipiper.com", description: "Lead qualification" },
        { name: "Calendly", url: "https://calendly.com", description: "Meeting scheduler" },
      ],
    },
    {
      id: "about",
      title: "About Me",
      titleCn: "关于我",
      icon: "👤",
      color: "from-purple-50 to-purple-100",
      links: [
        {
          name: "Background & Services",
          url: "#",
          description: "Career, consulting, expertise",
        },
        {
          name: "Ask me about Steven",
          url: "#",
          description: "Questions and inquiries",
        },
      ],
    },
    {
      id: "communities",
      title: "Communities",
      titleCn: "社群矩阵",
      icon: "👥",
      color: "from-green-50 to-green-100",
      links: [
        {
          name: "中/欧/美AI社群 (LinkedIn)",
          url: "https://www.linkedin.com/groups/15054015",
          description: "Startup, employment, fundraising",
        },
        {
          name: "中/欧/美AI社群 (Discord)",
          url: "https://discord.gg/XE6WpAfM",
          description: "AI community for entrepreneurs",
        },
        {
          name: "Learn By Doing (Discord)",
          url: "https://discord.gg/47yq8KcC",
          description: "Technical & podcast discussions",
        },
        {
          name: "Telegram Group",
          url: "https://t.me/+i9NRjGCKjRQxMDNk",
          description: "Direct messaging community",
        },
      ],
    },
    {
      id: "support",
      title: "Support My Work",
      titleCn: "支持创作",
      icon: "❤️",
      color: "from-red-50 to-red-100",
      links: [
        {
          name: "PayPal",
          url: "https://paypal.me/wangjiansuper",
          description: "Donate via PayPal",
        },
        {
          name: "Buy Me A Coffee",
          url: "https://buymeacoffee.com",
          description: "Support with coffee",
        },
      ],
    },
    {
      id: "video",
      title: "Video Platforms",
      titleCn: "视频平台",
      icon: "🎥",
      color: "from-red-50 to-orange-100",
      links: [
        {
          name: "YouTube - Learn By Doing",
          url: "https://www.youtube.com/@learnbydoingwithsteven",
          description: "Main English channel",
        },
        {
          name: "YouTube - 数能生智",
          url: "https://www.youtube.com/@learnbydoingwithsteven",
          description: "Chinese version",
        },
        {
          name: "TikTok",
          url: "https://www.tiktok.com/@learnbydoingwithsteven",
          description: "Short-form content",
        },
        {
          name: "哔哩哔哩",
          url: "https://www.bilibili.com",
          description: "Chinese video platform",
        },
      ],
    },
    {
      id: "podcasts",
      title: "Podcasts",
      titleCn: "播客",
      icon: "🎙️",
      color: "from-purple-50 to-pink-100",
      links: [
        {
          name: "Steven Data Talk (Apple)",
          url: "#",
          description: "Data Science & AI",
        },
        {
          name: "Steven AI Talk (Apple)",
          url: "#",
          description: "English podcast",
        },
        {
          name: "Data Talk (Spotify)",
          url: "#",
          description: "Spotify streaming",
        },
        {
          name: "Steven AI Talk (Spotify)",
          url: "#",
          description: "AI discussions",
        },
        {
          name: "喜马拉雅 Podcasts",
          url: "#",
          description: "Chinese audio platform",
        },
        {
          name: "小宇宙 Podcasts",
          url: "#",
          description: "Podcast aggregator",
        },
      ],
    },
    {
      id: "writing",
      title: "Writing & Blog",
      titleCn: "写作平台",
      icon: "✍️",
      color: "from-blue-50 to-cyan-100",
      links: [
        {
          name: "GitHub",
          url: "https://github.com/learnbydoingwithsteven",
          description: "Code repositories",
        },
        {
          name: "GitHub.io",
          url: "https://learnbydoingwithsteven.github.io",
          description: "Personal website",
        },
        {
          name: "Substack",
          url: "https://substack.com/@steven923044",
          description: "Newsletter platform",
        },
        {
          name: "Bear Blog",
          url: "https://learnbydoingwithsteven.bearblog.dev",
          description: "Minimalist blog",
        },
        {
          name: "LinkedIn Newsletter",
          url: "#",
          description: "Professional insights",
        },
        {
          name: "微信公众号",
          url: "#",
          description: "WeChat official account",
        },
      ],
    },
    {
      id: "social",
      title: "Social Media",
      titleCn: "社交媒体",
      icon: "📱",
      color: "from-indigo-50 to-blue-100",
      links: [
        {
          name: "LinkedIn (Projects)",
          url: "#",
          description: "Independent projects",
        },
        {
          name: "LinkedIn (Full Career)",
          url: "#",
          description: "Professional profile",
        },
        {
          name: "X (Twitter)",
          url: "https://twitter.com/Catchingtides",
          description: "Real-time updates",
        },
        {
          name: "Instagram",
          url: "https://instagram.com/learnbydoingwithsteven",
          description: "Visual content",
        },
        {
          name: "小红书",
          url: "#",
          description: "Chinese social platform",
        },
        {
          name: "Facebook",
          url: "#",
          description: "Community updates",
        },
      ],
    },
    {
      id: "collaborations",
      title: "Collaborations",
      titleCn: "合作伙伴",
      icon: "🤝",
      color: "from-amber-50 to-orange-100",
      links: [
        {
          name: "Vanta Tech Lab",
          url: "https://www.linkedin.com/company/vanta-tech-lab",
          description: "Tech venture community",
        },
        {
          name: "DukeCEO",
          url: "https://www.linkedin.com/company/dukeceo",
          description: "Duke entrepreneurship",
        },
        {
          name: "创·见 Founder Vision",
          url: "#",
          description: "Founder community",
        },
        {
          name: "Guest Appearances",
          url: "#",
          description: "Podcast interviews",
        },
      ],
    },
    {
      id: "travel",
      title: "Travel Channel",
      titleCn: "旅行频道",
      icon: "🚗",
      color: "from-teal-50 to-green-100",
      links: [
        {
          name: "Steven On The Road (YouTube)",
          url: "#",
          description: "Travel vlog",
        },
        {
          name: "Steven On The Road (哔哩哔哩)",
          url: "#",
          description: "Chinese travel channel",
        },
      ],
    },
  ];

  const toggleCategory = (id: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  const expandAll = () => {
    setExpandedCategories(new Set(linkCategories.map((cat) => cat.id)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-accent-foreground">S</span>
            </div>
            <span className="font-semibold text-lg">Learn By Doing</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-2 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out"
            asChild
          >
            <a href="https://github.com/learnbydoingwithsteven" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Learn By Doing with Steven
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              🌍 Community Builder-Engineer, Founder, Investor 🎙️ Podcast Host 🤝 Vanta Techlab 💻 Data Science, LLM, Models 🧩 Exploration & Experiments 🕹️ AI-driven Programming
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
              >
                View Portfolio
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out"
              >
                All Links
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Connect with Me
            </h2>
            <p className="text-muted-foreground">
              Find me across platforms, communities, and channels
            </p>
          </div>

          {/* Expand/Collapse Controls */}
          <div className="flex gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={expandAll}
              className="border-2 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out"
            >
              Expand All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAll}
              className="border-2 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out"
            >
              Collapse All
            </Button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {linkCategories.map((category) => (
              <div
                key={category.id}
                className={`bg-gradient-to-br ${category.color} rounded-xl border border-border overflow-hidden hover:border-accent transition-all duration-300 ease-in-out shadow-sm hover:shadow-md`}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/5 transition-all duration-300 ease-in-out"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">
                        {category.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {category.titleCn}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium bg-accent/20 text-accent px-2 py-1 rounded-full">
                      {category.links.length}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-accent transition-transform duration-300 ${
                        expandedCategories.has(category.id) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedCategories.has(category.id) && (
                  <div className="border-t border-border/50 px-6 py-4 space-y-2 bg-white/50">
                    {category.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between p-3 rounded-lg hover:bg-white/80 transition-all duration-300 ease-in-out group"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                            {link.name}
                          </div>
                          {link.description && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {link.description}
                            </div>
                          )}
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors ml-2 flex-shrink-0 mt-1" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Connect
            </h2>
            <p className="text-background/80 mb-8">
              Whether you're interested in collaboration, learning, or just want to say hello, feel free to reach out through any of the channels above.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-background"
                asChild
              >
                <a href="mailto:wjbear2020@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <a href="https://github.com/learnbydoingwithsteven" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Visit GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="font-semibold mb-2">© 2025 Learn By Doing with Steven. All rights reserved.</p>
              <p className="text-muted-foreground">
                Open source projects for learning and development
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/learnbydoingwithsteven"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent/20 transition-all duration-300 ease-in-out"
              >
                <Github className="w-5 h-5 text-foreground hover:text-accent" />
              </a>
              <a
                href="mailto:wjbear2020@gmail.com"
                className="p-2 rounded-lg hover:bg-accent/20 transition-all duration-300 ease-in-out"
              >
                <Mail className="w-5 h-5 text-foreground hover:text-accent" />
              </a>
              <a
                href="https://twitter.com/Catchingtides"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent/20 transition-all duration-300 ease-in-out"
              >
                <Share2 className="w-5 h-5 text-foreground hover:text-accent" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
