import { Button, Card, FileInput, Label, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function DialogCart({ postPublication }) {
  const { user } = useAuth();

  const [newPublication, setNewPublication] = useState({
    user_id: user.id,
    title: "",
    content: "",
    type: "",
    created_at: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [readyToPost, setReadyToPost] = useState(false);
  const [postStatus, setPostStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleOnSubmitBtn = async () => {
    setReadyToPost(true);
    const formData = new FormData();
    formData.append("user_id", newPublication.user_id);
    formData.append("title", newPublication.title);
    formData.append("content", newPublication.content);
    formData.append("type", newPublication.type);
    formData.append("created_at", new Date().toISOString());

    for (let file of selectedFiles) {
      formData.append("media_files[]", file);
    }

    try {
      await postPublication(formData);
      setReadyToPost(false);
      setErrors({});
      setNewPublication({
        user_id: user.id,
        title: "",
        content: "",
        type: "",
        created_at: "",
      });
      setSelectedFiles([]);
    } catch (error) {
      setPostStatus(null);
      setReadyToPost(false);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const handleFormChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setNewPublication((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <Card className="w-[40%] rounded-3xl">
      <div className="space-y-4">
        <div className="text-2xl font-bold">Let's op-ed!</div>
        <div className="font-regular text-sm">
          Share your stories with confidence! Our global network of experts and
          journalists will verify the truth. If false, we ensure transparency by
          informing everyone about the misinformation.
        </div>
        <div>
          <Label>Title</Label>
          <Textarea
            name="title"
            onChange={handleFormChange}
            value={newPublication.title}
          />
          {errors.title && (
            <div className="text-red-500">{errors.title[0]}</div>
          )}
        </div>
        <div>
          <Label>What's up</Label>
          <Textarea
            name="content"
            placeholder="What's up for today? Just share it and Trustifiers will investigate..."
            onChange={handleFormChange}
            value={newPublication.content}
          />
          {errors.content && (
            <div className="text-red-500">{errors.content[0]}</div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <FileInput multiple onChange={handleFileChange} />
        {errors.media_files && (
          <div className="text-red-500">{errors.media_files[0]}</div>
        )}
        <Button
          className="float-r-2"
          color="dark"
          onClick={handleOnSubmitBtn}
          disabled={readyToPost}
        >
          Publish
        </Button>
      </div>
      {postStatus && (
        <div className="text-green-500">Post created successfully!</div>
      )}
      {errors.general && (
        <div className="text-red-500">{errors.general[0]}</div>
      )}
    </Card>
  );
}
