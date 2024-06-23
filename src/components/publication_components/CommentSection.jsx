import React from "react";
import { CheckBadgeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Avatar, Badge, Tooltip } from "flowbite-react";
import { Datetime } from "../../../utils/datetime";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CommentSection = ({
  currentComments,
  handleDeleteComment,
  auth,
  commentCount,
}) => {
  return (
    <>
      {commentCount !== 0 && (
        <div className="grid grid-flow-row auto-rows-max divide-y border rounded-lg">
          <div className="py-2 px-3 font-semibold text-sm">Comments</div>
          <div className="space-y-2 max-h-52 py-1 overflow-auto divide-y">
            {currentComments.map((comment, key) => (
              <div
                key={key}
                className="flex flex-row items-start justify-between gap-2 p-2"
              >
                <div className="flex items-start gap-4">
                  {/* <div className="rounded-3xl w-9 h-9 bg-gray-500 text-white text-sm font-bold flex items-center justify-center"> */}
                  <Avatar
                    placeholderInitials={comment.user.name.charAt(0)}
                    rounded
                  />
                  {/* </div> */}
                  <div className="flex flex-col items-left">
                    <div className="flex flex-row items-center font-semibold text-sm gap-1">
                      {comment.user.name}&nbsp;
                      <Badge
                        icon={AtSymbolIcon}
                        color="gray"
                        className="py-[1px] w-fit"
                      >
                        <Link
                          to={`/profile/${comment.user.username}`}
                          className="font-normal text-x inline"
                        >
                          {comment.user.username}
                        </Link>
                      </Badge>
                      {comment.user.is_expert ? (
                        <Badge
                          icon={CheckBadgeIcon}
                          color="success"
                          className="py-[1px]"
                        >
                          Expert
                        </Badge>
                      ) : null}
                    </div>
                    <div className="rounded-md py-2">{comment.content}</div>
                    <span className="font-regular text-xs text-gray-500">
                      {Datetime(comment.created_at)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-1 text-gray-600">
                  {comment.user.id === auth.user.id && (
                    <Tooltip className="text-xs" content="Delete comment?">
                      <TrashIcon
                        className="w-5 hover:text-red-500 transition ease-out cursor-pointer"
                        onClick={() => handleDeleteComment(comment.id)}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CommentSection;
