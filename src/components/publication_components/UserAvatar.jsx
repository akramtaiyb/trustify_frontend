import React from "react";
import capitalizeFirstLetter from "../../../utils/utils";
import Datetime from "../../../utils/datetime";

const UserAvatar = ({ user, created_at }) => (
  <div className="flex items-center gap-4">
    <div className="rounded-3xl w-10 h-10 bg-gray-500 text-white text-xl font-bold flex items-center justify-center">
      {user.name.charAt(0)}
    </div>
    <div className="flex flex-col items-left justify-center">
      <div className="font-semibold text-md">{user.name}</div>
      <div className="font-normal text-xs">
        {capitalizeFirstLetter(Datetime(created_at))}
      </div>
    </div>
  </div>
);

export default UserAvatar;
