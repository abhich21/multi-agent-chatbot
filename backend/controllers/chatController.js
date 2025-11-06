
const asyncHandler = require('express-async-handler');
const AgentManager = require('../agents/agentManager.js');
const Conversation = require('../models/conversationModel.js'); 
const { generatePdf, savePdfToDownloads } = require('../utils/pdfGenerator.js');

const DEMO_USER_ID = "demo-user";

/**
 * Handles message → agent workflow → conversation save → send PDF download
 */
exports.handleMessage = asyncHandler(async (req, res) => {
  const { message, conversationId } = req.body;
  if (!message) {
    res.status(400);
    throw new Error("Please include a message.");
  }

  // 1️⃣ Run the multi-agent logic
  const { finalSummary, agentSteps } = await AgentManager.handleMessage(message);

  // 2️⃣ Save or update conversation
  let conversation =
    (conversationId && (await Conversation.findById(conversationId))) ||
    (await Conversation.findOne({ userId: DEMO_USER_ID }).sort({ createdAt: -1 }));
  if (!conversation) conversation = new Conversation({ userId: DEMO_USER_ID, messages: [] });

  conversation.messages.push({ sender: "user", name: "User", text: message });
  agentSteps.forEach((a) =>
    conversation.messages.push({ sender: "agent", name: a.name, text: a.output })
  );
  await conversation.save();

  // 3️⃣ Generate & save PDF to Downloads folder
  const pdfBuffer = await generatePdf({
    userMessage: message,
    agents: agentSteps,
    finalSummary,
  });
  const pdfPath = savePdfToDownloads(pdfBuffer);

  // 4️⃣ Send file as immediate download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${pdfPath.split("\\").pop()}`);
  res.download(pdfPath);
});
/**
 * @desc Get all conversations
 * @route GET /api/conversations
 * @access Public (or protect later with auth)
 */
exports.getAllConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find().sort({ createdAt: -1 }); // newest first
  res.status(200).json(conversations);
});

/**
 * @desc Get a single conversation by ID
 * @route GET /api/conversations/:id
 * @access Public (or protect later with auth)
 */
exports.getConversationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const conversation = await Conversation.findById(id);

  if (!conversation) {
    res.status(404);
    throw new Error("Conversation not found");
  }

  res.status(200).json(conversation);
});