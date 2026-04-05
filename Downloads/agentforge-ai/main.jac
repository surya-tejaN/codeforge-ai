import sys;
import subprocess;

node Project {
    has request: str;
    has architecture: str = "";
    has backend: dict = {};
    has api: dict = {};
    has review: str = "";
}

walker CodeForge {

    can start with Root entry {
        req = sys.argv[1] if len(sys.argv) > 1 else "Build a blog API with JWT authentication";

        proj = Project(request=req);
        root ++> proj;

        visit proj;
    }

    can run_pipeline with Project entry {

        # 🧠 AGENT 1: ARCHITECT (REAL AI via Backboard)
        print("🧠 [Architect] Analyzing requirements...");
        
        result = subprocess.run(
            ["python", "run_architect.py", here.request],
            capture_output=True,
            text=True
        );
        
        here.architecture = result.stdout.strip();

        report {
            "agent": "Architect (AI)",
            "output": here.architecture
        };

        # 💻 AGENT 2: BACKEND ENGINEER (Structured)
        print("💻 [Backend] Generating server code...");
        
        here.backend = {
            "framework": "Node.js + Express",
            "features": ["middleware", "routing", "error handling"],
            "based_on": here.architecture
        };

        report {
            "agent": "Backend Engineer",
            "output": here.backend
        };

        # 🔌 AGENT 3: API ENGINEER (Structured)
        print("🔌 [API] Creating endpoints...");
        
        here.api = {
            "auth": "JWT",
            "routes": ["POST /login", "POST /signup", "GET /protected"],
            "middleware": ["cors", "helmet", "rate-limiter"],
            "based_on": here.backend
        };

        report {
            "agent": "API Engineer",
            "output": here.api
        };

        # 🔍 AGENT 4: REVIEWER (REAL AI via Backboard)
        print("🔍 [Reviewer] Analyzing system...");
        
        code_summary = "Architecture: " + here.architecture + " | Backend: Express | API: JWT auth";
        
        result2 = subprocess.run(
            ["python", "run_reviewer.py", code_summary],
            capture_output=True,
            text=True
        );
        
        here.review = result2.stdout.strip();

        report {
            "agent": "Reviewer (AI)",
            "output": here.review
        };

        # 🛡️ AGENT 5: SECURITY (REAL AI via Backboard)
        print("🛡️ [Security] Checking vulnerabilities...");
        
        security_input = "Analyze security risks and vulnerabilities in this system: " + here.architecture;
        
        result3 = subprocess.run(
            ["python", "run_reviewer.py", security_input],
            capture_output=True,
            text=True
        );
        
        security_output = result3.stdout.strip();

        report {
            "agent": "Security Agent (AI)",
            "output": security_output
        };

        # 🐞 AGENT 6: DEBUGGER (REAL AI via Backboard)
        print("🐞 [Debugger] Finding issues...");
        
        debug_input = "Find bugs and suggest improvements in this system: " + here.architecture;
        
        result4 = subprocess.run(
            ["python", "run_reviewer.py", debug_input],
            capture_output=True,
            text=True
        );
        
        debug_output = result4.stdout.strip();

        report {
            "agent": "Debugger Agent",
            "output": debug_output
        };

        # 🗄️ AGENT 7: DATABASE ENGINEER (Structured)
        print("🗄️ [Database] Designing schema...");
        
        database = {
            "db": "MongoDB",
            "collections": ["users", "transactions"],
            "features": ["indexing", "scaling", "replication"],
            "based_on": here.architecture
        };

        report {
            "agent": "Database Engineer",
            "output": database
        };

        # 🚀 AGENT 8: DEVOPS AGENT (Structured)
        print("🚀 [DevOps] Preparing deployment...");
        
        devops = {
            "deployment": "Kubernetes",
            "tools": ["Docker", "CI/CD", "Monitoring"],
            "platform": "Insforge-ready",
            "based_on": here.architecture
        };

        report {
            "agent": "DevOps Agent",
            "output": devops
        };

        print("\n✅ AgentForge pipeline complete!");
    }
}

with entry {
    print("============================================================");
    print("🚀 AgentForge AI - 8-Agent Multi-Agent System");
    print("============================================================\n");
    
    result = root spawn CodeForge();
    
    print("\n============================================================");
    print("📊 Agent Outputs:");
    print("============================================================");
    print(result.reports);
}