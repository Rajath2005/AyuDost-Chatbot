import ChatBotIcon from "./components/ChatbotIcon";
const App = () => {
  return (
    <div class="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chatbot-header">
          <div className="header info">
            <ChatBotIcon />
            <h2 className="logo text">
              AyuDost-Chatbot
            </h2>
          </div>
          <button
            className="material-symbols-rounded">
            keyboard_arrow_down</button>
          {/* Chatbot Body */}
          <div className="chat body">
            <div className="message bot-message">
              <p className="message text">
                Hey there 👋 <br /> How can i help you today?
              </p>
            </div>
            <div className="message user-message">
              <p className="message text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse deleniti, quae, totam vitae dolor ut culpa nobis, maxime aliquam sed necessitatibus tempora recusandae? Ab obcaecati enim, sed ad unde exercitationem?
              </p>
            </div>
          </div>

          {/* Chatbot Footer*/}

          <div className="chat footer">
            <form action="#" className="chat">
              <input type="text" placeholder="Message..."
                className="message-inpuut" required />
              <button
                className="material-symbols-rounded">
                arrow_upward</button>
            </form>


          </div>
        </div>
      </div>

    </div>
  )
}

export default App;