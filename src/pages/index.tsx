import { Inter } from "next/font/google";
import React from "react";

import { FavoritesProvider, Favorites } from "../components/FavoritesProvider";
import { CardBig } from "../components/CardBig";
import { Voice } from "../components/Voice";
import { getVoicesData } from "../data/getVoicesData";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ list_of_voices }: { list_of_voices: Voice[] }) {
  return (
    <FavoritesProvider>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-12 space-y-4 ${inter.className}`}
      >
        <div className="flex flex-col items-center justify-center w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            Voice Directory
          </h1>
          <p className="text-lg text-center text-gray-700">
            Voices for Bark TTS
          </p>
        </div>
        <Favorites list_of_voices={list_of_voices} />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {list_of_voices.map((voice) => (
            <CardBig key={voice.download} voice={voice} />
          ))}
        </div>
      </main>
    </FavoritesProvider>
  );
}

export const getStaticProps = async () => {
  const list_of_voices: Voice[] = getVoicesData();
  return {
    props: {
      list_of_voices: list_of_voices,
    },
  };
};
