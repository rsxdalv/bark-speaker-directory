import AuthorIcon from "@material-design-icons/svg/filled/person.svg";
import DownloadIcon from "@material-design-icons/svg/filled/download.svg";
import WomanIcon from "@material-design-icons/svg/filled/female.svg";
import ManIcon from "@material-design-icons/svg/filled/male.svg";
import OtherIcon from "@material-design-icons/svg/filled/alt_route.svg";
import React from "react";
import { Flag } from "./Flag";
import { Voice } from "./Voice";
import { useFavorites, saveOrDeleteFromFavorites } from "./FavoritesProvider";

export const CardBig = ({
  voice: { name, audio, download, image, tags, language, author, gender },
}: {
  voice: Voice;
}) => {
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col space-y-4 w-full h-full justify-between">
        <div className="flex items-center w-full gap-x-2">
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <div className="ml-auto" />
          <Author author={author} />
          <Download download={download} />
          <SaveToFavorites download={download} />
          <Gender gender={gender} />
          <Flag language={language} />
        </div>
        <div className="flex w-full space-x-4">
          <img
            className="w-24 h-24 rounded select-none"
            src={image}
            width={96}
            height={96}
          />
          <ul className="flex flex-wrap justify-start items-start content-start gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="px-2 py-1 text-sm font-medium text-gray-800 bg-gray-200 rounded"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <AudioAsComponent audio={audio} />
      </div>
    </div>
  );
};

const Author = ({ author }: Pick<Voice, "author">) => {
  return (
    <a
      className="hover:opacity-50 w-9 h-9 flex items-center justify-center select-none"
      href={`https://github.com/${author}`}
      target="_blank"
      title={`Author: ${author}`}
    >
      <img
        src={AuthorIcon.src}
        width={AuthorIcon.width}
        height={AuthorIcon.height}
        alt="author"
      />
    </a>
  );
};

const Heart = () => <>&#x2764;</>;

const SaveToFavorites = ({ download }: Pick<Voice, "download">) => {
  const [favorites, setFavorites] = useFavorites();
  const isFavorite = favorites.includes(download);
  return (
    <button
      className={`w-9 h-9 text-xl text-gray-900 select-none ${
        isFavorite ? "text-red-500 hover:text-red-900" : "hover:text-red-500"
      }`}
      onClick={() =>
        saveOrDeleteFromFavorites(favorites, isFavorite, download, setFavorites)
      }
      // Show text "favorite"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart />
    </button>
  );
};

const AudioAsComponent = ({ audio }: Pick<Voice, "audio">) => {
  return (
    <audio className="h-12 w-full" controls src={audio}>
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
};

const Download = ({ download }: Pick<Voice, "download">) => {
  return (
    <a
      className="hover:opacity-50 w-9 h-9 flex items-center justify-center select-none"
      href={download}
      title="Download .npz file"
    >
      <img
        src={DownloadIcon.src}
        width={DownloadIcon.width}
        height={DownloadIcon.height}
        alt="download"
      />
    </a>
  );
};

const genderToIcon = {
  male: ManIcon,
  female: WomanIcon,
  other: OtherIcon,
};

const pink = "-70deg";
const blue = "180deg";
const purple = "210deg";
const genderToHue = {
  male: blue,
  female: pink,
  other: purple,
};
const Gender = ({ gender }: Pick<Voice, "gender">) => {
  const iconData = genderToIcon[gender] || genderToIcon.other;
  const color = genderToHue[gender];
  const filter = `invert(1) brightness(0.5) sepia(1) hue-rotate(${color}) saturate(3)`;
  return (
    <button title={`Gender: ${gender}`}>
      <img
        style={{
          filter,
        }}
        src={iconData.src}
        width={iconData.width}
        height={iconData.height}
      />
    </button>
  );
};
