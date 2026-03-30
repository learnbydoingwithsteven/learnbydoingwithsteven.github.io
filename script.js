const STORAGE_KEY = "lbds-language";

const COPY = {
    shared: {
        nav: {
            home: { en: "Home", zh: "首页", it: "Home" },
            portfolio: { en: "Portfolio", zh: "项目集", it: "Portfolio" },
            advisory: { en: "Advisory", zh: "顾问培训", it: "Advisory" },
            directory: { en: "Media & Links", zh: "媒体与链接", it: "Media e link" },
            github: { en: "GitHub", zh: "GitHub", it: "GitHub" }
        },
        brand: {
            tag: {
                en: "AI Projects / Advisory / Media",
                zh: "AI 项目 / 顾问培训 / 媒体内容",
                it: "Progetti AI / Advisory / Media"
            }
        },
        footer: {
            lineOne: {
                en: "AI projects / advisory / media / community.",
                zh: "AI 项目 / 顾问培训 / 媒体内容 / 社群网络。",
                it: "Progetti AI / advisory / media / community."
            },
            lineTwo: {
                en: "Chinese / English / Italian.",
                zh: "中文 / 英文 / 意大利语。",
                it: "Cinese / Inglese / Italiano."
            }
        },
        backToTop: {
            en: "Back to top",
            zh: "返回顶部",
            it: "Torna su"
        }
    },
    home: {
        metaTitle: {
            en: "Learn By Doing with Steven | AI Projects, Advisory, Media",
            zh: "Learn By Doing with Steven | AI 项目、顾问培训与媒体",
            it: "Learn By Doing with Steven | Progetti AI, advisory e media"
        },
        metaDescription: {
            en: "AI projects, advisory, media channels, and community access in Chinese, English, and Italian.",
            zh: "AI 项目、顾问培训、媒体渠道与社群网络，支持中文、英文与意大利语。",
            it: "Progetti AI, advisory, canali media e accesso alla community in cinese, inglese e italiano."
        },
        hero: {
            eyebrow: {
                en: "AI Projects / Advisory / Media",
                zh: "AI 项目 / 顾问培训 / 媒体内容",
                it: "Progetti AI / Advisory / Media"
            },
            titleLead: {
                en: "Learn By Doing with Steven",
                zh: "Learn By Doing with Steven",
                it: "Learn By Doing with Steven"
            },
            titleAccent: {
                en: "AI Projects. Advisory. Media.",
                zh: "AI 项目 / 顾问培训 / 媒体",
                it: "Progetti AI. Advisory. Media."
            },
            subtitle: {
                en: "AI projects / advisory / media channels / community / Chinese, English, Italian.",
                zh: "AI 项目 / 顾问培训 / 媒体渠道 / 社群网络 / 中文、英文、意大利语。",
                it: "Progetti AI / Advisory / Canali media / Community / Cinese, inglese, italiano."
            },
            primary: { en: "Portfolio", zh: "项目集", it: "Portfolio" },
            advisory: { en: "Advisory", zh: "顾问培训", it: "Advisory" },
            secondary: { en: "Media & Links", zh: "媒体与链接", it: "Media e link" },
            tertiary: { en: "Email", zh: "邮箱", it: "Email" }
        },
        intro: {
            label: { en: "Positioning", zh: "站点定位", it: "Posizionamento" },
            title: {
                en: "Content & services",
                zh: "内容与服务",
                it: "Contenuti e servizi"
            },
            copy: {
                en: "AI projects / advisory / media channels / community / Chinese, English, Italian",
                zh: "AI 项目 / 顾问培训 / 媒体内容 / 社群网络 / 中文、英文、意大利语",
                it: "Progetti AI / Advisory / Canali media / Community / Cinese, inglese, italiano"
            }
        },
        linksIntro: {
            label: { en: "Sections", zh: "主要模块", it: "Sezioni" },
            title: {
                en: "Access points",
                zh: "入口导航",
                it: "Punti di accesso"
            },
            copy: {
                en: "Scheduling / media / advisory / communities / contact / support",
                zh: "预约 / 社媒内容 / 顾问培训 / 社群 / 联系 / 支持",
                it: "Prenotazioni / Media / Advisory / Community / Contatto / Supporto"
            }
        },
        cta: {
            title: { en: "Featured pages", zh: "重点页面", it: "Pagine in evidenza" },
            copy: {
                en: "Portfolio / Advisory / Media & Links",
                zh: "项目集 / 顾问培训 / 媒体与链接",
                it: "Portfolio / Advisory / Media e link"
            },
            primary: { en: "Media & Links", zh: "媒体与链接", it: "Media e link" },
            secondary: { en: "Portfolio", zh: "项目集", it: "Portfolio" }
        },
        profile: {
            kicker: { en: "Profile", zh: "简介", it: "Profilo" },
            title: {
                en: "Learn By Doing with Steven",
                zh: "Learn By Doing with Steven",
                it: "Learn By Doing with Steven"
            },
            body: {
                en: "AI projects / advisory / media channels / Chinese, English, Italian.",
                zh: "AI 项目 / 顾问培训 / 媒体渠道 / 中文、英文、意大利语。",
                it: "Progetti AI / Advisory / Canali media / Cinese, inglese, italiano."
            }
        }
    },
    portfolio: {
        metaTitle: {
            en: "Portfolio | Learn By Doing with Steven",
            zh: "项目集 | Learn By Doing with Steven",
            it: "Portfolio | Learn By Doing with Steven"
        },
        metaDescription: {
            en: "Curated flagship repositories across AI systems, learning paths, applied platforms, and agentic experiments.",
            zh: "精选展示 AI 系统、学习路径、行业平台与智能体实验的核心仓库。",
            it: "Una selezione di repository principali tra sistemi AI, percorsi di apprendimento, piattaforme applicate ed esperimenti agentici."
        },
        hero: {
            eyebrow: { en: "Selected work", zh: "精选作品", it: "Lavori selezionati" },
            titleLead: { en: "AI projects built", zh: "围绕 AI 构建的项目", it: "Progetti AI costruiti" },
            titleAccent: {
                en: "to be explored, reused, and shipped",
                zh: "用于探索、复用与落地",
                it: "per essere esplorati, riutilizzati e portati in produzione"
            },
            subtitle: {
                en: "A curated portfolio of learning systems, applied AI products, and multi-agent experiments with a clean multilingual presentation layer.",
                zh: "这里用干净的多语言呈现方式，组织学习系统、应用型 AI 产品与多智能体实验。",
                it: "Un portfolio curato di sistemi di apprendimento, prodotti AI applicati ed esperimenti multi-agente."
            },
            primary: { en: "Open GitHub profile", zh: "打开 GitHub 主页", it: "Apri il profilo GitHub" },
            secondary: { en: "Contact Steven", zh: "联系 Steven", it: "Contatta Steven" }
        },
        about: {
            label: { en: "How the work is organized", zh: "作品如何被组织", it: "Come e organizzato il lavoro" },
            title: {
                en: "A portfolio built around leverage",
                zh: "围绕杠杆效应构建的项目集",
                it: "Un portfolio costruito intorno alla leva"
            },
            copy: {
                en: "The recurring pattern is simple: turn experiments into reusable building blocks, package them into libraries of examples, then expose them through content and community.",
                zh: "核心模式很简单：把实验沉淀成可复用模块，把模块扩展成案例库，再通过内容与社群把它们公开化。",
                it: "Il pattern ricorrente e semplice: trasformare gli esperimenti in blocchi riutilizzabili e renderli accessibili tramite contenuti e community."
            }
        },
        cta: {
            title: { en: "Need the full map beyond these highlights?", zh: "想看超出精选之外的完整地图？", it: "Vuoi la mappa completa oltre a questi highlight?" },
            copy: {
                en: "Use the media directory for channels, communities, and podcast feeds, or go straight to GitHub for the broader repository graph.",
                zh: "可以进入媒体目录查看渠道、社群与播客，也可以直接进入 GitHub 看更完整的仓库图谱。",
                it: "Usa la directory media per canali e community, oppure vai direttamente su GitHub per l'intero grafo dei repository."
            },
            primary: { en: "Open media directory", zh: "打开媒体目录", it: "Apri la directory media" },
            secondary: { en: "Open GitHub", zh: "打开 GitHub", it: "Apri GitHub" }
        }
    },
    directory: {
        metaTitle: {
            en: "Media & Links | Learn By Doing with Steven",
            zh: "媒体与链接 | Learn By Doing with Steven",
            it: "Media e link | Learn By Doing with Steven"
        },
        metaDescription: {
            en: "A multilingual directory for calls, writing, communities, social profiles, and podcast feeds.",
            zh: "一个覆盖预约、写作、社群、社交主页与播客分发的多语言目录。",
            it: "Una directory multilingue per call, scrittura, community, profili social e feed podcast."
        },
        hero: {
            eyebrow: { en: "Media and community", zh: "媒体与社群", it: "Media e community" },
            titleLead: { en: "All channels, podcasts,", zh: "所有渠道、播客与", it: "Tutti i canali, i podcast e" },
            titleAccent: { en: "and conversation paths", zh: "交流入口", it: "i percorsi di conversazione" },
            subtitle: {
                en: "A multilingual directory for calls, writing, groups, creator support, and every podcast feed worth bookmarking.",
                zh: "一个适合收藏的多语言目录，集中展示预约、写作、社群、创作支持与完整播客分发入口。",
                it: "Una directory multilingue, utile da salvare, che raccoglie call, scrittura, gruppi, supporto alla creazione e i feed podcast principali."
            },
            primary: { en: "View portfolio", zh: "查看项目集", it: "Vai al portfolio" },
            secondary: { en: "Email Steven", zh: "给 Steven 发邮件", it: "Scrivi a Steven" }
        },
        groupsIntro: {
            label: { en: "Everything outside the code", zh: "代码之外的全部入口", it: "Tutto cio che sta fuori dal codice" },
            title: { en: "Choose the right channel quickly", zh: "快速找到合适的渠道", it: "Scegli rapidamente il canale giusto" },
            copy: {
                en: "Use these groups to jump into scheduling, communities, newsletters, videos, collaborations, and social profiles.",
                zh: "你可以从这些分组快速进入预约、社群、newsletter、视频、合作与社交主页。",
                it: "Usa questi gruppi per entrare subito in scheduling, community, newsletter, video, collaborazioni e profili social."
            }
        },
        podcastIntro: {
            label: { en: "Podcast network", zh: "播客矩阵", it: "Network podcast" },
            title: { en: "Four shows, multi-platform distribution", zh: "四档节目，多平台分发", it: "Quattro show, distribuzione multipiattaforma" },
            copy: {
                en: "The audio footprint spans English, Chinese, and Italian touchpoints, plus a dedicated feed for YC / Stanford CS183B commentary.",
                zh: "音频分发覆盖英文、中文、意大利语触点，并包含一条 YC / Stanford CS183B 的专门节目线。",
                it: "La presenza audio copre inglese, cinese e italiano, con un feed dedicato anche al corso YC / Stanford CS183B."
            }
        },
        quickIntro: {
            label: { en: "Quick routes", zh: "快速入口", it: "Percorsi rapidi" },
            title: { en: "Chinese listening shortcuts", zh: "中文收听快捷入口", it: "Scorciatoie per l'ascolto in cinese" },
            copy: {
                en: "If you want the Chinese show fast, these links jump directly into search results and platform home pages.",
                zh: "如果你想快速找到中文节目，这些链接可以直接进入搜索结果或平台首页。",
                it: "Se vuoi trovare subito lo show in cinese, questi link portano direttamente ai risultati di ricerca o alle home delle piattaforme."
            }
        }
    }
};

const METRICS = [
    { value: "3", label: { en: "languages", zh: "语言", it: "lingue" } },
    { value: "AI + Data", label: { en: "projects and systems", zh: "项目与系统", it: "progetti e sistemi" } },
    { value: "Global", label: { en: "media and community", zh: "媒体与社群", it: "media e community" } },
    { value: "Open", label: { en: "collaboration", zh: "合作", it: "collaborazione" } }
];

const SIGNALS = [
    {
        en: "AI projects / repositories / systems",
        zh: "AI 项目 / 仓库 / 系统",
        it: "Progetti AI / repository / sistemi"
    },
    {
        en: "Advisory / training / enterprise AI",
        zh: "顾问 / 培训 / 企业 AI",
        it: "Advisory / Formazione / AI enterprise"
    },
    {
        en: "Media / community / multilingual reach",
        zh: "媒体 / 社群 / 多语种传播",
        it: "Media / Community / Presenza multilingue"
    }
];

const INSIGHTS = [
    {
        title: { en: "AI projects", zh: "AI 项目", it: "Progetti AI" },
        copy: {
            en: "Repositories / systems / applied products.",
            zh: "仓库 / 系统 / 应用产品。",
            it: "Repository / Sistemi / Prodotti applicati."
        }
    },
    {
        title: { en: "Media & content", zh: "媒体与内容", it: "Media e contenuti" },
        copy: {
            en: "Podcasts / newsletters / articles / videos.",
            zh: "播客 / Newsletter / 文章 / 视频。",
            it: "Podcast / Newsletter / Articoli / Video."
        }
    },
    {
        title: { en: "Community & contact", zh: "社群与联系", it: "Community e contatti" },
        copy: {
            en: "Scheduling / communities / contact / collaboration.",
            zh: "预约 / 社群 / 联系 / 合作。",
            it: "Prenotazioni / Community / Contatto / Collaborazione."
        }
    }
];

const GROUPS = [
    {
        key: "call",
        badge: "Scheduling",
        title: { en: "Scheduling", zh: "预约", it: "Prenotazioni" },
        description: {
            en: "Scheduling / meetings / collaboration",
            zh: "预约 / 会议 / 合作沟通",
            it: "Prenotazioni / Riunioni / Collaborazione"
        },
        items: [
            { title: "Cal.com", url: "https://cal.com/stevenwang" },
            { title: "Google Calendar", url: "https://calendar.app.google/fT6ip6i638AGuP8v5" },
            { title: "ChiliPiper", url: "https://gmail.chilipiper.com/me/steven-wang" },
            { title: "Calendly", url: "https://calendly.com/steven_wang/60min" }
        ]
    },
    {
        key: "writing",
        badge: "Media",
        title: { en: "Media & content", zh: "社媒内容", it: "Media e contenuti" },
        description: {
            en: "Website / GitHub / newsletters / articles",
            zh: "主站 / GitHub / Newsletter / 文章",
            it: "Sito / GitHub / Newsletter / Articoli"
        },
        items: [
            { title: "GitHub", url: "https://github.com/learnbydoingwithsteven" },
            { title: "GitHub.io", url: "https://learnbydoingwithsteven.github.io/" },
            { title: "Bear Blog", url: "https://learnbydoingwithsteven.bearblog.dev/" },
            { title: "Substack", url: "https://substack.com/@steven923044" },
            { title: "Substack AI", url: "https://substack.com/@learnbydoingwithsteven" },
            { title: "LinkedIn Newsletter", url: "https://www.linkedin.com/newsletters/7283566848875384833/" },
            { title: { en: "WeChat Official Account", zh: "微信公众号", it: "Account ufficiale WeChat" }, url: "https://mp.weixin.qq.com/s/_UgwPOKp0KFDNQdPSYuWMg" }
        ]
    },
    {
        key: "advisory",
        badge: "Advisory",
        title: { en: "Advisory", zh: "顾问培训", it: "Advisory" },
        description: {
            en: "Advisory / training / enterprise AI",
            zh: "顾问 / 培训 / 企业 AI",
            it: "Advisory / Formazione / AI enterprise"
        },
        items: [
            { title: { en: "Open advisory page", zh: "打开介绍页", it: "Apri la pagina advisory" }, url: "advisory/" }
        ]
    },
    {
        key: "communities",
        badge: "Community",
        title: { en: "Communities", zh: "社群", it: "Community" },
        description: {
            en: "AI community / founder network / discussion groups",
            zh: "AI 社群 / 创业网络 / 讨论组",
            it: "Community AI / Network founder / Gruppi di discussione"
        },
        items: [
            { title: { en: "LinkedIn Group", zh: "LinkedIn 群组", it: "Gruppo LinkedIn" }, url: "https://www.linkedin.com/groups/15054015" },
            { title: "Discord", url: "https://discord.gg/XE6WpAfM" },
            { title: "Discord · Learn By Doing", url: "https://discord.gg/47yq8KcC" },
            { title: "Telegram Group", url: "https://t.me/+i9NRjGCKjRQxMDNk" },
            { title: "WhatsApp Group", url: "https://chat.whatsapp.com/Gmfju4artZB0VfRxV93H8p" }
        ]
    },
    {
        key: "direct",
        badge: "Contact",
        title: { en: "Contact", zh: "联系", it: "Contatto" },
        description: {
            en: "Email / collaboration / direct contact",
            zh: "邮箱 / 合作 / 直接联系",
            it: "Email / Collaborazione / Contatto diretto"
        },
        items: [{ title: "Email", url: "mailto:wjbear2020@gmail.com" }]
    },
    {
        key: "support",
        badge: "Support",
        title: { en: "Support", zh: "支持", it: "Supporto" },
        description: {
            en: "Sponsorship / support / contributions",
            zh: "赞助 / 支持 / 贡献",
            it: "Sponsorizzazione / Supporto / Contributi"
        },
        items: [
            { title: "PayPal", url: "https://www.paypal.com/paypalme/wangjiansuper?country.x=IT&locale.x=en_US" },
            { title: "Buy Me A Coffee", url: "https://buymeacoffee.com/learnbydoing" }
        ]
    },
    {
        key: "video",
        badge: "Video",
        title: { en: "Video channels", zh: "视频矩阵", it: "Canali video" },
        description: {
            en: "The short-form and long-form video footprint across global and Chinese platforms.",
            zh: "覆盖全球平台与中文平台的长短视频渠道。",
            it: "La presenza video tra piattaforme globali e cinesi."
        },
        items: [
            { title: "YouTube · Learn By Doing", url: "https://www.youtube.com/@learnbydoingwithsteven" },
            { title: { en: "YouTube · Shu Neng Sheng Zhi", zh: "YouTube · 数能生智", it: "YouTube · Shu Neng Sheng Zhi" }, url: "https://www.youtube.com/@%E6%95%B0%E8%83%BD%E7%94%9F%E6%99%BA" },
            { title: "TikTok", url: "https://www.tiktok.com/@learnbydoingwithsteven" },
            { title: { en: "Bilibili · Steven Data Talk", zh: "哔哩哔哩 · Steven 数据漫谈", it: "Bilibili · Steven Data Talk" }, url: "https://space.bilibili.com/3546784399886498?spm_id_from=333.788.upinfo.head.click" }
        ]
    },
    {
        key: "platforms",
        badge: "Channels",
        title: { en: "Platforms & newsletters", zh: "网站 / 频道 / 平台", it: "Piattaforme e newsletter" },
        description: {
            en: "Additional homes for newsletters, channels, and publishing surfaces.",
            zh: "更多承载 newsletter、频道与持续内容发布的平台。",
            it: "Altre basi per newsletter, canali e superfici di publishing."
        },
        items: [
            { title: "WhatsApp Channel", url: "https://whatsapp.com/channel/0029VazqfKFK0IBoyfgyO70b" },
            { title: "Telegram Channel", url: "https://t.me/learnbydoingwithsteven" },
            { title: "GitHub", url: "https://github.com/learnbydoingwithsteven" },
            { title: "GitHub.io", url: "https://learnbydoingwithsteven.github.io/" },
            { title: "LinkedIn Newsletter · Business", url: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7359504834644926464" },
            { title: "LinkedIn Newsletter · Tech", url: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7283566848875384833" },
            { title: "Substack", url: "https://substack.com/@steven923044" },
            { title: "Bear Blog", url: "https://learnbydoingwithsteven.bearblog.dev/" }
        ]
    },
    {
        key: "social",
        badge: "Social",
        title: { en: "Social profiles", zh: "社交平台", it: "Profili social" },
        description: {
            en: "Where the public identity spreads across Western and Chinese social platforms.",
            zh: "覆盖西方平台与中文平台的公开社交主页。",
            it: "Dove l'identita pubblica si distribuisce tra piattaforme occidentali e cinesi."
        },
        items: [
            { title: "Xiaohongshu", url: "https://www.xiaohongshu.com/user/profile/5e0e450b0000000001001e26?xsec_token=YBolHet_ed8Npv1I7yr4lMGb6VRZWtbkE9QSkodxdCu0I=&xsec_source=app_share&xhsshare=CopyLink&appuid=5e0e450b0000000001001e26&apptime=1737132065&share_id=c4262bd995c34cebaab2e0d85e5a3875" },
            { title: "LinkedIn · Independent Projects", url: "https://www.linkedin.com/in/steven-w-6828a31bb/" },
            { title: "LinkedIn · Full Career", url: "https://www.linkedin.com/in/jian-w-83bb36440/" },
            { title: "X / Twitter", url: "https://x.com/Catchingtides" },
            { title: "Facebook", url: "https://www.facebook.com/profile.php?id=61571798756202" },
            { title: "Instagram", url: "" }
        ]
    },
    {
        key: "collaborations",
        badge: "Partners",
        title: { en: "Collaborations", zh: "合作伙伴", it: "Collaborazioni" },
        description: {
            en: "Partner pages and appearances connected to Steven's community and media work.",
            zh: "与 Steven 的社群和媒体工作相关的伙伴页面与节目露出。",
            it: "Pagine partner e apparizioni collegate al lavoro di community e media."
        },
        items: [
            { title: "Vanta Tech Lab", url: "https://www.linkedin.com/company/vantatechlab" },
            { title: "DukeCEO", url: "https://www.linkedin.com/company/chinese-entrepreneurs-organization-at-duke-dukeceo" },
            { title: { en: "Founder Vision", zh: "创·见 Founder Vision", it: "Founder Vision" }, url: "https://www.xiaoyuzhoufm.com/podcast/66a322470736bb4045362844?s=eyJ1IjoiNjVkZDlhNDBlZGNlNjcxMDRhOThhNjZkIiwiZCI6MX0=" },
            { title: { en: "Guest episode", zh: "作为嘉宾的节目", it: "Episodio come ospite" }, url: "https://www.xiaoyuzhoufm.com/episode/690c8ad5d99642be96c4accc" }
        ]
    },
    {
        key: "hobby",
        badge: "Hobby",
        title: { en: "Hobby channels", zh: "兴趣频道", it: "Canali hobby" },
        description: {
            en: "A lighter side project stream around travel and life on the road.",
            zh: "围绕旅行与路上生活展开的轻内容侧线。",
            it: "Una linea piu leggera dedicata a viaggio e vita on the road."
        },
        items: [
            { title: "Steven On The Road · YouTube", url: "https://youtube.com/@stevenontheroad6129?si=pAUvAm0af6eFJrDn" },
            { title: "Steven On The Road · Bilibili", url: "https://space.bilibili.com/157133040" }
        ]
    }
];

const PROJECTS = [
    {
        repo: "ai_100",
        category: "systems",
        metric: { en: "100 apps", zh: "100 个应用", it: "100 app" },
        title: { en: "AI Applications Suite", zh: "AI 应用套件", it: "Suite di applicazioni AI" },
        description: {
            en: "A production-minded collection spanning vision, NLP, analytics, and domain workflows.",
            zh: "面向落地的 AI 应用组合，覆盖视觉、NLP、分析与行业工作流。",
            it: "Una collezione orientata alla produzione tra vision, NLP, analytics e workflow di dominio."
        },
        tags: ["AI", "Vision", "NLP"],
        github: "https://github.com/learnbydoingwithsteven/ai_100"
    },
    {
        repo: "ml_100",
        category: "systems",
        metric: { en: "100 apps", zh: "100 个应用", it: "100 app" },
        title: { en: "Machine Learning Applications", zh: "机器学习应用集合", it: "Applicazioni di machine learning" },
        description: {
            en: "Machine learning projects mapped across healthcare, finance, retail, transport, and environmental use cases.",
            zh: "将机器学习项目映射到医疗、金融、零售、交通与环境等多个场景。",
            it: "Progetti di machine learning distribuiti tra sanita, finance, retail, trasporti e ambiente."
        },
        tags: ["ML", "Prediction", "Applied"],
        github: "https://github.com/learnbydoingwithsteven/ml_100"
    },
    {
        repo: "agents_100",
        category: "agents",
        metric: { en: "100 agents", zh: "100 个智能体", it: "100 agenti" },
        title: { en: "AI Agents Collection", zh: "AI 智能体集合", it: "Collezione di agenti AI" },
        description: {
            en: "A broad look at autonomous agents, orchestration patterns, and multi-step automation flows.",
            zh: "系统展示自治智能体、编排模式与多步骤自动化流程。",
            it: "Una vista ampia su agenti autonomi, pattern di orchestrazione e flussi multi-step."
        },
        tags: ["Agents", "Automation", "Workflows"],
        github: "https://github.com/learnbydoingwithsteven/agents_100"
    },
    {
        repo: "llm_0-1",
        category: "learning",
        metric: { en: "100 lessons", zh: "100 节内容", it: "100 lezioni" },
        title: { en: "LLM Mastery Path", zh: "LLM 学习路径", it: "Percorso di padronanza sugli LLM" },
        description: {
            en: "From tokenization to deployment, this repository packages the key ideas behind large language models.",
            zh: "从分词到部署，把大语言模型的关键知识组织成一条连续学习阶梯。",
            it: "Dalla tokenizzazione al deployment, il repository raccoglie i concetti chiave dei large language model."
        },
        tags: ["LLM", "Training", "Deployment"],
        github: "https://github.com/learnbydoingwithsteven/llm_0-1"
    },
    {
        repo: "rl_100",
        category: "agents",
        metric: { en: "100 apps", zh: "100 个应用", it: "100 app" },
        title: { en: "Reinforcement Learning Apps", zh: "强化学习应用集合", it: "Applicazioni di reinforcement learning" },
        description: {
            en: "A repository line devoted to RL for robotics, trading, gaming, and decision-making systems.",
            zh: "一条专注于机器人、交易、游戏与决策系统的强化学习仓库线。",
            it: "Una linea di repository dedicata al RL per robotica, trading, gaming e sistemi decisionali."
        },
        tags: ["RL", "Control", "Simulation"],
        github: "https://github.com/learnbydoingwithsteven/rl_100"
    },
    {
        repo: "bank_100",
        category: "applied",
        metric: { en: "100 apps", zh: "100 个应用", it: "100 app" },
        title: { en: "Banking Applications", zh: "银行与金融应用", it: "Applicazioni per banking e finance" },
        description: {
            en: "Applied finance and banking systems for risk, fraud, compliance, and operational workflows.",
            zh: "围绕风险、反欺诈、合规与运营流程构建的金融应用组合。",
            it: "Sistemi applicati per finance e banking su rischio, antifrode, compliance e workflow operativi."
        },
        tags: ["Finance", "Risk", "Compliance"],
        github: "https://github.com/learnbydoingwithsteven/bank_100"
    },
    {
        repo: "law_100",
        category: "applied",
        metric: { en: "100 apps", zh: "100 个应用", it: "100 app" },
        title: { en: "Legal Technology Apps", zh: "法律科技应用", it: "Applicazioni legal tech" },
        description: {
            en: "Case management, document generation, and legal workflow automation packaged as applied products.",
            zh: "将案件管理、文档生成与法律流程自动化包装成应用型产品。",
            it: "Gestione casi, generazione documenti e automazione dei workflow legali."
        },
        tags: ["Legal", "Automation", "Documents"],
        github: "https://github.com/learnbydoingwithsteven/law_100"
    },
    {
        repo: "rag_10",
        category: "applied",
        metric: { en: "10 apps", zh: "10 个应用", it: "10 app" },
        title: { en: "RAG Applications", zh: "RAG 应用", it: "Applicazioni RAG" },
        description: {
            en: "Retrieval-augmented generation patterns for document-heavy workflows and grounded AI answers.",
            zh: "面向文档密集型工作流与可追溯回答的检索增强生成应用。",
            it: "Pattern RAG per workflow documentali e risposte AI ancorate alle fonti."
        },
        tags: ["RAG", "Search", "Knowledge"],
        github: "https://github.com/learnbydoingwithsteven/rag_10"
    }
];

const PODCASTS = [
    { title: "Steven Data Talk", badge: { en: "English", zh: "英文节目", it: "Show in inglese" }, links: ["https://podcasts.apple.com/gb/podcast/steven-data-talk/id1845702474", "https://open.spotify.com/show/3qSV5WJBsHbivqdmIopEYR?si=Q7XxCzxsSTKXmKiW27hmAA", "https://www.ximalaya.com/album/88884765", "https://www.xiaoyuzhoufm.com/podcast/68ef81ce0a78e59c5c5c45e7", "https://music.youtube.com/playlist?list=PLfV0OO4XXVBk1oCeZg-xwdnYbNuSDqgmW&si=EQtgt96FfSZSwxvc", "https://music.amazon.com/podcasts/b31ecf00-32e8-41b5-96cd-13e86253d249/steven-data-talk"] },
    { title: "Steven 数据漫谈", badge: { en: "Chinese", zh: "中文节目", it: "Show in cinese" }, links: ["https://podcasts.apple.com/gb/podcast/steven%E6%95%B0%E6%8D%AE%E6%BC%AB%E8%B0%88/id1845703144", "https://open.spotify.com/show/4b8dqmQmVQiPPxuIZNR58w?si=QgCsksYYSV-jTqz1e4tFpw", "https://www.ximalaya.com/album/89574928", "https://www.xiaoyuzhoufm.com/podcast/68ef81d14ce3619b345a32b2", "https://music.youtube.com/playlist?list=PLfV0OO4XXVBmQOOLxMpZXn519_PW3uneG&si=rgCVgHICnqNK5rFX", "https://music.amazon.com/podcasts/6d68d8c4-d7bb-4c1d-8b6c-1e9b0946463d/steven%E6%95%B0%E6%8D%AE%E6%BC%AB%E8%B0%88"] },
    { title: "Steven AI Talk", badge: { en: "Multilingual", zh: "多语言", it: "Multilingue" }, links: ["https://podcasts.apple.com/gb/podcast/steven-ai-talk-english/id1846320778", "https://open.spotify.com/show/43CVIH13u3pvIyg9aTEHwY?si=w-gPlNheRmCTfvlIPOwL9w", "https://music.amazon.com/podcasts/7aaf0f86-7cb1-4f6f-bba3-6fd3cb9dcad2/steven-ai-talkenglish", "https://www.xiaoyuzhoufm.com/podcast/68ef7ec2332567e348b6e57b", "https://music.youtube.com/playlist?list=PLfV0OO4XXVBk811V6mTVbL483S_56ZtF5&si=qqGM8Es0NTSFtflX", "https://open.spotify.com/show/7gLoHfOKO302yNcF7bzNOu?si=FU7xcKwUQU-jfTXxi0grBg", "https://www.ximalaya.com/album/88276097", "https://open.spotify.com/show/7D3BcWR5xGzGap8A1bSeoQ?si=ek8GNzrnT-OdiGJ91vi0rw"] },
    { title: { en: "YC / Stanford Startup Course 2015 CS183B", zh: "YC / Stanford 创业课 2015 CS183B 精讲", it: "Corso startup YC / Stanford 2015 CS183B" }, badge: { en: "Course commentary", zh: "课程精讲", it: "Commento al corso" }, links: ["https://podcasts.apple.com/us/podcast/yc%E6%96%AF%E5%9D%A6%E7%A6%8F%E5%88%9B%E4%B8%9A%E8%AF%BE2015cs183b%E7%B2%BE%E8%AE%B2/id1846320657", "https://open.spotify.com/show/5dg2pUoVlwvWCu2RSRYUay?si=esrJ8TByS-Cqrw4aOqKDyw", "https://m.ximalaya.com/album/109171033?from=pc", "https://www.xiaoyuzhoufm.com/podcast/68ef7ec662e8bfe0dffdd116", "https://music.youtube.com/playlist?list=PLfV0OO4XXVBlRgHAHArWBcpbOYykZfMqI&si=KwnQAp25yoprI39H", "https://music.amazon.com/podcasts/97f55ca2-d30d-48d8-afa5-9d51362bf92c/yc%E6%96%AF%E5%9D%A6%E7%A6%8F%E5%88%9B%E4%B8%9A%E8%AF%BE2015cs183b%E7%B2%BE%E8%AE%B2"] }
];

const QUICK_LINKS = [
    { title: "Spotify", url: "https://open.spotify.com/search/Steven%20%E6%95%B0%E6%8D%AE%E6%BC%AB%E8%B0%88" },
    { title: "Xiaoyuzhou", url: "https://www.xiaoyuzhoufm.com/" },
    { title: "Ximalaya", url: "https://www.ximalaya.com/" },
    { title: "Apple Podcasts", url: "https://podcasts.apple.com/search?term=%E6%95%B0%E6%8D%AE%E6%BC%AB%E8%B0%88" }
];

const FILTERS = {
    all: { en: "All", zh: "全部", it: "Tutti" },
    systems: { en: "AI Systems", zh: "AI 系统", it: "Sistemi AI" },
    learning: { en: "Learning Paths", zh: "学习路径", it: "Percorsi di apprendimento" },
    applied: { en: "Applied Platforms", zh: "行业平台", it: "Piattaforme applicate" },
    agents: { en: "Agents & RL", zh: "智能体与强化学习", it: "Agenti e RL" }
};

const HOME_GROUP_KEYS = ["advisory", "call", "writing", "communities", "direct", "support"];
const state = { lang: detectLanguage(), filter: "all" };

document.addEventListener("DOMContentLoaded", () => {
    bindLanguageSwitcher();
    bindBackToTop();
    bindHeaderState();
    bindAccordionControls();
    bindRevealObserver();
    applyLanguage(state.lang);
});

function detectLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ["en", "zh", "it"].includes(stored)) return stored;
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("zh")) return "zh";
    if (browser.startsWith("it")) return "it";
    return "en";
}

function applyLanguage(lang) {
    state.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    syncMeta(lang);
    syncStaticCopy(lang);
    syncLanguageButtons(lang);
    renderHome(lang);
    renderPortfolio(lang);
    renderDirectory(lang);
    revealNow();
}

function syncMeta(lang) {
    const page = document.body.dataset.page;
    document.title = text(COPY[page].metaTitle, lang);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", text(COPY[page].metaDescription, lang));
}

function syncStaticCopy(lang) {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = resolveCopy(node.dataset.i18n, lang);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
        node.setAttribute("aria-label", resolveCopy(node.dataset.i18nAriaLabel, lang));
    });
    const year = document.querySelector("[data-current-year]");
    if (year) year.textContent = new Date().getFullYear();
}

function resolveCopy(path, lang) {
    const value = path.split(".").reduce((acc, key) => acc?.[key], COPY);
    return text(value, lang);
}

function text(value, lang) {
    if (typeof value === "string") return value;
    return value?.[lang] ?? value?.en ?? "";
}

function bindLanguageSwitcher() {
    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.addEventListener("click", () => applyLanguage(button.dataset.lang));
    });
}

function syncLanguageButtons(lang) {
    document.querySelectorAll(".lang-btn").forEach((button) => {
        const active = button.dataset.lang === lang;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
    });
}

function bindBackToTop() {
    const button = document.querySelector(".top-button");
    if (!button) return;
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    const update = () => button.classList.toggle("is-visible", window.scrollY > 500);
    window.addEventListener("scroll", update, { passive: true });
    update();
}

function bindHeaderState() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", update, { passive: true });
    update();
}

function bindAccordionControls() {
    const expand = document.querySelector("[data-accordion='expand']");
    const collapse = document.querySelector("[data-accordion='collapse']");
    if (expand) expand.addEventListener("click", () => document.querySelectorAll("details.directory-group").forEach((item) => { item.open = true; }));
    if (collapse) collapse.addEventListener("click", () => document.querySelectorAll("details.directory-group").forEach((item) => { item.open = false; }));
}

function bindRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

function revealNow() {
    document.querySelectorAll(".reveal").forEach((node, index) => {
        setTimeout(() => node.classList.add("is-visible"), 18 * index);
    });
}

function renderHome(lang) {
    if (document.body.dataset.page !== "home") return;
    document.querySelector("#home-metrics").innerHTML = METRICS.map((metric) => `<article class="metric-pill"><span class="metric-value">${metric.value}</span><span class="metric-label">${text(metric.label, lang)}</span></article>`).join("");
    document.querySelector("#home-signals").innerHTML = SIGNALS.map((signal, index) => `<li><span class="signal-number">${String(index + 1).padStart(2, "0")}</span><span>${text(signal, lang)}</span></li>`).join("");
    document.querySelector("#home-insights").innerHTML = INSIGHTS.map((card) => `<article class="section-card span-4 reveal"><h3 class="card-title">${text(card.title, lang)}</h3><p class="card-copy">${text(card.copy, lang)}</p></article>`).join("");
    document.querySelector("#home-groups").innerHTML = HOME_GROUP_KEYS.map((key) => renderGroupCard(GROUPS.find((group) => group.key === key), lang)).join("");
}

function renderPortfolio(lang) {
    if (document.body.dataset.page !== "portfolio") return;
    document.querySelector("#portfolio-stats").innerHTML = [
        { value: "1,500+", label: { en: "applications", zh: "应用规模", it: "applicazioni" } },
        { value: "400+", label: { en: "courses and learning units", zh: "课程与学习单元", it: "corsi e unita di apprendimento" } },
        { value: "25+", label: { en: "flagship repositories", zh: "核心仓库", it: "repository di punta" } },
        { value: "3", label: { en: "supported interface languages", zh: "支持的界面语言", it: "lingue supportate" } }
    ].map((stat) => `<article class="metric-pill"><span class="metric-value">${stat.value}</span><span class="metric-label">${text(stat.label, lang)}</span></article>`).join("");

    const filtersNode = document.querySelector("#project-filters");
    filtersNode.innerHTML = Object.entries(FILTERS).map(([key, label]) => `<button class="filter-chip ${state.filter === key ? "is-active" : ""}" type="button" data-filter="${key}">${text(label, lang)}</button>`).join("");
    filtersNode.querySelectorAll("[data-filter]").forEach((button) => {
        button.addEventListener("click", () => {
            state.filter = button.dataset.filter;
            renderPortfolio(lang);
        });
    });

    const projects = state.filter === "all" ? PROJECTS : PROJECTS.filter((project) => project.category === state.filter);
    document.querySelector("#project-grid").innerHTML = projects.map((project) => `<article class="project-card reveal"><div class="project-top"><div class="project-head"><p class="project-repo">${project.repo}</p><h3 class="project-title">${text(project.title, lang)}</h3></div><span class="metric-chip">${text(project.metric, lang)}</span></div><p class="project-desc">${text(project.description, lang)}</p><div class="project-tags">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div><div class="project-actions"><a class="button button-secondary" href="${project.github}" target="_blank" rel="noopener">${text(COPY.shared.nav.github, lang)}</a></div></article>`).join("");
}

function renderDirectory(lang) {
    if (document.body.dataset.page !== "directory") return;
    document.querySelector("#directory-groups").innerHTML = GROUPS.map((group) => renderGroupDetails(group, lang)).join("");
    document.querySelector("#podcast-grid").innerHTML = PODCASTS.map((show) => `<article class="podcast-card reveal"><span class="show-badge">${text(show.badge, lang)}</span><div class="podcast-head"><h3 class="podcast-title">${text(show.title, lang)}</h3><p class="podcast-copy">${show.links.length} links</p></div><div class="podcast-platforms">${show.links.map((url) => `<a class="platform-link" href="${url}" target="_blank" rel="noopener"><div class="link-meta"><h4 class="platform-name">${labelFromUrl(url)}</h4><p class="platform-desc">${shortUrl(url)}</p></div><span class="link-arrow">↗</span></a>`).join("")}</div></article>`).join("");
    document.querySelector("#quick-links").innerHTML = QUICK_LINKS.map((item) => `<a class="quick-card reveal" href="${item.url}" target="_blank" rel="noopener"><div class="quick-meta"><h3 class="quick-title">${item.title}</h3><p class="quick-copy">${shortUrl(item.url)}</p></div><span class="link-arrow">↗</span></a>`).join("");
}

function renderGroupCard(group, lang) {
    return `<article class="link-group-card reveal ${group.key === "advisory" ? "is-highlight" : ""}"><div class="card-top"><div><span class="group-badge">${group.badge}</span><h3 class="card-title">${text(group.title, lang)}</h3><p class="card-copy">${text(group.description, lang)}</p></div><span class="group-summary-count">${group.items.length}</span></div><div class="link-list">${group.items.slice(0, 4).map((item) => renderLink(item, lang)).join("")}</div></article>`;
}

function renderGroupDetails(group, lang) {
    return `<details class="directory-group reveal" open><summary><div class="group-summary-copy"><span class="group-badge">${group.badge}</span><h3 class="group-summary-title">${text(group.title, lang)}</h3><p class="group-summary-meta">${text(group.description, lang)}</p></div><div class="site-nav"><span class="group-summary-count">${group.items.length}</span><span class="summary-caret" aria-hidden="true"></span></div></summary><div class="directory-items">${group.items.map((item) => renderLink(item, lang)).join("")}</div></details>`;
}

function renderLink(item, lang) {
    const title = text(item.title, lang);
    if (!item.url) {
        return `<div class="link-card is-muted"><div class="link-meta"><h4 class="link-name">${title}</h4><p class="link-desc">Coming soon</p></div><span class="link-arrow">·</span></div>`;
    }
    const external = item.url.startsWith("http");
    return `<a class="link-card" href="${item.url}" ${external ? 'target="_blank" rel="noopener"' : ""}><div class="link-meta"><h4 class="link-name">${title}</h4><p class="link-desc">${shortUrl(item.url)}</p></div><span class="link-arrow">↗</span></a>`;
}

function shortUrl(url) {
    if (url.startsWith("mailto:")) return url.replace("mailto:", "");
    try {
        const parsed = new URL(url);
        const host = parsed.host.replace(/^www\./, "");
        let path = parsed.pathname.replace(/\/+$/, "");
        if (path.length > 28) path = `${path.slice(0, 28)}...`;
        const suffix = parsed.search ? "?..." : "";
        return `${host}${path}${suffix}` || host;
    } catch {
        return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    }
}

function labelFromUrl(url) {
    if (url.includes("apple.com")) return "Apple Podcasts";
    if (url.includes("spotify.com")) return "Spotify";
    if (url.includes("ximalaya")) return "Ximalaya";
    if (url.includes("xiaoyuzhou")) return "Xiaoyuzhou";
    if (url.includes("youtube.com") || url.includes("music.youtube.com")) return "YouTube Music";
    if (url.includes("amazon.com")) return "Amazon Music";
    return "Open Link";
}
