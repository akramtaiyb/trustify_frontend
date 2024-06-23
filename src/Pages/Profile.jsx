import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import JournalHeader from "../templates/JournalHeader";
import { Avatar, Badge, Card } from "flowbite-react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { Datetime } from "../../utils/datetime";
import LoadingSpinner from "../components/LoaderSpinner";
import unknown from "../assets/urban-line-man-in-suit-line.gif";
import {
  ArrowDownCircleIcon,
  ArrowTrendingUpIcon,
  ArrowUpCircleIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import Publication from "../components/Publication";

export default function Profile() {
  const params = useParams();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(`/api/profile/${params.username}`);
      setProfile(res.data);
      setPublications(res.data.publications.reverse());
    } catch (error) {
      setError(
        `Oops! We couldn't find a user with the following username ${params.username}.`
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [params.username]);

  const removePublication = useCallback((id) => {
    setPublications((prevPublications) =>
      prevPublications.filter((publication) => publication.id !== id)
    );
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="w-screen h-full flex flex-col items-center justify-center">
      <JournalHeader />
      <main
        // ref={mainRef}
        className="wall w-full flex-1 flex flex-col items-center gap-4 py-12 overflow-y-auto"
      >
        <Card className="rounded-3xl py-4 flex flex-col items-center min-w-[70%] w-fit">
          {isLoading ? (
            <LoadingSpinner className="w-[24px]" />
          ) : error ? (
            <div className="flex flex-col items-center justify-center font-bold text-xl text-gray-800 gap-4">
              <img className="h-36" src={unknown} alt="Unknown user" />
              {error}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6">
              <Avatar
                className="text-4xl font-bold"
                placeholderInitials={profile?.name.charAt(0)}
                rounded
                size="lg"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-xl font-bold">
                  {profile?.name}&nbsp;
                  <div className="w-full text-center text-sm font-semibold text-gray-600">
                    @{profile?.username}
                  </div>
                </div>
                {profile.is_expert ? (
                  <Badge
                    icon={CheckBadgeIcon}
                    color="success"
                    className="py-[1px]"
                  >
                    Expert
                  </Badge>
                ) : null}
                <div>
                  Joined {profile ? Datetime(profile?.created_at) : null}
                </div>
                <div className="flex items-center justify-center gap-6 mt-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-teal-500 font-bold">
                    <ArrowTrendingUpIcon className="w-5" />
                    {"Reputation :"}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {profile?.reputation}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-bold">
                    <DocumentDuplicateIcon className="w-5" />
                    {"Publications :"}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {profile?.publications.length}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-500 font-bold">
                    <ArrowUpCircleIcon className="w-5" />
                    {"Upvotes :"}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      profile?.votes.filter((vote) => vote.vote === "real")
                        .length
                    }
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-red-500 font-bold">
                    <ArrowDownCircleIcon className="w-5" />
                    {"Downvotes :"}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      profile?.votes.filter((vote) => vote.vote === "fake")
                        .length
                    }
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-blue-500 font-bold">
                    <ChatBubbleLeftRightIcon className="w-5" />
                    {"Comments :"}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {profile?.comments.length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
        <div className="min-w-[70%] text-center font-bold text-xl text-gray-400">
          Journal
        </div>
        {publications.map((publication, key) => (
          <>
            <Publication
              key={key}
              publication={publication}
              onRemove={removePublication}
            />
          </>
        ))}
      </main>
    </div>
  );
}
