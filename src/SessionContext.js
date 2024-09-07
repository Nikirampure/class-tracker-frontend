"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { GrYoga } from "react-icons/gr";
import { CgGym } from "react-icons/cg";
import { GiMusicSpell, GiCook } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { CgCode } from "react-icons/cg";
import { toast } from "react-toastify";

export const SessionContext = createContext();

const iconMapping = {
  "<GrYoga />": <GrYoga />,
  "<CgGym />": <CgGym />,
  "<GiMusicSpell />": <GiMusicSpell />,
  "<GiCook />": <GiCook />,
  "<FaRunning />": <FaRunning />,
  "<CgCode />": <CgCode />,
};

const parseIcon = (iconString) => {
  return iconMapping[iconString] || null;
};

export const SessionProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bookingDate: new Date(),
  });

  const fetchBookings = async () => {
    try {
      const userId = Cookies.get("user_id");
      if (!userId) {
        console.error("No user ID found in cookies");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/user_bookings/${userId}`
      );
      const data = await response.json();
      setBookings(data.user_bookings || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (classId) => {
    try {
      const userId = Cookies.get("user_id");
      if (!userId) {
        console.error("No user ID found in cookies");
        return;
      }

      const response = await fetch("http://localhost:8000/cancel_booking/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_id: classId,
          user_id: userId,
        }),
      });

      if (response.ok) {
        setBookings((prevBookings) => {
          const updatedBookings = prevBookings.filter(
            (booking) => booking.class_id !== classId
          );
          return updatedBookings;
        });
       toast.info("Booking cancelled successfully");
        await fetchClasses();
        await fetchClasses();
      } else {
        console.error("Failed to cancel booking:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8000/class_list");
      const data = await response.json();
      console.log(data);
      setClasses(
        data.classes.map((cls) => ({
          ...cls,
          icon: parseIcon(cls.icon),
          waitlist: cls.waitlist || 0,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (!Cookies.get("user_id")) {
      Cookies.set("user_id", `user${Math.floor(Math.random() * 1000)}`, {
        expires: 7,
      });
    }
  }, []);

  const handleBooking = (activity) => {
    setSelectedClass(activity);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      bookingDate: date,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedClass) {
      const user_id = Cookies.get("user_id");
      const bookingData = {
        class_id: selectedClass.class_id,
        class_name: selectedClass.class_name,
        user_name: formData.name,
        user_id: user_id,
        booking_date: formData.bookingDate.toISOString().split("T")[0],
      };

      try {
        const response = await fetch("http://localhost:8000/book_slot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
          throw new Error("Failed to book slot");
        }
        toast.success("Booking Successful")
        await fetchClasses();
        await fetchBookings();
        handleModalClose();
      } catch (error) {
        console.error("Booking failed:", error);
      }
    }
  };

  return (
    <SessionContext.Provider
      value={{
        bookings,
        handleCancelBooking,
        fetchBookings,
        classes,
        handleBooking,
        showModal,
        handleModalClose,
        handleFormSubmit,
        formData,
        handleFormChange,
        handleDateChange,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
