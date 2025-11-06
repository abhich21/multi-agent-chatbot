import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, isTyping }) => {
  return (
    <ScrollToBottom className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-gray-50">
      {messages.map((msg, i) => (
        <MessageBubble key={i} sender={msg.sender} name={msg.name} text={msg.text} />
      ))}

      {isTyping && (
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