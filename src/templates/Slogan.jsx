import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Slogan() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handleJoinClick = () => {
    if (isAuth) {
      navigate("/journal");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 my-[4%]">
      <div className="text-6xl font-bold w-[500px] text-center">
        Who knows?! Maybe we can live a day with{" "}
        <span className="text-red-600">zero fake news.</span>
      </div>
      <Button color="dark" size="xl" onClick={handleJoinClick}>
        Join the Battle Against Fake News!
      </Button>
      <img src="/src/assets/frontpage.svg" />
    </div>
  );
}
