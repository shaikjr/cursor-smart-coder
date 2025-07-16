import { OpenAI } from "openai";
import fs from "fs";
import path from "path";

const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY ||
  "YOUR_OPENAI_KEY";

const client = new OpenAI({ apiKey: OPENAI_API_KEY });

const userQuery =
  "Build me a simple To-Do list app using HTML, CSS, and JavaScript.";

const sys_prom = `
You are a helpful AI developer assistant.

You work using the phases: START → THINK → ACTION → OUTPUT.

⚠️ RULES:
- ONLY respond with a single valid JSON object.
- DO NOT include any extra text or markdown. No explanations outside JSON.
- Each response must strictly follow this format:

{
  "step": "THINK" | "ACTION" | "OBSERVE" | "OUTPUT",
  "tool": "string (optional)",
  "input": "string (optional)",
  "content": "string (explanation or full code)"
}

When the user requests a code task, think step-by-step (THINK), plan (ACTION), and finally OUTPUT the full code in a single response.
`;

async function init() {
  try {
    const messages = [
      { role: "system", content: sys_prom },
      { role: "user", content: userQuery },
    ];

    while (true) {
      const res = await client.chat.completions.create({
        model: "gpt-4",
        messages,
      });

      const reply = res.choices[0].message.content;
      console.log("\n🔁 Assistant response:\n", reply);

      let step;
      try {
        step = JSON.parse(reply);
      } catch (err) {
        console.error("❌ JSON parse error:", err.message);
        console.error("⚠️ Full assistant reply:\n", reply);
        break;
      }

      messages.push({ role: "assistant", content: reply });

      // allow GPT to continue through THINK, ACTION, until it reaches OUTPUT
      if (step.step === "THINK" || step.step === "ACTION") continue;

      if (step.step === "OUTPUT") {
        const outputDir = "./output";
        const fileName = "todo.html";

        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        const filePath = path.join(outputDir, fileName);
        fs.writeFileSync(filePath, step.content, "utf8");

        console.log(`\n✅ Code saved to ${filePath}`);
        break;
      }

      console.warn("⚠️ Unexpected step:", step.step);
      break;
    }
  } catch (error) {
    console.error("❌ OpenAI API error:", error);
  }
}

init();
