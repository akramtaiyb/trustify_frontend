import React from "react";
import { Modal, Textarea, FileInput, Button, Label } from "flowbite-react";

const EditPublicationModal = ({
  openEditModal,
  setOpenEditModal,
  handleEditPublication,
  handleFileChange,
  newPublication,
  handleFormChange,
  errors,
  readyToPost,
}) => (
  <Modal
    show={openEditModal}
    size="2xl"
    popup
    onClose={() => setOpenEditModal(false)}
    dismissible={true}
  >
    <Modal.Header />
    <Modal.Body>
      <form className="space-y-6">
        <div className="text-xl font-bold">Edit publication</div>
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
        <div className="flex items-center justify-between">
          <FileInput multiple onChange={handleFileChange} />
          {errors.media_files && (
            <div className="text-red-500">{errors.media_files[0]}</div>
          )}
          <Button
            className="float-r-2"
            color="dark"
            onClick={handleEditPublication}
            disabled={readyToPost}
          >
            Edit
          </Button>
        </div>
      </form>
    </Modal.Body>
  </Modal>
);

export default EditPublicationModal;
