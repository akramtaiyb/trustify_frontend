import React from "react";
import { Button, Dropdown } from "flowbite-react";
import MiniatureAppLogo from "../components/MiniatureAppLogo";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowRightStartOnRectangleIcon,
  AtSymbolIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function JournalHeader() {
  const { user } = useAuth();

  return (
    <div className="z-10 w-screen px-9 sticky bg-white top-0 flex items-center justify-between border-b py-4">
      <MiniatureAppLogo />
      {/* <Avatar img="../assets/random_profile.png" /> */}
      <div className="flex items-center justify-between gap-2">
        <div className="rounded-3xl w-10 h-10 bg-gray-500 text-white text-md font-bold flex items-center justify-center">
          {user.name.at(0)}
        </div>
        <div className="font-bold text-md">{user.name}</div>
      </div>
      <Dropdown
        label="Dropfown"
        renderTrigger={() => (
          <div className="w-10 h-10 text-white text-xl font-bold flex items-center justify-center">
            <Button
              color="gray"
              className="rounded-full w-full h-full text-black"
            >
              <Bars3Icon className="w-fit" />
            </Button>
          </div>
        )}
        inline
      >
        <Dropdown.Item>
          <AtSymbolIcon className="w-4 mr-2" />
          Profile
        </Dropdown.Item>
        <Dropdown.Item>
          <ArrowRightStartOnRectangleIcon className="w-4 mr-2" />
          Logout
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
