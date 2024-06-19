import { Button } from "flowbite-react";
import React from "react";

export default function Slogan() {
  return (
    <div className="flex flex-col items-center gap-12 my-[4%]">
      <div className="text-6xl font-bold w-[500px] text-center">
        Who knows?! Maybe we can live a day with{" "}
        <span className="text-red-600">zero fake news.</span>
      </div>
      <Button color="dark" size="xl">
        Join the Battle Against Fake News!
      </Button>
      <img src="/src/assets/frontpage.svg" />
    </div>
  );
}
