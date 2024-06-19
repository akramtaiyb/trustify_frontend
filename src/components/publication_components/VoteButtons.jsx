// VoteButtons.jsx
import React from "react";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

const VoteButtons = ({
  handleUpvote,
  handleDownvote,
  userHasUpvoted,
  userHasDownvoted,
  upvotesCount,
  downvotesCount,
  commentCount,
  userHasCommented,
  handleAddCommentButton,
}) => (
  <div className="flex items-center justify-left gap-2 text-gray-900">
    <ArrowUpCircleIcon
      className={`w-5 cursor-pointer ${
        userHasUpvoted ? "text-green-500" : ""
      } hover:text-green-500 ease`}
      onClick={handleUpvote}
    />{" "}
    {upvotesCount}
    <ArrowDownCircleIcon
      className={`w-5 cursor-pointer ml-3 ${
        userHasDownvoted ? "text-red-500" : ""
      } hover:text-red-500 ease`}
      onClick={handleDownvote}
    />{" "}
    {downvotesCount}
    <ChatBubbleLeftEllipsisIcon
      className={`w-5 cursor-pointer ml-3 ${
        userHasCommented ? "text-blue-500" : ""
      } hover:text-blue-500 ease`}
      onClick={handleAddCommentButton}
    />{" "}
    {commentCount}
  </div>
);

export default VoteButtons;
