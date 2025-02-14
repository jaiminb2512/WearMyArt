import axios from "axios";
import ApiResponse from "./ApiResponse.js";

const SendOTP = async (email, OTP, textContent) => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;

  const data = {
    sender: { email: senderEmail, name: "MERN App" },
    to: [{ email }],
    subject: "Your OTP Code",
    textContent,
  };

  try {
    await axios.post("https://api.brevo.com/v3/smtp/email", data, {
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
      },
    });

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error(
      "❌ Error sending OTP:",
      error.response?.data || error.message
    );
    return { success: false, message: "OTP sending failed" };
  }
};

export default SendOTP;
