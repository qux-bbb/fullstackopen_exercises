import { v4 as uuidv4 } from 'uuid';

import patientData from '../../data/patients.json'
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getEntries = (): Array<Patient> => {
  return patientData;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };
  patientData.concat(newPatientEntry);
  return newPatientEntry;
};


export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};