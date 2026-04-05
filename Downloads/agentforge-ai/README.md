git add .
git commit -m "Final clean structure"
git push# AgentForge AI 🚀

**Autonomous Multi-Agent Development System** built with JAC and Backboard.

## 🎯 Overview

CodeForge is a multi-agent system that simulates a real software development team. Each agent has a specialized role and collaborates through JAC's graph-native orchestration.

## 🧠 Agents

1. **Architect (AI)** - Designs system architecture using Backboard API
2. **Backend Engineer** - Structures server implementation
3. **API Engineer** - Defines endpoints and routes
4. **Reviewer (AI)** - Analyzes system for bugs and improvements using Backboard API

## 🏗️ Architecture

```
User Request
    ↓
JAC Walker (orchestrator)
    ↓
Python Bridge
    ↓
Backboard API (LLM)
    ↓
Multi-Agent Pipeline
```

## 🛠️ Tech Stack

- **JAC** - Multi-agent orchestration
- **Backboard** - LLM routing and memory
- **Python** - API bridge (JAC ↔ Backboard)

## 🚀 Installation

```bash
# Install JAC
pip install jaseci

# Install Backboard SDK
pip install backboard-sdk

# Set API key
export BACKBOARD_API_KEY="your_key_here"
```

## ▶️ Usage

```bash
python -m jaclang run main.jac "Build a fintech fraud detection system"
```

## 📊 Example Output

```
🧠 [Architect] Analyzing requirements...
💻 [Backend] Generating server code...
🔌 [API] Creating endpoints...
🔍 [Reviewer] Analyzing system...

✅ CodeForge pipeline complete!
```

## 🎯 Hackathon Integration

- ✅ **JAC** - Core orchestration (30% of judging)
- ✅ **Backboard** - Real LLM integration
- ✅ **Multi-agent** - Demonstrates agentic AI

## 🔮 Future Vision

- Add Security Agent
- Add DevOps/Insforge deployment
- Add Lovable UI dashboard
- Expand to 8 specialized agents

## 📝 License

Built for JACHacks 2026
