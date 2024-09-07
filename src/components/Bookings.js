import "../styles/Bookings.css";
import React, { useState, useContext } from "react";
import { MdCancelPresentation } from "react-icons/md";
import { SessionContext } from "../SessionContext";

const Bookings = () => {
  const { bookings, handleCancelBooking } = useContext(SessionContext);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredBookings = Array.isArray(bookings)
    ? bookings.filter((booking) =>
        filter
          ? booking.class_name.toLowerCase() === filter.toLowerCase()
          : true
      )
    : [];

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="booked-classes-container">
      <div className="filters">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Classes</option>
          {[
            ...new Set(filteredBookings.map((booking) => booking.class_name)),
          ].map((className, index) => (
            <option key={index} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      <div className="classes-list">
        {paginatedBookings.length ? (
          paginatedBookings.map((booking) => (
            <div key={booking.class_id} className="class-card">
              <div className="card-header">
                <MdCancelPresentation
                  className="cancel-icon"
                  onClick={() => handleCancelBooking(booking.class_id)}
                />
              </div>
              <div className="class-info">
                <h3 className="class-title">{booking.class_name}</h3>
                <p className="class-date-time">{booking.booking_date}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Bookings;
