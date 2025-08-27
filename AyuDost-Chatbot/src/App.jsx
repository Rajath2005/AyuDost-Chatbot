import { useState, useRef, useEffect } from 'react';
import ChatBotIcon from "./components/ChatbotIcon";
import Chatform from "./components/Chatform";
import QuickReplies from "./components/QuickReplies";

const App = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hey there 👋\nI\'m your AyuDost, your personal Ayurvedic health assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const chatBodyRef = useRef(null);

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: `Thank you for your message: "${messageText}". I'm processing your query about Ayurvedic remedies. Let me help you with that! 🌿`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      text: 'Chat cleared! How can I assist you with Ayurvedic wellness today? 🌿',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  // ...existing code...
const quickReplies = [
  { id: 1, text: "🌿 Herbal remedies", query: "Tell me about herbal remedies for common ailments" },
  { id: 2, text: "🧘‍♀️ Yoga poses", query: "Suggest some yoga poses for stress relief" },
  { id: 3, text: "🍵 Ayurvedic diet", query: "What should I eat according to Ayurveda?" },
  { id: 4, text: "💤 Sleep tips", query: "Give me Ayurvedic tips for better sleep" }
];

  return (
    <div className="container">
      <div className={`chatbot-popup ${isMinimized ? 'minimized' : ''}`}>
        {/* Chatbot Header */}
        <div className="chatbot-header">
          <div className="header-info">
            <div className="bot-avatar">
              <ChatBotIcon />
              <div className={`status-indicator ${onlineStatus ? 'online' : 'offline'}`}></div>
            </div>
            <div className="header-text">
              <h2 className="logo-text">AyuDost-Chatbot</h2>
              <span className="status-text">{onlineStatus ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="action-btn" onClick={clearChat} title="Clear Chat">
              <span className="material-symbols-rounded">delete</span>
            </button>
            <button className="action-btn minimize-btn" onClick={toggleMinimize} title={isMinimized ? 'Expand' : 'Minimize'}>
              <span className="material-symbols-rounded">
                {isMinimized ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              </span>
            </button>
          </div>
        </div>

        {/* Chatbot Body */}
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message) => (
            <div key={message.id} className={`message-${message.type}-message`}>
              {message.type === 'bot' && <ChatBotIcon />}
              <div className="message-content">
                <p className="message-text">{message.text}</p>
                <span className="message-time">{message.timestamp}</span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message-bot-message typing">
              <ChatBotIcon />
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="message-time">Typing...</span>
              </div>
            </div>
          )}

          {/* Quick Reply Buttons */}
          {messages.length === 1 && !isTyping && (
            <QuickReplies quickReplies={quickReplies} onReply={handleSendMessage} />
          )}
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <div className="footer-info">
            <span className="powered-by">Powered by AyuDost AI</span>
          </div>
          <Chatform onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default App;