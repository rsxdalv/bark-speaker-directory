import fs from "fs";
import path from "path";
import { inspect } from "util";
import { parseFile } from "music-metadata";

const basePath = path.join(__dirname, "../../../public");
// const basePath = path.join(__dirname, "../../public");
const voicesPath = path.join(basePath, "voices");
const getVoices = () => fs.readdirSync(voicesPath);

const generationsPath = path.join(basePath, "generations");
const getGenerations = () => fs.readdirSync(generationsPath);

const oggPath = path.join(basePath, "ogg");
const getOgg = () => fs.readdirSync(oggPath);

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
          .join("voices", voice.directory, voice[key])
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

export const getGenerationsData = () => {
  const generations = getGenerations();
  const generationsData = generations.map((generation) => {
    const generationData = fs.readFileSync(
      path.join(generationsPath, generation, "generation.json"),
      "utf8"
    );
    return JSON.parse(generationData);
  });
  // include the directory name in the object
  generationsData.forEach((generation, index) => {
    generation.directory = generations[index];
  });
  // join path for image, audio and download keys with directory
  generationsData.forEach((generation) => {
    const fixPath = (key: string) => {
      if (generation[key]) {
        generation[key] = path
          .join("generations", generation.directory, generation[key])
          .split(path.sep)
          .join("/");
      }
    };
    fixPath("audio");
  });

  return generationsData;
};

export const getOggData = async () => {
  const ogg = getOgg();
  const oggData = ogg.map(async (ogg) => {
    const filename = path.join(oggPath, ogg);
    const metadata = await parseFile(filename);
    try {
      return JSON.parse(
        metadata?.common?.comment?.[0] || "{}"
      );
    } 
    catch (error) {
      console.error(error);
      console.log(
        metadata?.common?.comment?.[0]
      )
      return {};
    }
  });
  const oggDataParsed = await Promise.all(oggData);
  return oggDataParsed;
  // console.log(inspect(oggDataParsed, { showHidden: false, depth: null }));
  // include the directory name in the object
  // oggData.forEach((ogg, index) => {
  //   ogg.directory = ogg[index];
  // });
  // // join path for image, audio and download keys with directory
  // oggData.forEach((ogg) => {
  //   const fixPath = (key: string) => {
  //     if (ogg[key]) {
  //       ogg[key] = path
  //         .join("ogg", ogg.directory, ogg[key])
  //         .split(path.sep)
  //         .join("/");
  //     }
  //   };
  //   fixPath("audio");
  // });

  return oggData;
};

getOggData();

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

