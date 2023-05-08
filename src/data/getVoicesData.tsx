import fs from "fs";
import path from "path";

const voicesPath = path.join(__dirname, "../../../public/voices");
const getVoices = () => {
  const voices = fs.readdirSync(voicesPath);
  return voices;
};
// For each voice get voice.json file and parse it
// Return array of objects
// --------------------------------------------------
export const getVoicesData = () => {
  const voices = getVoices();
  const voicesData = voices.map(voice => {
    const voiceData = fs.readFileSync(path.join(voicesPath, voice, "voice.json"), "utf8");
    return JSON.parse(voiceData);
  });
  // include the directory name in the object
  voicesData.forEach((voice, index) => {
    voice.directory = voices[index];
  });
  // join path for image, audio and download keys with directory
  voicesData.forEach(voice => {
    voice.image = path.join("voices", voice.directory, voice.image).split(path.sep).join("/");
    voice.audio = path.join("voices", voice.directory, voice.audio).split(path.sep).join("/");
    voice.download = path.join("voices", voice.directory, voice.download).split(path.sep).join("/");
  });
  return voicesData;
};
// Save voices data to json file
// --------------------------------------------------
const saveVoicesData = () => {
  const voicesData = getVoicesData();
  const voicesDataJSON = JSON.stringify(voicesData, undefined, 2);
  fs.writeFileSync(path.join(__dirname, "./src/data/voices.json"), voicesDataJSON);
};
