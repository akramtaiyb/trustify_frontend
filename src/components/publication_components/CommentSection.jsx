import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";

const CommentSection = ({
  currentComments,
  handleDeleteComment,
  auth,
  commentCount,
}) => (
  <>
    {commentCount !== 0 && (
      <div className="rounded-xl mt-4 space-y-2 max-h-52 py-1 overflow-auto">
        {currentComments.map((comment, key) => (
          <div
            key={key}
            className="flex flex-col items-left justify-between gap-2 rounded-md border border-gray-300 p-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 ">
                <div className="rounded-3xl w-6 h-6 bg-gray-500 text-white text-sm font-bold flex items-center justify-center">
                  {comment.user.name.charAt(0)}
                </div>
                <div className="font-semibold text-sm">{comment.user.name}</div>
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
            <div className="rounded-md text-sm">{comment.content}</div>
          </div>
        ))}
      </div>
    )}
  </>
);

export default CommentSection;
