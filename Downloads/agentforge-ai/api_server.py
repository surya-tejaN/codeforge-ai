from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# ✅ CORS FIX (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROOT (optional test)
@app.get("/")
def home():
    return {"message": "AgentForge AI backend running"}

# ✅ MAIN ENDPOINT (Lovable will call this)
@app.get("/run")
def run(prompt: str = "Build a fintech system"):
    try:
        # Run your JAC pipeline
        result = subprocess.run(
            ["python3", "-m", "jaclang", "run", "main.jac", prompt],
            capture_output=True,
            text=True
        )

        output = result.stdout

        return {
            "output": output
        }

    except Exception as e:
        return {
            "output": f"Error: {str(e)}"
        }