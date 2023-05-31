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
      <dialog className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={() => {
          const dialog = document.querySelector("dialog");
          dialog?.close();
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* <!--
              Background overlay, show/hide based on modal state.

              Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          {/* <!--
              Modal panel, show/hide based on modal state.

              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            --> */}
          <div
            className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="document"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {/* <div
                  className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-500 sm:mx-0 sm:h-10 sm:w-10"
                  aria-hidden="true"
                >
                  <!-- Heroicon name: outline/exclamation -->
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      fill="currentColor"
                    ></circle>
                    <path

                      className="opacity-75"
                      fill="currentColor"
                      d="M12 8v4m0 4h.01m-6.938-1.712a9.003 9.003 0 1113.856 0m-13.856 0a9.003 9.003 0 0113.856 0m-13.856 0L9 15"
                    ></path>
                  </svg>
                </div> */}
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-white"
                    id="modal-title"
                  >
                    Bark Speaker Directory
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">
                      This is a directory of voices
                      for <a href="https://bark.crisp.ai/">Bark</a>, a privacy
                      focused smart home hub.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  const dialog = document.querySelector("dialog");
                  dialog?.close();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <button
        type="button"
        className="fixed bottom-0 right-0 m-4 p-4 bg-gray-800 rounded-full text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            const dialog = document.querySelector("dialog");
            dialog?.showModal();
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          ></path>
        </svg>
      </button>
      {/* simpler button */}
      {/* <button
        type="button"
        className="fixed bottom-0 right-0 m-4 p-4 bg-gray-800 rounded-full text-white"
        onClick={() => {
          const dialog = document.querySelector("dialog");
          dialog?.showModal();
        }}
      >
        Show dialog
      </button> */}
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
