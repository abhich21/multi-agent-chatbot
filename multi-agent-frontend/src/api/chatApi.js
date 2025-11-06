import axios from "axios";
import { API_BASE_URL } from "../config";

export const sendMessage = async (message, conversationId = null) => {
  const payload = { message };
  if (conversationId) payload.conversationId = conversationId;

  try {
    const response = await axios.post(`${API_BASE_URL}/message`, payload, {
      responseType: "blob",
    });

    const contentType = response.headers["content-type"];

    if (contentType?.includes("application/pdf")) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      return {
        message: "✅ Your collaborative report has been generated and downloaded.",
      };
    }

    const text = await response.data.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getAllConversations = async () => {
  const res = await axios.get(`${API_BASE_URL}/conversations`);
  return res.data;
};


// Get conversation by ID
export const getConversationById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/conversations/${id}`);
  return res.data;
};
