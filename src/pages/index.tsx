import { Inter } from "next/font/google";
import React from "react";

import { Favorites } from "../components/FavoritesProvider";
import { CardBig, CardEmpty } from "../components/CardBig";
import { Voice } from "../types/Voice";
import { getVoicesData } from "../data/getVoicesData";
import { Template } from "../components/Template";

export const inter = Inter({ subsets: ["latin"] });

export default function Home({ voices }: { voices: Voice[] }) {
  return (
    <Template>
      <Favorites voices={voices} />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {voices.map((voice) => (
          <CardBig key={voice.download} voice={voice} />
        ))}
        <CardEmpty
          title="Add a new voice"
          link="https://github.com/rsxdalv/bark-speaker-directory/pull/2"
        />
      </div>
    </Template>
  );
}

export const getStaticProps = async () => {
  const voices: Voice[] = getVoicesData();
  return {
    props: {
      voices: voices,
    },
  };
};
