import { Image, Modal } from 'react-bootstrap';

export const ImageModal = ({ showModal, closeModal, selectedImage }) => (
  <Modal show={showModal} onHide={closeModal} size="lg" centered>
    {selectedImage && (
      <>
        <Modal.Header closeButton>
          <Image
            src={selectedImage.userImageURL}
            roundedCircle
            width={35}
            height={35}
            className="me-2"
          />
          <Modal.Title>{selectedImage.user}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Image
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            fluid
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          {selectedImage.tags}
        </Modal.Footer>
      </>
    )}
  </Modal>
);
