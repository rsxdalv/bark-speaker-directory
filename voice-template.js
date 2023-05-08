const fs = require("fs");
const path = require("path");

const voicesPath = path.join(__dirname, "./public/voices");

const template = {
  name: "Jade",
  image: "./image.jpg",
  audio: "./sample.wav",
  download: "./jade.npz",
  tags: [],
  language: "american",
  gender: "female",
  author: "rsxdalv",
};

const saveVoice = (voice, voicePath) => {
  const voiceData = JSON.stringify(voice, null, 2);
  fs.writeFileSync(path.join(voicePath, "voice.json"), voiceData);
};

const createVoice = (template, name, language, gender, author, tags = []) => {
  const voicePath = path.join(voicesPath, name);
  fs.mkdirSync(voicePath);
  const voice = {
    ...template,
    name,
    download: `./${name}.npz`,
    language,
    gender,
    author,
    tags,
  };
  saveVoice(voice, voicePath);
};

createVoice(template, "Sumire", "japanese", "female", "rsxdalv", [
  "cute",
  "young",
  "studio",
]);
