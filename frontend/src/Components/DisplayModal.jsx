import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import "../Components/css/DisplayModal.css";

function DisplayModal({ props }) {
  const [reveal, setReveal] = useState(false);
  const {
    _id,
    firstName,
    lastName,
    availability,
    discipline,
    tagline,
    imagePath,
  } = props;

  const handleClose = () => setReveal(false);
  const handleShow = () => setReveal(true);

  return (
    <div className="modal-display">
      <Button
        variant="primary"
        onClick={handleShow}
        className="modal-btn-toggle"
        data-testid="display-button"
      >
        View Profile
      </Button>

      <Modal show={reveal} onHide={handleClose} centered contentClassName="display-modal-content">
        <div className="modal-scroller">
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="card-name">
                {firstName} {lastName}
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-image-wrapper">
              <img
                src={imagePath}
                alt=""
                className="card-img-top modal-image"
              />
            </div>
            <h3 className="card-discipline">{discipline}</h3>
            <p className="card-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
              temporibus eius vitae quae unde animi? Dolores voluptate, dolor,
              dolorum possimus deserunt expedita quisquam vitae earum quia,
              ipsum repellat cumque. Perspiciatis ea id consequatur quod atque
              porro quaerat sapiente nisi molestias, itaque sed minus rem,
              tenetur doloribus modi expedita nesciunt voluptatibus.
            </p>
            <h5 className="card-tagline">
              <em>{tagline}</em>
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="card-btn-register"
              style={{ visibility: "hidden" }}
            >
              Register interest
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              className="card-btn-close"
              data-testid="close-button"
            >
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default DisplayModal;
