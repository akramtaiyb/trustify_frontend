// VoteButtons.jsx
import React from "react";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";

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
  classification,
  classificationScore,
}) => {
  const getColorClass = () => {
    if (classification === "real") {
      return "text-green-500";
    } else if (classification === "fake") {
      return "text-red-500";
    } else {
      return "text-gray-500";
    }
  };

  const getDegreeClass = () => {
    if (Math.abs(classificationScore) >= 600) {
      return "700";
    } else if (Math.abs(classificationScore) >= 200) {
      return "500";
    } else {
      return "200";
    }
  };

  const fireClassName = `w-5 ${getColorClass()} ${getDegreeClass()}`;
  const upvoteClassName = `w-5 cursor-pointer ${
    userHasUpvoted ? "text-green-500" : ""
  } hover:text-green-500 ease`;
  const downvoteClassName = `w-5 cursor-pointer ml-3 ${
    userHasDownvoted ? "text-red-500" : ""
  } hover:text-red-500 ease`;
  const commentClassName = `w-5 cursor-pointer ml-3 ${
    userHasCommented ? "text-blue-500" : ""
  } hover:text-blue-500 ease`;

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center justify-left gap-2 text-gray-900">
        <ArrowUpCircleIcon className={upvoteClassName} onClick={handleUpvote} />{" "}
        {upvotesCount}
        <ArrowDownCircleIcon
          className={downvoteClassName}
          onClick={handleDownvote}
        />{" "}
        {downvotesCount}
        <ChatBubbleLeftEllipsisIcon
          className={commentClassName}
          onClick={handleAddCommentButton}
        />{" "}
        {commentCount}
      </div>
      <Tooltip
        content={`Classified as ${classification}`}
        style="light"
        arrow={false}
      >
        <FireIcon className={fireClassName} />
      </Tooltip>
    </div>
  );
};

export default VoteButtons;
