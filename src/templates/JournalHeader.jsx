import React, { useEffect } from "react";
import { Avatar, Button } from "flowbite-react";
import MiniatureAppLogo from "../components/MiniatureAppLogo";
import { useAuth } from "../../context/AuthContext";
import LoadingPage from "../components/LoadingPage";

export default function JournalHeader() {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="z-10 w-screen px-9 sticky bg-white top-0 flex items-center justify-between border-b py-4">
      <MiniatureAppLogo />
      {/* <Avatar img="../assets/random_profile.png" /> */}
      {/* TEST AVATAR */}
      <div className="flex items-center justify-between gap-2">
        <div className="rounded-3xl w-10 h-10 bg-gray-500 text-white text-xl font-bold flex items-center justify-center">
          {user.name.at(0)}
        </div>
        <div className="font-bold text-lg">{user.name}</div>
      </div>
      {/* END TEST AVATAR */}
      {/* TEST BURGER */}
      <div className="rounded-3xl w-10 h-10 bg-black text-white text-xl font-bold flex items-center justify-center">
        <Button className="w-full rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
      {/* END TEST BURGER */}
    </div>
  );
}
