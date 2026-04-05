from fastapi import FastAPI
import subprocess

app = FastAPI()

# Root endpoint
@app.get("/")
def home():
    return {"status": "AgentForge backend running"}

# Main endpoint (USE POST ONLY)
@app.post("/run")
def run(data: dict):
    try:
        prompt = data.get("prompt", "Build a system")

        result = subprocess.run(
            ["python3", "-m", "jaclang", "run", "main.jac", prompt],
            capture_output=True,
            text=True,
            timeout=20
        )

        output = result.stdout

        return {
            "status": "success",
            "output": output
        }

    except Exception as e:
        return {
            "status": "error",
            "output": str(e)
        }