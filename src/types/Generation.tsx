export type Generation = {
  name: string;
  prompt?: string;
  directory: string;
  audio: string;
  tags: string[];
  // deprecated
  download: string;
  language: "american" | "german" | "spanish" | "french" | "hindi" | "chinese" | "portuguese" | "russian" | "turkish" | "polish" | "korean" | "japanese" | "italian";
  author: string;
  gender: "male" | "female" | "other";
  image: string;
};
