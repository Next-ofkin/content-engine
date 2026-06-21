const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition } = require("@remotion/renderer");
const fs = require("fs");
const path = require("path");

async function renderVideo() {
  const rawScript = fs.readFileSync("./output/latest-script.txt", "utf8");

  const cleanText = rawScript
    .replace(/\*+\s*HOOK:?\s*\**/gi, "")
    .replace(/\*+\s*BODY:?\s*\**/gi, "")
    .replace(/\*+\s*TAKEAWAY:?\s*\**/gi, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  console.log("Bundling Remotion project...");
  const bundleLocation = await bundle({
    entryPoint: path.join(process.cwd(), "remotion", "index.jsx"),
  });

  console.log("Selecting composition...");
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "ShortVideo",
    inputProps: { scriptText: cleanText },
  });

  console.log("Rendering video...");
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: "./output/video.mp4",
    inputProps: { scriptText: cleanText },
  });

  console.log("Video rendered to output/video.mp4");
}

renderVideo();