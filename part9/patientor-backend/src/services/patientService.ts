import { v4 as uuidv4 } from 'uuid';

import data from '../../data/patients.json';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, PublicPatient } from '../types';
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
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPublicPatient = (id: string): PublicPatient | undefined => {
  const entry = patientData.find(p => p.id === id);
  if (entry) {
    const {ssn, ...rest} = entry;
    return rest;
  }
  return entry;
};

const getPatientInfo = (id: string): Patient | undefined => {
  const entry = patientData.find(p => p.id === id);
  return entry;
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
  getPublicPatient,
  getPatientInfo,
};