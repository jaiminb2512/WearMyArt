import "dotenv/config";
import pkg from "bullmq";
import { sendMail } from "./sendMail.js";
import {
  generateAddOrderEmailContent,
  generateBlockUserEmailContent,
  generateStatusChangeOfOrderEmailContent,
  generateUnBlockUserEmailContent,
  generateUpdateUserEmailContent,
  generateActivateUserEmailContent,
  generateDeActivateUserEmailContent,
} from "./emailTemplate.js";

const { Worker } = pkg;

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const { to, senderName, name, subject, topic } = job.data;

    let body = "";
    if (topic == "blockUser") {
      body = generateBlockUserEmailContent(name);
    } else if (topic == "unblockUser") {
      body = generateUnBlockUserEmailContent(name);
    } else if (topic == "nameChanged") {
      body = generateUpdateUserEmailContent(name);
    } else if (topic == "orderStatusChanged") {
      const { data } = job.data;
      body = generateStatusChangeOfOrderEmailContent(name, data);
    } else if (topic == "addOrder") {
      const { data } = job.data;

      const orderDetailsArray = data.newOrder;
      const finalProductImgs = data.FinalProductImg;

      body = generateAddOrderEmailContent(
        name,
        orderDetailsArray,
        finalProductImgs
      );
    } else if (topic == "activateUser") {
      body = generateActivateUserEmailContent(name);
    } else if (topic == "deActivateUser") {
      body = generateDeActivateUserEmailContent(name);
    } else {
      console.log(`Invalid Topic ${topic}`);
      return;
    }

    await sendMail(to, senderName, subject, body);
    return;
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
