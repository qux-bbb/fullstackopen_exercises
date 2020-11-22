import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry, Patient } from "../types";
import { setDiagnosisList, updatePatient, useStateValue } from "../state";
import { EntryInfo } from "./EntryInfo";
import { AddHospitalEntryModal, AddOccupationalHealthcareEntryModal } from "../AddPatientModal";
import { HospitalEntryFormValues } from "../AddPatientModal/AddHospitalEntryForm";
import { OccupationalHealthcareEntryFormValues } from "../AddPatientModal/AddOccupationalHealthcareEntryForm";

const PatientInfo = () => {
  const [{patients, diagnoses}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [hospitalEntryModalOpen, setHospitalEntryModalOpen] = React.useState<boolean>(false);
  const [occupationalHealthcareEntryModalOpen, setOccupationalHealthcareEntryModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openHospitalEntryModal = (): void => setHospitalEntryModalOpen(true);

  const closeHospitalEntryModal = (): void => {
    setHospitalEntryModalOpen(false);
    setError(undefined);
  };

  const openOccupationalHealthcareEntryModal = (): void => setOccupationalHealthcareEntryModalOpen(true);

  const closeOccupationalHealthcareEntryModal = (): void => {
    setOccupationalHealthcareEntryModalOpen(false);
    setError(undefined);
  };

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

  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
    try {
      await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      const { data: patientInfo } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );

      dispatch(updatePatient(patientInfo));
      closeHospitalEntryModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const submitOccupationalHealthcareEntry = async (values: OccupationalHealthcareEntryFormValues) => {
    try {
      await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      const { data: patientInfo } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );

      dispatch(updatePatient(patientInfo));
      closeOccupationalHealthcareEntryModal();
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
          modalOpen={hospitalEntryModalOpen}
          onSubmit={submitNewHospitalEntry}
          error={error}
          onClose={closeHospitalEntryModal}
        />
        <AddOccupationalHealthcareEntryModal
          modalOpen={occupationalHealthcareEntryModalOpen}
          onSubmit={submitOccupationalHealthcareEntry}
          error={error}
          onClose={closeOccupationalHealthcareEntryModal}
        />
        <Button onClick={() => openHospitalEntryModal()}>Add New HospitalEntry</Button>
        <Button onClick={() => openOccupationalHealthcareEntryModal()}>Add New OccupationalHealthcareEntry</Button>
      </div>
    );
  else
    return (
      <div>
        <h2>{patient.name} <Icon name={genderIcon} /></h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <AddHospitalEntryModal
          modalOpen={hospitalEntryModalOpen}
          onSubmit={submitNewHospitalEntry}
          error={error}
          onClose={closeHospitalEntryModal}
        />
        <AddOccupationalHealthcareEntryModal
          modalOpen={occupationalHealthcareEntryModalOpen}
          onSubmit={submitOccupationalHealthcareEntry}
          error={error}
          onClose={closeOccupationalHealthcareEntryModal}
        />
        <Button onClick={() => openHospitalEntryModal()}>Add New HospitalEntry</Button>
        <Button onClick={() => openOccupationalHealthcareEntryModal()}>Add New OccupationalHealthcareEntry</Button>
      </div>
    );
};

export default PatientInfo;