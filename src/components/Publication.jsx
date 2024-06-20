import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Card, Button, Dropdown, Label, TextInput } from "flowbite-react";
import {
  CommentSection,
  EditPublicationModal,
  UserAvatar,
  VoteButtons,
  Media,
  DeleteModal,
} from "./publication_components";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import axios from "../../api/axios";

const Publication = ({ publication, onRemove }) => {
  const auth = useAuth();

  const {
    id,
    title,
    content,
    user,
    comments,
    votes,
    has_upvoted,
    has_downvoted,
    has_commented,
    user_vote,
    created_at,
    media_files,
  } = publication;

  const [readyToComment, setReadyToComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [currentComments, setCurrentComments] = useState(null);
  const [upvotesCount, setUpvotesCount] = useState(0);
  const [downvotesCount, setDownvotesCount] = useState(0);
  const [userHasUpvoted, setUserHasUpvoted] = useState(false);
  const [userHasDownvoted, setUserHasDownvoted] = useState(false);
  const [currentVoteId, setCurrentVoteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [userHasCommented, setUserHasCommented] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newPublication, setNewPublication] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({});
  const [readyToPost, setReadyToPost] = useState(false);
  const [openDeletePubModal, setOpenDeletePubModal] = useState(false);

  useEffect(() => {
    setUpvotesCount(votes.filter((v) => v.vote === "real").length);
    setDownvotesCount(votes.filter((v) => v.vote === "fake").length);
    setCommentCount(comments.length);
    setCurrentComments(comments);
    setUserHasUpvoted(
      votes.some((v) => v.user_id === user.id && v.vote === "real")
    );
    setUserHasDownvoted(
      votes.some((v) => v.user_id === user.id && v.vote === "fake")
    );
    setCurrentVoteId(user_vote);
    setUserHasCommented(comments.some((c) => c.user_id === user.id));
    setNewPublication({
      title: title,
      content: content,
    });
  }, [publication]);

  const handleVote = async (voteType) => {
    if (voteType === "upvote" && userHasDownvoted) {
      setUserHasUpvoted(true);
      setUpvotesCount((prevCount) => prevCount + 1);
      setUserHasDownvoted(false);
      setDownvotesCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));

      try {
        await axios.put(`/api/votes/${currentVoteId}`, { vote: "real" });
      } catch (error) {
        console.error(error.message);
      }
    } else if (voteType === "downvote" && userHasUpvoted) {
      setUserHasDownvoted(true);
      setDownvotesCount((prevCount) => prevCount + 1);
      setUserHasUpvoted(false);
      setUpvotesCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));

      try {
        await axios.put(`/api/votes/${currentVoteId}`, { vote: "fake" });
      } catch (error) {
        console.error(error.message);
      }
    } else if (user_vote === null && !userHasDownvoted && !userHasUpvoted) {
      try {
        const response = await axios.post(`/api/votes`, {
          user_id: auth.user.id,
          publication_id: id,
          vote: voteType === "upvote" ? "real" : "fake",
        });

        if (voteType === "upvote") {
          setUserHasUpvoted(true);
          setUpvotesCount((prevCount) => prevCount + 1);
        } else {
          setUserHasDownvoted(true);
          setDownvotesCount((prevCount) => prevCount + 1);
        }

        setCurrentVoteId(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleUpvote = () => handleVote("upvote");
  const handleDownvote = () => handleVote("downvote");

  const handleAddCommentButton = () => {
    setReadyToComment((prev) => !prev);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("publication_id", id);
    formData.append("user_id", auth.user.id);
    formData.append("content", newComment);

    try {
      const response = await axios.post("/api/comments", formData);
      const newCommentData = response.data;
      newCommentData.user = { ...user };

      setCurrentComments((prevComments) => [newCommentData, ...prevComments]);
      setNewComment("");
      setSelectedFiles([]);
      setReadyToComment(false);
      setCommentCount((prevCount) => prevCount + 1);
      setUserHasCommented(true);
    } catch (error) {
      console.error("Error adding comment:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setCurrentComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      setCommentCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      if (commentCount - 1 === 0) {
        setUserHasCommented(false);
      }
    } catch (error) {
      console.error(error.response?.message || error.message);
    }
  };

  const handleEditPublication = async () => {
    const formData = new FormData();
    formData.append("title", newPublication.title);
    formData.append("content", newPublication.content);

    try {
      await axios.put(`/api/publications/${id}`, { ...newPublication });
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error editing publication:", error.message);
    }
  };

  const handleDeletePublication = async () => {
    try {
      await axios.delete(`/api/publications/${id}`);
      onRemove(id);
      setOpenDeletePubModal(false);
    } catch (error) {
      console.error("Error deleting publication:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPublication((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card className="lg:min-w-[40%] max-w-[60%] lg:max-w-[40%] rounded-3xl">
      <div className="flex flex-row items-center justify-between">
        <UserAvatar user={user} created_at={created_at} />
        {user.id === auth.user.id && (
          <Dropdown
            label=""
            renderTrigger={() => <EllipsisVerticalIcon className="w-5" />}
          >
            <Dropdown.Item onClick={() => setOpenEditModal(true)}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setOpenDeletePubModal(true)}>
              Delete
            </Dropdown.Item>
          </Dropdown>
        )}
      </div>
      <div className="w-full h-fit">
        <div className="font-semibold">{newPublication.title}</div>
        <div className="mt-1 mb-6 text">{newPublication.content}</div>
        {media_files.map((file, key) => (
          <Media key={key} file={file} />
        ))}
        <VoteButtons
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          userHasUpvoted={userHasUpvoted}
          userHasDownvoted={userHasDownvoted}
          upvotesCount={upvotesCount}
          downvotesCount={downvotesCount}
          commentCount={commentCount}
          userHasCommented={userHasCommented}
          handleAddCommentButton={handleAddCommentButton}
        />
      </div>
      {readyToComment && (
        <form onSubmit={handleCommentSubmit}>
          <Label>New comment:</Label>
          <div className="flex flex-row items-center justify-between gap-2">
            <TextInput
              className="w-full"
              name="comment"
              placeholder="Write your comment here.."
              value={newComment}
              onChange={handleCommentChange}
            />
            <Button className="text-white p-0" color="dark" type="submit" pill>
              Add
            </Button>
          </div>
        </form>
      )}
      <CommentSection
        currentComments={currentComments}
        handleDeleteComment={handleDeleteComment}
        auth={auth}
        commentCount={commentCount}
      />
      <EditPublicationModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        handleEditPublication={handleEditPublication}
        handleFileChange={handleFileChange}
        newPublication={newPublication}
        handleFormChange={handleFormChange}
        errors={errors}
        readyToPost={readyToPost}
      />
      <DeleteModal
        show={openDeletePubModal}
        onClose={() => setOpenDeletePubModal(false)}
        onDelete={handleDeletePublication}
      />
    </Card>
  );
};

export default Publication;
