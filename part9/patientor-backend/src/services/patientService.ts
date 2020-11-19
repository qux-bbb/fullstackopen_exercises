import { v4 as uuidv4 } from 'uuid';

import data from '../../data/patients.json';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const patientData: Patient [] = data.map(obj => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

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
  patientData.push(newPatientEntry);
  return newPatientEntry;
};


export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};