import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { updatePatient, useStateValue } from "../state";

const PatientInfo = () => {
  const [{patients}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientInfo } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(updatePatient(patientInfo));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch, id]);

  const patient: Patient|undefined = Object.values(patients).find(patient => patient.id === id);

  if (!patient)
    return null;
  if (patient.gender === 'male')
    return (
      <div>
        <h2>{patient.name} <Icon name='male' /></h2>
        <p>dateOfBirth: {patient.dateOfBirth}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    );
  else if (patient.gender === 'female')
    return (
      <div>
        <h2>{patient.name} <Icon name='female' /></h2>
        <p>dateOfBirth: {patient.dateOfBirth}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    );
  else
    return (
      <div>
        <h2>{patient.name} <Icon name='smile' /></h2>
        <p>dateOfBirth: {patient.dateOfBirth}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    );
};

export default PatientInfo;