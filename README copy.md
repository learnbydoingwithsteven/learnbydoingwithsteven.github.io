# YouTube Projects Repository

Welcome to my YouTube Projects Repository! This collection showcases various data science, machine learning, and AI projects demonstrated on my YouTube channel. Each project is designed to explore different aspects of modern technology and provide practical implementations.

## 🌐 Connect With Me
- [📺 YouTube Channel - Learn by Doing](https://www.youtube.com/@learnbydoingwithsteven)
- [📺 YouTube Channel - Steven学以致用](https://www.youtube.com/@Steven学以致用)
- [☕ Buy Me a Coffee](https://buymeacoffee.com/learnbydoing)
- [💬 Join My Discord](https://discord.gg/TyDaMKAV)
- [💻 GitHub Profile](https://github.com/learnbydoingwithsteven)
- [🎵 TikTok - Learn by Doing](https://www.tiktok.com/@learn.by.doing4)
- [🎶 Spotify Podcast CN](https://spotifyanchor-web.app.link/e/To7ArGnHZNb)
- [🎶 Spotify Podcast EN](https://spotifyanchor-web.app.link/e/ZHi3LoLHZNb)
- [🔗 LinkedIn - Steven W.](https://www.linkedin.com/in/steven-w-6828a31bb)
- [✖️ X - Catchingtides](https://x.com/Catchingtides)

## 📂 Project Directory

### 🤖 AI and Large Language Models

#### AutoGen Projects
- [Research Group Chat and RAG](./20240517%20AUTOGEN%20RESEARCH%20GROUP%20CHAT%20AND%20RAG%20GROUP%20CHAT) - Implementation of advanced group chat functionality with RAG capabilities
- [Nested Chat Implementation](./20240906_autogen_nested_chat) - Demonstration of nested conversation structures in AutoGen
- [Code Executors](./20240501_autogen_code_executors) - Various code execution implementations using AutoGen
- [Command Line Executors](./20240501%20autogen%20command%20line%20executors) - Specialized executors for command-line operations

#### LLM Implementations
- [Ollama LOR Analysis](./20241001%20ollama%20lor%20ending%20analysis) - Text analysis using Ollama on Lord of the Rings
- [Web RAG with Ollama](./20241121_web_rag_ollama_json_ok) - Implementation of RAG system using Ollama and web data
- [Local Chatbot with LM Studio](./20240905_gradio_lmstudio_chatbot_local) - Gradio-based chatbot using local LM Studio models
- [LLAMA 3.2 Tests](./20240926_llama3.2_1b_3b_tests) - Performance testing of LLAMA 3.2 1B and 3B models
- [GPT4 Testing](./20240913_gpt4o_test) - Evaluation and testing of GPT-4 capabilities
- [Hugging Face Model Tests](./20241029_hugg_model_test) - Various experiments with Hugging Face models

### 📊 Data Science and Analysis

#### Financial Analysis
- Stock Analysis Projects:
  - [Basic Analysis Report](./20240502%20stock%20analysis%20report%20basic%20version) - Fundamental stock analysis reporting
  - [News Sentiment Analysis](./20240505%20stock%20news%20sentiment%20analysis) - Stock market sentiment analysis from news
  - [Price Visualization](./20240429_Code_with_GPT_Stock_Price_Visualization) - Interactive stock price visualization tools
  - [Intrinsic Value Calculation](./20240429_stock_intrinsic_value_calculation) - Stock valuation models
  - [FRED Chart Integration](./20240429_streamlit_stock_fred_chart) - Federal Reserve Economic Data visualization
- [CrewAI Financial Analysis](./20240909_CREWAI_FI_ANALYSIS) - Advanced financial analysis using CrewAI
- [Bank Simulation](./20240915%20bank%20simulation) - Comprehensive banking system simulation
- [BOI Sanction Data Analysis](./20240429_boi_sanction_data_llm) - Analysis of Bank of India sanction data

### 🧮 Machine Learning and Deep Learning

#### Neural Networks
- [ANN Simulations](./20241022_ann_simulations) - Artificial Neural Network implementations and experiments
- [YouTube Algorithm Test](./20241022_youtube_algorithm_simple_test) - Simple implementation of recommendation algorithms
- [Weather Forecast Models](./20240912_Weather_Forcast_3_models) - Comparison of three different weather forecasting models
- [FFT Implementation](./20241128_FFT_FAST) - Fast Fourier Transform implementation and analysis

#### Transformers and NLP
- [Transformer Playground](./20240915_datatalkep2_numpy_transformerplayground) - Experimental space for transformer architectures
- [GPT2 and BERT](./20240913_transformer_gpt2_bert) - Implementation and comparison of GPT-2 and BERT models
- [iPhone News Sentiments](./20240912_iphone_news_sentiments) - Sentiment analysis of iPhone-related news

### 📈 Data Science Education

#### Data Talk Series
1. [Episode 1: DS Course & Tools](./20240915_datatalkep1_dsccourse_dstools)
2. [Episode 2: NumPy & Transformers](./20240915_datatalkep2_numpy_transformerplayground)
3. [Episode 3: Pandas](./20240917_data_talk_episode3_pandas)
4. [Episode 4: Matplotlib](./20240917_data_talk_ep4_matplotlib)
5. [Episode 5: Seaborn](./20240919_datatalk_ep5_seaborn)

### 🛠️ Development Tools and Infrastructure
- [Windsurf Tutorial](./20241117_windsurf_tutorial_30min_app_and_docker) - 30-minute app development and Docker implementation
- [DepthPro Testing](./20241018_DepthPro_Test) - Depth processing and analysis tools

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- Git
- Virtual environment tool (venv, conda, or similar)
- Basic understanding of command line operations

### Initial Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/learnbydoingwithsteven/youtube-projects.git
   cd youtube-projects
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # On Windows
   .\.venv\Scripts\activate
   # On Unix or MacOS
   source .venv/bin/activate
   ```

### Project-Specific Setup
Each project has its own setup requirements. Navigate to the specific project directory and check for:
- Project-specific README.md
- Setup instructions in the project documentation
- Dependencies listed in the project files

### Common Dependencies

#### For AI/LLM Projects
```bash
pip install torch transformers accelerate autogen langchain
```

#### For Data Science Projects
```bash
pip install pandas numpy matplotlib seaborn jupyter scikit-learn
```

#### For Web Applications
```bash
pip install streamlit gradio flask
```

### 🔑 API Keys Setup
Create a `.env` file in the project directory:
```env
OPENAI_API_KEY=your_key_here
HUGGINGFACE_API_KEY=your_key_here
```

### 📝 Development Guidelines

#### Code Style
- Follow [PEP 8](https://peps.python.org/pep-0008/) guidelines
- Use clear, descriptive variable names
- Add docstrings to functions and classes
- Comment complex logic

#### Version Control
- Create feature branches from `main`
- Use meaningful commit messages
- Keep commits focused and atomic

### 🐛 Troubleshooting

#### Common Issues
1. GPU Setup
   ```bash
   # Check CUDA availability
   python -c "import torch; print(torch.cuda.is_available())"
   ```

2. Environment Issues
   ```bash
   # Create fresh environment
   conda create -n project_env python=3.8
   conda activate project_env
   ```

#### Getting Help
- Check the [Issues](https://github.com/learnbydoingwithsteven/youtube-projects/issues) page
- Join our [Discord](https://discord.gg/TyDaMKAV) community
- Watch the related [YouTube tutorial](https://www.youtube.com/@learnbydoingwithsteven)

### 🔄 Updating
```bash
git pull origin main
```

## 📝 License
This project is licensed under the terms specified in [LICENSE.txt](./LICENSE.txt).

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---
⭐ If you find this repository helpful, please consider giving it a star!
