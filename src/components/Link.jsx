import React from "react";

export default function Link({ className, href, text }) {
  return (
    <a
      className={
        "cursor-pointer underline font-medium hover:text-green-400" + className
      }
      href={href}
    >
      {text}
    </a>
  );
}
