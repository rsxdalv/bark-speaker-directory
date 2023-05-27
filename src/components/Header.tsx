import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = ({}) => {
  // get route from next.js router
  const router = useRouter();
  const route = router.pathname.replace("/", "");

  return (
    <div className="flex flex-col items-center justify-center w-full p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        Bark Speaker Directory
      </h1>
      <p className="text-lg text-center text-gray-700">
        <Link href="/" className={route === "" ? "font-bold" : ""}>
          Voices
        </Link>{" "}
        |{" "}
        <Link
          href="/generations"
          className={route === "generations" ? "font-bold" : ""}
        >
          Generations
        </Link>
      </p>
    </div>
  );
};
