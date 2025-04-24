import pkg from "bullmq";
const { Queue } = pkg;

const notificationQueue = new Queue("email-queue", {
  connection: {
    url: process.env.REDIS_URL,
  },
});

export default notificationQueue;
