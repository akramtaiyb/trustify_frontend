import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function ({ children }) {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center my-12 mx-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
