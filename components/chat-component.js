import { LitElement, html, css } from "/node_modules/lit/index.js";

class ChatComponent extends LitElement {
  static styles = css`
    #chat-container {
      width: fit-content;
      height: 32rem;
      margin: 12rem auto;
      border: 0.0625rem solid #ccc;
      border-radius: 0.5rem;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    #chat-box {
      width: calc(100% - 2rem);
      margin-top: 1rem;
      height: 25rem;
      overflow-y: auto;
    }
    .header-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ccc;
    }
    .header-container img {
      padding: 0.1875rem;
      width: 3rem;
      border-radius: 100%;
      background-color: #f9f9f9;
      margin: 0.5rem;
    }
    .header-container button {
      margin: 0.5rem;
    }
    .message-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    .-message {
      background-color: #dcf8c6;
      color: #333;
      border-radius: 0.75rem;
      padding: 0.375rem 0.75rem;
      max-width: 100%;
      align-self: flex-end;
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }
    .bot-message {
      background-color: #96c8fe;
      color: #333;
      border-radius: 0.75rem;
      padding: 0.375rem 0.75rem;
      max-width: 100%;
      align-self: flex-start;
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }
    .message-container div:empty {
      display: none;
      border-bottom: unset !important;
    }
    .input-container {
      width: fit-content;
      display: flex;
      gap: 0.375rem;
      justify-content: center;
      align-items: center;
      background-color: #ccc;
      padding: 0.5rem;
      border-bottom-left-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
    }
    #user-input {
      width: 100%;
      border-radius: 0.375rem;
      border: 1px solid #ccc;
      outline: none;
      padding: 0.5rem;
      font-size: 1rem;
    }
    #send-button,
    #audio-button,
    .header-container button {
      padding: 0.375rem 0.75rem;
      border: none;
      height: 2.25rem;
      border-radius: 0.375rem;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
      font-size: 1rem;
    }
    #send-button:hover,
    #audio-button:hover,
    .header-container button:hover {
      background-color: #0056b3;
    }
    .bot-image,
    .user-image {
      max-width: 100%;
      height: auto;
      border-radius: 0.75rem;
      margin-top: 0.375rem;
    }
    @media only screen and (max-width: 600px) {
      #chat-container {
        width: 100%;
        height: 100vh;
        margin: 0;
      }

      .input-container {
        width: calc(100% - 1rem);
        padding: 0.5rem 1rem;
      }
    }
  `;

  constructor() {
    super();
    this.messages = [];
    this.userInput = "";
  }

  render() {
    return html`
      <div id="chat-container">
        <div class="header-container">
          <div style="display: flex; align-items: center;">
            <img src="/static/thuban_logo.png" alt="Logo" id="logo" />
            <p style="color: #333">Chat Bot Thuban</p>
          </div>
          <button @click="${this.restartConversation}">Reset</button>
        </div>
        <div id="chat-box">
          ${this.messages.map(
            (message) => html`
              <div class="message-container">
                <div class="${message.sender}-message">${message.text}</div>
                ${message.audio
                  ? html`<audio src="${message.audio}" controls></audio>`
                  : ""}
                ${message.image
                  ? html`<img
                      src="${message.image}"
                      class="${message.sender}-image"
                    />`
                  : ""}
              </div>
            `
          )}
        </div>
        <div class="input-container">
          <input
            type="text"
            id="user-input"
            .value="${this.userInput}"
            @input="${this.handleInput}"
            @keydown="${this.handleKeyDown}"
            placeholder="Escribe un mensaje..."
          />
          <button id="send-button" @click="${this.sendMessage}">Enviar</button>
          <button id="audio-button" @click="${this.startRecording}">🎙️</button>
        </div>
      </div>
    `;
  }

  handleInput(event) {
    this.userInput = event.target.value;
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage(message = this.userInput.trim()) {
    if (message !== "") {
      this.appendMessage({ text: message, sender: "user" });

      fetch(`http://127.0.0.1:5000/get_bot_response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: "user",
          message: message,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del bot:", data);
          if (Array.isArray(data)) {
            data.forEach((message) => {
              this.appendMessage(message, "bot");
              this.speakMessage(message.text);
            });
          } else {
            console.error("El formato de la respuesta no es un array:", data);
          }
        })
        .catch((error) => console.error("Error:", error));
    }

    this.userInput = "";
    this.requestUpdate();
  }

  appendMessage(message, sender) {
    this.messages = [...this.messages, { text: message.text, sender: sender }];
    this.requestUpdate();
  }

  startRecording() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.sendMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      alert("Voice recognition error. Please try again.");
    };

    recognition.start();
  }

  speakMessage(message) {
    const msg = new SpeechSynthesisUtterance(message);
    msg.lang = "en-EN";
    window.speechSynthesis.speak(msg);
  }

  restartConversation() {
    this.messages = [];
    this.requestUpdate();
  }
}

customElements.define("chat-component", ChatComponent);
