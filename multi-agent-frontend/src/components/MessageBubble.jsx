import React from "react";
import { User, Cpu } from "lucide-react"; 

const MessageBubble = ({ sender, name, text }) => {
  const isUser = sender === "user";
  const defaultName = isUser ? "You" : "AI Agent";

  return (
    <div
      className={`flex w-full transition-all duration-300 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Agent Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mr-3 mt-1 h-8 w-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shadow-sm">
          <Cpu size={18} className="text-indigo-600" />
        </div>
      )}

      {/* Message Content Bubble */}
      <div
        className={`max-w-[85%] sm:max-w-[70%] p-4 rounded-xl shadow-md animate-fadeIn transition-all duration-300 text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-500 text-white rounded-tr-none"
            : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
        }`}
      >
        {!isUser && (
          <p className="text-xs font-semibold text-indigo-600 mb-1 leading-none">{name || defaultName}</p>
        )}
        <p className="whitespace-pre-wrap">{text}</p>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 ml-3 mt-1 h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center shadow-sm">
          <User size={18} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;