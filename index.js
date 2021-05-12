const Connectycube = require("connectycube");

// Initialise SDK

const APPLICATION_CREDENTIALS = {
  appId: 0,
  authKey: "...",
  authSecret: "...",
};

Connectycube.init(APPLICATION_CREDENTIALS);

// Connect to Real-Time Chat
const BOT_USER_CREDENTIALS = {
  userId: 0,
  password: "...",
};

const onError = (error) => {
  console.log("Chat connect is failed", JSON.stringify(error));
  process.exit(1);
};

const onConnected = () => {
  console.log("Bot is up and running");
  // Add chat messages listener
  Connectycube.chat.onMessageListener = onMessageListener;
};

function onMessageListener(userId, msg) {
  // process 1-1 messages
  if (msg.type === "chat" && msg.body) {
    const answerMessage = {
      type: "chat",
      body: msg.body, // echo back original message
      extension: {
        save_to_history: 1,
      },
    };

    Connectycube.chat.send(userId, answerMessage);
  }
}


// JS SDK v2+
Connectycube.chat.connect(BOT_USER_CREDENTIALS).then(onConnected).catch(onError);

process.on("exit", function () {
  console.log("Kill bot");
  Connectycube.chat.disconnect();
});
