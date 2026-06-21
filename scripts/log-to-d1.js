const { execSync } = require("child_process");

function logVideo(topic, scriptPath, voiceoverPath) {
  const today = new Date().toISOString().split("T")[0];

  const command = `npx wrangler d1 execute content-engine-db --command "INSERT INTO videos (date, topic, script_path, voiceover_path, status) VALUES ('${today}', '${topic.replace(/'/g, "''")}', '${scriptPath}', '${voiceoverPath}', 'draft');" --remote`;

  execSync(command, { stdio: "inherit" });
  console.log("Logged to D1 database");
}

const topic = process.argv[2] || "unknown topic";
const today = new Date().toISOString().split("T")[0];

logVideo(topic, `${today}/script.txt`, `${today}/voiceover.mp3`);