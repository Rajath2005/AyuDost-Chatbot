import { useState, useRef } from 'react';

const Chatform = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;
    
    onSendMessage(message);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic here
    if (!isRecording) {
      // Start recording
      console.log('Starting voice recording...');
    } else {
      // Stop recording
      console.log('Stopping voice recording...');
    }
  };

  const handleEmojiClick = () => {
    // Simple emoji picker - you can expand this
    const emojis = ['😊', '👍', '❤️', '🌿', '🙏', '💯', '🔥', '✨'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setMessage(prev => prev + randomEmoji);
    inputRef.current?.focus();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
      onSendMessage(`📎 Shared file: ${file.name}`);
    }
  };

  return (
    <div className="chat-form-container">
      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-actions">
          <button
            type="button"
            className="action-button file-btn"
            title="Upload file"
          >
            <label htmlFor="file-upload">
              <span className="material-symbols-rounded">attach_file</span>
            </label>
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx"
            />
          </button>

          <button
            type="button"
            className="action-button emoji-btn"
            onClick={handleEmojiClick}
            title="Add emoji"
          >
            <span className="material-symbols-rounded">sentiment_satisfied</span>
          </button>
        </div>

        <div className="input-container">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="message-input"
            rows="1"
            disabled={disabled}
            maxLength={500}
          />
          <div className="character-count">
            <span className={message.length > 450 ? 'warning' : ''}>
              {message.length}/500
            </span>
          </div>
        </div>

        <div className="send-actions">
          <button
            type="button"
            className={`action-button voice-btn ${isRecording ? 'recording' : ''}`}
            onClick={handleVoiceRecord}
            title={isRecording ? 'Stop recording' : 'Voice message'}
          >
            <span className="material-symbols-rounded">
              {isRecording ? 'stop' : 'mic'}
            </span>
          </button>

          <button
            type="submit"
            className={`send-button ${!message.trim() || disabled ? 'disabled' : ''}`}
            disabled={!message.trim() || disabled}
            title="Send message"
          >
            <span className="material-symbols-rounded">send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatform;