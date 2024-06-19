import React, { useState, useEffect, useCallback } from "react";
import JournalHeader from "../templates/JournalHeader";
import Publication from "../components/Publication";
import axios from "../../api/axios";
import DialogCart from "../components/DialogCart";
import bedRock from "../assets/bedrock.png";
import LoaderSpinner from "../components/LoaderSpinner";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button, Tooltip } from "flowbite-react";

export default function Wall() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [newPosts, setNewPosts] = useState(false);

  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/publications?page=${page}`);
      setData((prevData) => [...prevData, ...res.data.data]);
      setHasMore(res.data.current_page < res.data.last_page);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    setLoading(false);
  };

  const checkForNewPosts = async () => {
    try {
      const res = await axios.get(`/api/publications?page=1`);
      const latestPostId = res.data.data[0]?.id;
      if (data.length > 0 && data[0].id < latestPostId) {
        setNewPosts(true);
      }
    } catch (error) {
      console.error("Error checking for new posts:", error.message);
    }
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  const handleRefresh = async () => {
    setPage(1);
    setData([]);
    await getData(1);
    setNewPosts(false);
  };

  const postPublication = async (newPublication) => {
    try {
      const res = await axios.post("/api/publications", newPublication, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData((prevData) => [res.data, ...prevData]);
    } catch (error) {
      console.error(
        "Error posting publication:",
        error.message,
        error.response.data.error
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    getData(page);
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkForNewPosts();
    }, 10000); // Check for new posts every 10 seconds

    return () => clearInterval(interval);
  }, [data]);

  const removePublication = (id) => {
    setData((prevData) =>
      prevData.filter((publication) => publication.id !== id)
    );
  };

  return (
    <div className="w-screen h-screen">
      <JournalHeader />
      <main className="h-full flex flex-col items-center gap-4 py-12 relative overflow-y-auto">
        <DialogCart postPublication={postPublication} />
        {data.map((publication, key) => (
          <Publication
            key={key}
            publication={publication}
            onRemove={removePublication}
          />
        ))}
        {loading && <LoaderSpinner className="w-10" />}
        {!hasMore && (
          <div className="font-semibold flex flex-col items-center justify-center gap-6 py-6">
            <img
              className="w-28"
              src={bedRock}
              alt="No more publications to load."
            />
            <div className="w-96 text-center">
              You can take some rest, you've already reached our bedrock.
            </div>
          </div>
        )}
      </main>
      {
        // refreshing btn
        newPosts && (
          <Tooltip content="New publications available!" style="light">
            <Button
              className="fixed right-12 bottom-12"
              size="sm"
              color="failure"
              onClick={handleRefresh}
              pill
            >
              <ArrowPathIcon className="w-5 px-0 py-[6px]" />
            </Button>
          </Tooltip>
        )
      }
    </div>
  );
}
