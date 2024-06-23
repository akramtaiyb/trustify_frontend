import React from "react";
import { useNavigate } from "react-router-dom";

export default function MiniatureAppLogo() {
  const navigate = useNavigate();
  return (
    <svg
      width="103"
      height="103"
      viewBox="0 0 103 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-fit cursor-pointer"
      onClick={() => navigate("/journal")}
    >
      <circle cx="51.5" cy="51.5" r="51.5" fill="#72B01D" />
      <path
        d="M14.9736 51.082L24.177 60.2854L40.8858 43.5767"
        stroke="white"
        strokeWidth="8"
      />
      <path
        d="M60.1699 44.83H55.9955V63.7057H48.2364V44.83H45.4232V38.3868H48.2364V37.6608C48.2364 34.5451 49.1288 32.1856 50.9135 30.5824C52.6983 28.9489 55.3149 28.1322 58.7633 28.1322C59.3381 28.1322 59.7616 28.1473 60.0338 28.1775V34.7568C58.5516 34.6661 57.508 34.8778 56.903 35.3921C56.298 35.9063 55.9955 36.8289 55.9955 38.1599V38.3868H60.1699V44.83Z"
        fill="white"
      />
      <path
        d="M88.7718 38.3868L72.8907 75.73H64.5418L70.3498 62.8436L60.0498 38.3868H68.7163L74.5696 54.2225L80.3775 38.3868H88.7718Z"
        fill="white"
      />
    </svg>
  );
}
