import { v4 as uuidv4 } from 'uuid';

import data from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, PublicPatient, Entry, NewEntry } from '../types';
import { toNewPatientEntry } from '../utils';

let patientData: Patient [] = data.map(obj => {
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

const addEntry = ( patientId: string, entry: NewEntry ): Entry | undefined => {
  const thePatient = patientData.find(patient => patient.id === patientId);
  if (!thePatient)
    return undefined;
  const newEntry = {
    id: uuidv4(),
    ...entry
  };
  thePatient.entries.push(newEntry);
  const updatedPatient = { ...thePatient, entries: thePatient.entries };

  patientData = patientData.map(patient => patient.id === patientId? updatedPatient: patient);
  return newEntry;
};


export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPublicPatient,
  getPatientInfo,
  addEntry,
};