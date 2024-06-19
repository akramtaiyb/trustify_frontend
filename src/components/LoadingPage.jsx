import React from "react";
import ApplicationLogo from "./ApplicationLogo";
import LoaderSpinner from "./LoaderSpinner";

export default function LoadingPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <ApplicationLogo />
      <LoaderSpinner className="w-10" />
    </div>
  );
}
