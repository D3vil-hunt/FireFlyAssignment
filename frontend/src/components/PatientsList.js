const PatientsList = (patients) => {
  return (
    <>
      <h2>Patients</h2>
      <p>{patients.length} patient(s)</p>
      <p>
        <ul>
          {patients.map((patient) => {
            return <li>{JSON.stringify(patient)}</li>;
          })}
        </ul>
      </p>
    </>
  );
};

export default PatientsList;
