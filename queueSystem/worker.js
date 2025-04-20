import "dotenv/config";
import pkg from "bullmq";
import { sendMail } from "./sendMail.js";

const { Worker } = pkg;

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const { to, senderName, subject, body } = job.data;

    await sendMail(to, senderName, subject, body);

    return "Email sent successfully!";
  },
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  }
);

emailWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});

emailWorker.on("error", (err) => {
  console.error("❗ Worker error:", err);
});
