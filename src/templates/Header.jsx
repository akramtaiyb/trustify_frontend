import React, { useEffect } from "react";
import ApplicationLogo from "../components/ApplicationLogo";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingPage from "../components/LoadingPage";

export default function Header() {
  const navigate = useNavigate();
  const { isLoading, isAuth, user, logout } = useAuth();

  const handleSignInBtnClick = () => {
    navigate("/login");
  };

  const handleSignUpBtnClick = () => {
    navigate("/signup");
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="z-50 w-screen px-9 sticky bg-white top-0 flex items-center justify-between">
      <div className="w-[20%] text-sm text-center">Because Truth Matters.</div>
      <div className="flex-1 flex items-center justify-center">
        <ApplicationLogo className="w-32" />
      </div>
      <div className="w-[20%] flex items-center justify-center gap-4">
        {isAuth ? (
          <>
            <span>{user.name}</span>
            <Button size="sm" color="gray" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" color="gray" onClick={handleSignInBtnClick}>
              Login
            </Button>
            <Button size="sm" color="dark" onClick={handleSignUpBtnClick}>
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
