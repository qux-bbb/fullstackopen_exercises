import patientData from '../../data/patients.json'
import { Patient, NonSensitivePatientEntry } from '../types';

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


export default {
  getEntries,
  getNonSensitiveEntries
};