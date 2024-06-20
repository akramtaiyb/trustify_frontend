import React from "react";
import { Modal, Button } from "flowbite-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const DeletePublicationModal = ({ show, onClose, onDelete }) => {
  return (
    <Modal show={show} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <div className="text-xl font-bold my-6">Delete publication</div>
          <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this publication?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onDelete}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={onClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeletePublicationModal;
