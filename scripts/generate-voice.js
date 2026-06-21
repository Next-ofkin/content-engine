const { EdgeTTS } = require("node-edge-tts");
const fs = require("fs");

async function generateVoice() {
  // UPDATED PATH BELOW:
  const scriptText = fs.readFileSync("./output/latest-script.txt", "utf8");

  // Strip out the HOOK:/BODY:/TAKEAWAY: labels, keep just the spoken content
const cleanText = scriptText
    .replace(/\*+\s*HOOK:?\s*\**/gi, "")
    .replace(/\*+\s*BODY:?\s*\**/gi, "")
    .replace(/\*+\s*TAKEAWAY:?\s*\**/gi, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tts = new EdgeTTS({
    voice: "en-US-AriaNeural",
    lang: "en-US",
  });

  // UPDATED PATH BELOW:
  await tts.ttsPromise(cleanText, "./output/voiceover.mp3");
  console.log("Voiceover saved to output/voiceover.mp3");
}

generateVoice();