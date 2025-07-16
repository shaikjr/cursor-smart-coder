import { OpenAI } from "openai";

const OPENAI_API_KEY =
 "YOUR_OPENAI_KEY";
const client = new OpenAI({ apikey: OPENAI_API_KEY });
async function init() {
  client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: "can u create a package.json file on my system",
      },
    ],
  });
  console.log(response.choices[0].message.content);
}

init();
