/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, Entry, NewEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any) : gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isHealthCheckRating = (healthCheckRating: any) : healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};


const isEntries = (entries: any): entries is Entry[] => {
  const allEntryType = ['Hospital', 'OccupationalHealthcare', 'HealthCheck'];
  for (let index = 0; index < entries.length; index++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const entry = entries[index];
    if (!allEntryType.includes(entry.type))
      return false;
  }
  return true; 
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !isEntries(entries)) {
    throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries;
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newPatientEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };
  
  return newPatientEntry;
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  if (!entry.discharge || !entry.discharge.date || !entry.discharge.criteria)
    return false;
  if (!isDate(entry.discharge.date) || !isString(entry.discharge.criteria))
    return false;
  return true;
};

const isOccupationalHealthcareEntry = (entry: any): entry is OccupationalHealthcareEntry => {
  if(!entry.employerName || !isString(entry.employerName))
    return false;
  return true;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  if (!entry.healthCheckRating || !isHealthCheckRating(entry.healthCheckRating))
    return false;
  return true;
};

const parseEntry = (entry: any): NewEntry => {
  if (!entry.type || !isString(entry.description))
    throw new Error('Incorrect or missing entry.type: ' + entry);
  if (!entry.description || !isString(entry.description))
    throw new Error('Incorrect or missing entry.description: ' + entry);
  if (!entry.date || !isDate(entry.date))
    throw new Error('Incorrect or missing entry.date: ' + entry);
  if (!entry.specialist || !isString(entry.specialist))
    throw new Error('Incorrect or missing entry.specialist: ' + entry);
  switch (entry.type) {
    case 'Hospital':
      if (!isHospitalEntry(entry))
        throw new Error('Incorrect HospitalEntry: ' + entry);
      break;
    case 'OccupationalHealthcare':
      if (!isOccupationalHealthcareEntry(entry))
        throw new Error('Incorrect OccupationalHealthcareEntry: ' + entry);
      break;
    case 'HealthCheck':
      if (!isHealthCheckEntry(entry))
        throw new Error('Incorrect HealthCheckEntry: ' + entry);
      break;
    default:
      throw new Error('Incorrect entry.type: ' + entry);
  }
  return entry;
};

export const toNewEntry = (object: any): NewEntry => {
  const newEntry: NewEntry = parseEntry(object);
  return newEntry;
};