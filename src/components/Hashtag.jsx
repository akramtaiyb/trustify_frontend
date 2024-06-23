import { Badge } from "flowbite-react";
import React from "react";

export default function Hashtag({ className = "", tag }) {
  return (
    <Badge
      color="success"
      className={`text-md font-semibold inline ${className}`}
    >
      {tag}
    </Badge>
  );
}
