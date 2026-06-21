const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function uploadFile(localPath, remoteKey) {
  const fileContent = fs.readFileSync(localPath);

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: remoteKey,
    Body: fileContent,
  });

  await s3.send(command);
  console.log(`Uploaded ${localPath} to R2 as ${remoteKey}`);
}

async function main() {
  const today = new Date().toISOString().split("T")[0];

  await uploadFile("./output/latest-script.txt", `${today}/script.txt`);
  await uploadFile("./output/voiceover.mp3", `${today}/voiceover.mp3`);
}

main();