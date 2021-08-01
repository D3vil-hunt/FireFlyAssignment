import logo from "./logo.svg";
import "./App.css";
import CreateAppointment from "./components/CreateAppointment";
import AppointmentsList from "./components/AppointmentsList";
import PatientsList from "./components/PatientsList";
import axios from "axios";
import { useEffect, useState } from "react";
import CreatePatient from "./components/CreatePatient";
import BookAppointment from "./components/BookAppointment";

export const API_BASE_URL = "http://localhost:8000";

const fetchAppointments = async () => {
  try {
    const result = await axios.get(API_BASE_URL + "/appointments/");
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const fetchPatients = async () => {
  try {
    const result = await axios.get(API_BASE_URL + "/patients/");
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const refetchAppointments = async () => {
    const appointments = await fetchAppointments();
    setAppointments(appointments);
  };

  const refetchPatients = async () => {
    const patients = await fetchPatients();
    setPatients(patients);
  };

  useEffect(() => {
    refetchAppointments();
  }, []);

  return (
    <div className="App">
      <div className="App-logo">
        <img src={logo} alt="logo" />
      </div>
      <CreateAppointment refetchAppointments={refetchAppointments} />
      <AppointmentsList appointments={appointments} />
      <CreatePatient refetchPatients={refetchPatients} />
      <PatientsList patients={patients}/>
      <BookAppointment bookAppointment={refetchAppointments} />
    </div>
  );
};

export default App;
