import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";

const InputBox = ({ onSend, isLoading }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) handleSend(); 
  };

  const isDisabled = isLoading || !text.trim();

  return (
    <div className="flex items-center gap-4 p-4 bg-white border-t border-gray-100">
      <input
        type="text"
        className="flex-grow p-4 border border-gray-300 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-500 text-base shadow-inner"
        placeholder={isLoading ? "Please wait for the agent response..." : "Ask me anything..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <button
        onClick={handleSend}
        disabled={isDisabled}
        className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-lg transition-all duration-300 transform ${
          isDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-105 active:scale-95"
        }`}
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Send size={20} />
        )}
      </button>
    </div>
  );
};

export default InputBox;