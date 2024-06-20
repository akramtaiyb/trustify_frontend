import React, { useState, useEffect, useRef } from "react";
import JournalHeader from "../templates/JournalHeader";
import Publication from "../components/Publication";
import axios from "../../api/axios";
import DialogCart from "../components/DialogCart";
import bedRock from "../assets/bedrock.png";
import LoaderSpinner from "../components/LoaderSpinner";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button, Tooltip } from "flowbite-react";
import { useAuth } from "../../context/AuthContext";
import LoadingPage from "../components/LoadingPage";

export default function Wall() {
  const { isLoading } = useAuth();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [newPosts, setNewPosts] = useState(false);

  const mainRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/publications?page=${page}`);
        const newData = res.data.data.filter(
          (newPublication) =>
            !data.some(
              (existingPublication) =>
                existingPublication.id === newPublication.id
            )
        );

        setData((prevData) => [...prevData, ...newData]);
        setHasMore(res.data.current_page < res.data.last_page);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
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

    const interval = setInterval(() => {
      checkForNewPosts();
    }, 10000); // Check for new posts every 10 seconds

    return () => clearInterval(interval);
  }, [data]);

  const handleRefresh = async () => {
    setPage(1);
    setData([]);
    setNewPosts(false);
  };

  const postPublication = async (newPublication) => {
    try {
      await axios.post("/api/publications", newPublication, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleRefresh();
    } catch (error) {
      console.error(
        "Error posting publication:",
        error.message,
        error.response?.data?.error
      );
    }
  };

  const removePublication = (id) => {
    setData((prevData) =>
      prevData.filter((publication) => publication.id !== id)
    );
  };

  useEffect(() => {
    const mainElement = mainRef.current ?? document.querySelector("main");
    console.log({ mainElement });

    const scrollHandler = () => {
      if (mainElement) {
        const { scrollTop, clientHeight, scrollHeight } = mainElement;

        if (
          scrollTop + clientHeight >= scrollHeight - 1 &&
          !loading &&
          hasMore
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    if (mainElement) {
      mainElement.addEventListener("scroll", scrollHandler);

      return () => {
        mainElement.removeEventListener("scroll", scrollHandler);
      };
    }
  }, [loading, hasMore]);

  useEffect(() => {
    setPageIsLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200">
      {isLoading && <LoadingPage />}
      <JournalHeader />
      <main
        ref={mainRef}
        className="wall flex-1 flex flex-col items-center gap-4 py-12 overflow-y-auto"
      >
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
      {newPosts && (
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
      )}
    </div>
  );
}
