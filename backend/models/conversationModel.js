const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "agent"],
    required: true,
  },
  name: {
    type: String, // e.g., "Sales Agent", "Report Agent", "Summary Agent"
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Conversation schema
const ConversationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: "demo-user",
  },
  messages: {
    type: [MessageSchema],
    default: [],
  },
  pdfUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;
