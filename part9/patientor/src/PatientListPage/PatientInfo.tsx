import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { updatePatient, useStateValue } from "../state";

const EntryInfo: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.diagnosisCodes)
    return (
      <div>
        <p>{entry.description}</p>
        <ul>
          {entry.diagnosisCodes.map(diagnosisCode => 
            <li>{diagnosisCode}</li>
          )}
        </ul>
      </div>
    );
  else
    return (
      <div>
        <p>{entry.description}</p>
      </div>
    );
};

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
  let genderIcon: 'smile'|'male'|'female' = 'smile';
  switch (patient.gender) {
    case 'male':
      genderIcon = 'male';
      break;
    case 'female':
      genderIcon = 'female';
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
        {patient.entries.map(entry => <EntryInfo entry={entry} />)}
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