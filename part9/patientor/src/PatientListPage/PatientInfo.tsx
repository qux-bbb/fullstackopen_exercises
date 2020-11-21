import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Patient } from "../types";
import { setDiagnosisList, updatePatient, useStateValue } from "../state";
import { EntryInfo } from "./EntryInfo";

const PatientInfo = () => {
  const [{patients, diagnoses}, dispatch] = useStateValue();
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

  React.useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );

        dispatch(setDiagnosisList(diagnoses));

      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosis();
  }, [dispatch, id]);

  const patient: Patient|undefined = Object.values(patients).find(patient => patient.id === id);

  if (!patient)
    return null;
  let genderIcon: 'smile'|'man'|'woman' = 'smile';
  switch (patient.gender) {
    case 'male':
      genderIcon = 'man';
      break;
    case 'female':
      genderIcon = 'woman';
      break;
    default:
      break;
  }

  if (patient.entries.length !== 0)
    return (
      <div>
        <h2>{patient.name} <Icon name={genderIcon} /></h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map(entry => <EntryInfo key={entry.id} entry={entry} diagnoses={diagnoses} />)}
      </div>
    );
  else
    return (
      <div>
        <h2>{patient.name} <Icon name={genderIcon} /></h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    );
};

export default PatientInfo;