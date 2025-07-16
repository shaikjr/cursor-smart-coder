# cursor-smart-coder
Autonomous AI agent that uses GPT-4 inside Cursor IDE to think, plan, and generate complete codebases step-by-step (THINK → ACTION → OUTPUT).
> Example: Ask it to **"Build me a To-Do app with HTML, CSS, and JavaScript"** — it will plan, code, and save the working result.

---

## 🚀 Features

- 💬 Accepts natural language queries
- 🧠 Multi-step agent logic: THINK → ACTION → OUTPUT
- 🛠️ Uses OpenAI's GPT-4 for planning and code generation
- 📄 Outputs full code (e.g., HTML/CSS/JS) saved locally
- 🔁 Automatic loop until output is complete
- 🗂️ Saves result in `output/` folder

---

## 🧪 How It Works

1. **START** – You ask a question (e.g., “Build a to-do app”)
2. **THINK** – Agent analyzes the task in multiple steps
3. **ACTION** – Optional planning or partial code generation
4. **OUTPUT** – Full code returned and saved to `output/todo.html`

All responses are in strict JSON format, making the process machine-readable and deterministic.

---

## 📦 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cursor-dev-agent.git
cd cursor-dev-agent
