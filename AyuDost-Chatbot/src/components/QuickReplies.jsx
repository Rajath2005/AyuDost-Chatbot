import React from "react";

const QuickReplies = ({ quickReplies, onReply }) => (
  <div className="quick-replies">
    <p className="quick-replies-title">Quick options:</p>
    <div className="quick-replies-grid">
      {quickReplies.map((reply) => (
        <button
          key={reply.id}
          className="quick-reply-btn"
          onClick={() => onReply(reply.query)}
        >
          {reply.text}
        </button>
      ))}
    </div>
  </div>
);

export default QuickReplies;
