import { useState } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";

const createBooking = async (appointmentId, patientId) => {
  try {
    const result = await axios.patch(API_BASE_URL + "/appointments/" +  appointmentId + "/book/", {
        "patient_pk": patientId
    });
    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const Book = ({ bookAppointment }) => {
  const [appointmentId, setAppointmentId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    setSubmitMessage("");
    const result = await createBooking(appointmentId, patientId);
    if (!result) {
      setSubmitMessage("Unable to create booking");
      return;
    }
    await bookAppointment();
    setSubmitMessage("Booking Created: " + JSON.stringify(result));
    setIsLoading(false);
  };

  return (
    <>
      <h2>Create a new Booking</h2>
      <form onSubmit={handleSubmit}>
        <label for="appointment-id">Appointment ID:</label>
        <br />
        <input type = 'text'
          id="appointment-id"
          onChange={e => setAppointmentId(e.target.value)}
          value={appointmentId}
        />
        <br />
        <label for="patient-id">Patient ID:</label>
        <br />
        <input type = 'text'
          id="patient-id"
          onChange={e => setPatientId(e.target.value)}
          value={patientId}
        />
        <br />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
      {submitMessage && (
        <p>
          <i>{submitMessage}</i>
        </p>
      )}
    </>
  );
};

export default Book;
