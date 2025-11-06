import React, { useState, useEffect } from "react";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import { sendMessage, getAllConversations } from "../api/chatApi";
import { Bot, MessageSquare } from "lucide-react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const data = await sendMessage(text, conversationId);
      setIsTyping(false);

      if (data?.conversationId) setConversationId(data.conversationId);

      if (data?.message && !data.messages) {
        setMessages((prev) => [
          ...prev,
          { sender: "agent", name: "System", text: data.message },
        ]);
      } else if (data?.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "agent", name: "Error", text: err.message },
      ]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const all = await getAllConversations();
        if (all?.length > 0) {
          setConversationId(all[0]._id);
          setMessages(all[0].messages);
        }
      } catch (error) {
        console.error("Failed to load conversations:", error);
      }
    })();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-4xl h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300">
        
        <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <Bot size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">AI Collaboration Console</h1>
          </div>
          <div className="text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer">
            <MessageSquare size={24} />
          </div>
        </header>

        <ChatWindow messages={messages} isTyping={isTyping} />

        <InputBox onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatPage;