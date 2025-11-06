const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController.js");

// POST /api/message
router.post("/message", chatController.handleMessage);

// GET all conversations
router.get("/conversations", chatController.getAllConversations);

// GET conversation by ID
router.get("/conversations/:id", chatController.getConversationById);

module.exports = router;
