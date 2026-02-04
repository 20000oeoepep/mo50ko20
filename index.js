const login = require("fca-unofficial");

// نقرأ appstate.json من متغير البيئة (Heroku Config Vars)
const appState = JSON.parse(process.env.APPSTATE);

login({ appState }, (err, api) => {
  if (err) {
    console.error("❌ Login Failed:", err);
    return;
  }

  console.log("✅ Logged in successfully!");

  api.setOptions({ listenEvents: true });

  api.listenMqtt((err, event) => {
    if (err) return console.error(err);
    if (event.type !== "message" || !event.body) return;

    const msg = event.body.trim().toLowerCase();
    let reply = null;

    // الردود الأساسية
    if (msg === "سلام عليكم" || msg === "السلام عليكم") {
      reply = "وعليكم السلام ورحمة الله وبركاته 🤍";
    } 
    else if (msg === "هلا" || msg === "هاي") {
      reply = "هلا بيك 🌹";
    }
    else if (msg === "شلونك") {
      reply = "تمام الحمدلله 🤍";
    }

    if (reply) {
      api.sendMessage(reply, event.threadID);
    }
  });
});
