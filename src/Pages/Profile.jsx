import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JournalHeader from "../templates/JournalHeader";
import { Card } from "flowbite-react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { Datetime } from "../../utils/datetime";
import LoadingSpinner from "../components/LoaderSpinner";

export default function Profile() {
  const params = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = () => {
    if (params.username !== user.username) {
      try {
        setIsLoading(true);
        axios.get(`/api/profile/${params.username}`).then((res) => {
          setProfile(res.data);
          setIsLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      setProfile(user);
    }
  };

  useEffect(() => {
    fetchProfile();
    console.log(profile);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
      <JournalHeader />
      <div className="flex-1 w-[70%]">
        <Card className="py-4 flex flex-col items-center w-full">
          {isLoading ? (
            <LoadingSpinner className="w-[24px]" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="rounded-full w-20 h-20 bg-gray-500 text-white text-3xl font-bold flex items-center justify-center">
                {profile?.name.at(0)}
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-xl font-bold">{profile?.name}</div>
                <div>
                  Joined {profile ? Datetime(profile?.created_at) : null}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
