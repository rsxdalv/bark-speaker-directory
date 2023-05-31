import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";
import { parseMetadataDate } from "../components/parseMetadataDate";

const basePath = path.join(__dirname, "../../../public");
// const basePath = path.join(__dirname, "../../public");
const voicesPath = path.join(basePath, "voices");
const getVoices = () => fs.readdirSync(voicesPath);

const generationsPath = path.join(basePath, "generations");
const getGenerations = () => fs.readdirSync(generationsPath);

const oggPath = path.join(basePath, "ogg");
const getOgg = () => fs.readdirSync(oggPath);

const baseUrlPath = "/bark-speaker-directory";
// const baseUrlPath = "";

// For each voice get voice.json file and parse it
// Return array of objects
// --------------------------------------------------
export const getVoicesData = () => {
  const voices = getVoices();
  const voicesData = voices.map((voice) => {
    const voiceData = fs.readFileSync(
      path.join(voicesPath, voice, "voice.json"),
      "utf8"
    );
    return JSON.parse(voiceData);
  });
  // include the directory name in the object
  voicesData.forEach((voice, index) => {
    voice.directory = voices[index];
  });
  // join path for image, audio and download keys with directory
  voicesData.forEach((voice) => {
    const fixPath = (key: string) => {
      if (voice[key]) {
        voice[key] = path
          .join(baseUrlPath, "voices", voice.directory, voice[key])
          .split(path.sep)
          .join("/");
      }
    };
    fixPath("image");
    fixPath("audio");
    fixPath("download");
  });
  return voicesData;
};

export const getOggData = async () => {
  const ogg = getOgg();
  const oggData = ogg.map(async (ogg) => {
    const filename = path.join(oggPath, ogg);
    const metadata = await parseFile(filename);
    try {
      return JSON.parse(
        // metadata?.common?.comment?.[0] || "{}"
        metadata?.native?.vorbis?.filter((x) => x.id === "DESCRIPTION")[0].value || "{}"
      );
    } 
    catch (error) {
      console.error(error);
      console.log(
        "Error parsing metadata for file: " + filename
      )
      console.log(
        "metadata?.native?.vorbis?.filter((x) => x.id === 'DESCRIPTION')[0].value: " + metadata?.native?.vorbis?.filter((x) => x.id === "DESCRIPTION")[0].value
      )
      return {};
    }
  });
  const oggDataParsed = await Promise.all(oggData);
  // Sort by date
  oggDataParsed.sort((a, b) => {
    return (
      parseMetadataDate(b.date).getTime() -
      parseMetadataDate(a.date).getTime()
    );
  });
  return oggDataParsed;
};

// Save voices data to json file
// --------------------------------------------------
const saveVoicesData = () => {
  const voicesData = getVoicesData();
  const voicesDataJSON = JSON.stringify(voicesData, undefined, 2);
  fs.writeFileSync(
    path.join(__dirname, "./src/data/voices.json"),
    voicesDataJSON
  );
};

