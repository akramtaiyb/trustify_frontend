import React from "react";

const Media = ({ file }) => {
  const fileType = file.type.split("/")[0];
  const fileUrl = `${import.meta.env.VITE_MEDIA_URL}/${file.path}`;

  switch (fileType) {
    case "image":
      return <img src={fileUrl} alt="Media File" className="rounded-lg mb-4" />;
    case "video":
      return (
        <video controls className="w-full h-auto rounded-lg mb-4">
          <source src={fileUrl} type={file.type} />
          Your browser does not support the video tag.
        </video>
      );
    case "application":
      return (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mb-4 block"
        >
          {file.path.split("/").pop()}
        </a>
      );
    case "gif":
      return (
        <img
          src={fileUrl}
          alt="Media File"
          className="w-full h-auto rounded-lg mb-4"
        />
      );
    default:
      return null;
  }
};

export default Media;
