import React from "react";
import ApplicationLogo from "./ApplicationLogo";
import LoaderSpinner from "./LoaderSpinner";

export default function LoadingPage() {
  return (
    <div className="h-screen w-screen fixed top-0  flex flex-col items-center justify-center bg-[var(--beige)] z-50">
      <ApplicationLogo />
      <LoaderSpinner className="w-10" />
    </div>
  );
}
