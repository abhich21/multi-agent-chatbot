import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import MessageBubble from "./MessageBubble";
import { Loader2 } from "lucide-react"; // Import Loader2

const ChatWindow = ({ messages, isTyping, isLoading }) => { // Added isLoading prop
  return (
    <ScrollToBottom className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-gray-50">
      
      {/* Display messages if not fully loading the window */}
      {!isLoading && messages.map((msg, i) => (
        <MessageBubble key={i} sender={msg.sender} name={msg.name} text={msg.text} />
      ))}

      {/* Full Window Loading State (e.g., when switching conversations) */}
      {isLoading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <Loader2 size={32} className="animate-spin text-indigo-500 mb-4" />
          <p className="font-medium">Loading conversation history...</p>
        </div>
      )}

      {/* Typing Indicator Update (only runs if chat is active and not fully loading) */}
      {!isLoading && isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl shadow-sm border border-gray-200">
            <div className="flex gap-2 items-center">
              <span className="text-xs text-gray-500 italic">Agent is thinking</span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-[bounce_1.5s_infinite]"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-[bounce_1.5s_infinite_0.15s]"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-[bounce_1.5s_infinite_0.3s]"></span>
            </div>
          </div>
        </div>
      )}
    </ScrollToBottom>
  );
};

export default ChatWindow;