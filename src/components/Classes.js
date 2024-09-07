import "../styles/Classes.css";
import React, { useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SessionContext } from "../SessionContext";

const Classes = () => {
  const {
    classes,
    handleBooking,
    showModal,
    handleModalClose,
    handleFormSubmit,
    formData,
    handleFormChange,
    handleDateChange,
  } = useContext(SessionContext);

  return (
    <>
      <div className="cards-section" id="classes">
        {classes.map((activity) => (
          <div
            key={activity.class_id}
            className="activity-card"
            style={{ background: activity.color }}
          >
            <div className="activity-icon">{activity.icon}</div>
            <h3 className="activity-title">{activity.class_name}</h3>
            <p className="activity-desc">{activity.class_description}</p>
            <p className="activity-info">
              {activity.bookings}/{activity.total_slots} booked
            </p>
            <button
              className="book-btn"
              onClick={() => handleBooking(activity)}
            >
              {activity.bookings < activity.total_slots
                ? "Book Now"
                : "Join Waitlist"}
            </button>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Your Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="formDate"
              style={{ marginTop: "30px", marginBottom: "30px" }}
            >
              <Form.Label>Booking Date</Form.Label>
              <div>
                <DatePicker
                  selected={formData.bookingDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="form-control date-picker"
                  required
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Confirm Booking
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Classes;
