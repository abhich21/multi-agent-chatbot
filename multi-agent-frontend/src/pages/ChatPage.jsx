import React, { useState, useEffect } from "react";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import { sendMessage, getAllConversations, getConversationById } from "../api/chatApi";
import { Bot, MessageSquare, FileText, PlusCircle } from "lucide-react"; // Added PlusCircle for New Chat

// Helper function to create a title snippet from the first user message
const getTitleSnippet = (messages) => {
  const firstUserMessage = messages.find(msg => msg.sender === 'user');
  if (firstUserMessage) {
    // Truncate the message and add ellipsis
    const text = firstUserMessage.text.trim();
    return text.length > 30 ? text.substring(0, 30) + '...' : text;
  }
  return "New Chat";
};


const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]); // State for the list of all conversations
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // --- API Handlers ---

  const fetchConversations = async () => {
    try {
      const all = await getAllConversations();
      setConversations(all);
      return all;
    } catch (error) {
      console.error("Failed to load conversation list:", error);
      return [];
    }
  }

  const handleSelectConversation = async (id) => {
    if (id === conversationId) return; // Already active

    setIsLoading(true);
    setConversationId(id);
    setMessages([]); // Clear messages while loading
    
    try {
      const data = await getConversationById(id);
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to load specific conversation:", error);
      setMessages([{ sender: "agent", name: "Error", text: "Failed to load conversation history." }]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleNewChat = () => {
    setConversationId(null);
    setMessages([]);
  }

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const data = await sendMessage(text, conversationId);
      setIsTyping(false);

      if (data?.conversationId) {
        // If a new conversation was created or ID was confirmed
        setConversationId(data.conversationId);
        // Refresh the conversation list to show the new or updated chat
        const updatedConversations = await fetchConversations();
        
        // If it's a new conversation, set the list to the latest one
        if (!conversationId && updatedConversations.length > 0) {
            setConversationId(updatedConversations[0]._id);
        }
      }

      if (data?.message && !data.messages) {
        setMessages((prev) => [
          ...prev,
          { sender: "agent", name: "System", text: data.message },
        ]);
      } else if (data?.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      setIsTyping(false);
      // Only append the error if the server didn't provide a full message array
      if (!err.response || err.response.status !== 200) {
        setMessages((prev) => [
          ...prev,
          { sender: "agent", name: "Error", text: `API Request Failed: ${err.message}` },
        ]);
      }
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  // --- Initial Load Effect ---
  useEffect(() => {
    (async () => {
      const allConversations = await fetchConversations();
      if (allConversations.length > 0) {
        // Set the active conversation to the first (latest) one
        setConversationId(allConversations[0]._id);
        setMessages(allConversations[0].messages || []);
      }
    })();
  }, []);

  // --- Component Rendering ---

  // Get the title for the main chat window based on the active conversation
  const chatTitle = conversationId
    ? getTitleSnippet(messages)
    : "Start a New Chat";
    
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      {/* Increased max-w to 6xl to fit the sidebar */}
      <div className="w-full max-w-6xl h-[90vh] flex bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300">
        
        {/* 1. Sidebar for Conversation History */}
        <div className="w-64 flex-shrink-0 border-r border-gray-100 bg-gray-50 flex flex-col overflow-y-auto hidden md:flex">
          
          {/* New Chat Button */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-600 transition-colors active:scale-[.98]"
            >
              <PlusCircle size={20} />
              <span>New Chat</span>
            </button>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => handleSelectConversation(conv._id)}
                className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  conv._id === conversationId
                    ? "bg-indigo-100 text-indigo-700 font-semibold shadow-inner"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FileText size={18} />
                <p className="truncate text-sm">{getTitleSnippet(conv.messages)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Main Chat Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Modern Header */}
          <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <Bot size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">AI Collaboration Console</h1>
                <p className="text-xs text-gray-500 truncate">{chatTitle}</p>
              </div>
            </div>
            <div className="text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer md:hidden">
              <MessageSquare size={24} />
            </div>
          </header>

          <ChatWindow messages={messages} isTyping={isTyping} isLoading={isLoading} />

          <InputBox onSend={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;