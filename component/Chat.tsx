import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import axios from "axios";


const ChatWidget = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input.trim(), isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    axios.post("https://chat.yasararafath.in/", {
      message: userMessage.text
    })
    .then((response)=> {
      const reply: {data: {reply: string}} = response.data
      setMessages((prev) => [
        ...prev,
        { text: reply.data.reply, isUser: false },
      ]);
    })
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-md h-[500px] flex flex-col bg-white shadow p-4 rounded-lg">
      {/* Header */}
      <div className="bg-black text-white p-4 text-lg font-semibold rounded-t-xl">
        Yasar Arafath
      </div>
  
      {/* Chat Messages */}
      <div className="flex-1 py-4 px-2 overflow-y-auto space-y-3 flex flex-col bg-gray-50">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`relative max-w-[80%] px-4 py-2 text-sm break-words transition-all duration-300 ${
            msg.isUser
              ? "self-end bg-gradient-to-br from-blue-500 to-blue-600 text-black rounded-3xl rounded-br-sm"
              : "self-start bg-gray-200 text-gray-900 rounded-3xl rounded-bl-sm"
          }`}
        >
          {msg.text}
        </div>
      ))}
        <div ref={messagesEndRef} />
      </div>
  
      {/* Input Area */}
      <div className="flex items-center justify-evenly gap-2 border-t border-gray-300 rounded-b-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#4A90E2] outline-none text-sm"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-[#4A90E2] hover:bg-[#357ABD] rounded-full transition text-black"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
