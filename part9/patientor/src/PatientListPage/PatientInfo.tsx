import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry, Patient } from "../types";
import { setDiagnosisList, updatePatient, useStateValue } from "../state";
import { EntryInfo } from "./EntryInfo";
import { AddHospitalEntryModal } from "../AddPatientModal";
import { HospitalEntryFormValues } from "../AddPatientModal/AddHospitalEntryForm";

const PatientInfo = () => {
  const [{patients, diagnoses}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
    console.log('submitNewHospitalEntry');
    try {
      await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      const { data: patientInfo } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );

      dispatch(updatePatient(patientInfo));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
        <AddHospitalEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewHospitalEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New HospitalEntry</Button>
      </div>
    );
  else
    return (
      <div>
        <h2>{patient.name} <Icon name={genderIcon} /></h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <AddHospitalEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewHospitalEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New HospitalEntry</Button>
      </div>
    );
};

export default PatientInfo;