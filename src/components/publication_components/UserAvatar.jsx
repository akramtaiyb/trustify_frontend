import React from "react";
import capitalizeFirstLetter from "../../../utils/utils";
import Datetime from "../../../utils/datetime";
import { Link } from "react-router-dom";
import { Avatar, Badge } from "flowbite-react";
import { AtSymbolIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

const UserAvatar = ({ user, created_at }) => (
  <div className="flex items-center justify-center gap-4">
    <div className="rounded-3xl w-10 h-10 bg-gray-500 text-white text-xl font-bold flex items-center justify-center">
      <Avatar
        className="text-lg font-bold"
        placeholderInitials={user.name.charAt(0)}
        rounded
        size="md"
      />
    </div>
    <div className="flex flex-col items-left justify-bottom leading-6">
      <div className="flex flex-row items-left font-semibold text-md">
        {user.name}
      </div>
      <div className="flex items-center justify-left gap-2 font-normal text-xs">
        <Badge icon={AtSymbolIcon} color="gray" className="py-[1px]">
          <Link
            to={`/profile/${user.username}`}
            className="font-normal text-x inline"
          >
            {user.username}
          </Link>
        </Badge>
        {user.is_expert ? (
          <Badge icon={CheckBadgeIcon} color="success" className="py-[1px]">
            Expert
          </Badge>
        ) : null}
        {capitalizeFirstLetter(Datetime(created_at))}
      </div>
    </div>
  </div>
);

export default UserAvatar;
