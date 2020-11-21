import React from "react";
import { Icon, Message } from "semantic-ui-react";
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalDetail: React.FC<{ entry: HospitalEntry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  if (!entry.diagnosisCodes)
    return (
      <Message>
        <Message.Content>
          <Message.Header>
            {entry.date} <Icon name='hospital' size='large' />
          </Message.Header>
          <div>{entry.description}</div>
        </Message.Content>
      </Message>
    );

  return (
    <Message>
      <Message.Content>
        <Message.Header>
          {entry.date} <Icon name='hospital' size='large' />
        </Message.Header>
        <div>{entry.description}</div>
        <ul>
          {entry.diagnosisCodes.map(diagnosisCode => 
            <li key={diagnosisCode}>{diagnosisCode} {diagnoses.find(diagnose => diagnose.code === diagnosisCode)?.name}</li>
          )}
        </ul>
      </Message.Content>
    </Message>
  );
};

const OccupationalHealthcareDetail: React.FC<{ entry: OccupationalHealthcareEntry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  if (!entry.diagnosisCodes)
    return (
      <Message>
        <Message.Content>
          <Message.Header>
            {entry.date} <Icon name='stethoscope' size='large' /> <b>{entry.employerName}</b>
          </Message.Header>
          <div>{entry.description}</div>
        </Message.Content>
      </Message>
    );

  return (
    <Message>
      <Message.Content>
        <Message.Header>
          {entry.date} <Icon name='stethoscope' size='large' /> <b>{entry.employerName}</b>
        </Message.Header>
        <div>{entry.description}</div>
        <ul>
          {entry.diagnosisCodes.map(diagnosisCode => 
            <li key={diagnosisCode}>{diagnosisCode} {diagnoses.find(diagnose => diagnose.code === diagnosisCode)?.name}</li>
          )}
        </ul>
      </Message.Content>
    </Message>
  );
};

const HealthCheckDetail: React.FC<{ entry: HealthCheckEntry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  let iconColors: 'green'|'yellow'|'orange'|'red' = 'green';
  switch (entry.healthCheckRating) {
    case 0:
      iconColors = 'green';
      break;
    case 1:
      iconColors = 'yellow';
      break;
    case 2:
      iconColors = 'orange';
      break;
    case 3:
      iconColors = 'red';
      break;
    default:
      break;
  }

  if (!entry.diagnosisCodes)
    return (
      <Message>
        <Message.Content>
          <Message.Header>
            {entry.date} <Icon name='doctor' size='large' />
          </Message.Header>
          <div>{entry.description}</div>
          <div><Icon name='heart' color={iconColors} /></div>
        </Message.Content>
      </Message>
    );
  
  return (
    <Message>
      <Message.Content>
        <Message.Header>
          {entry.date} <Icon name='doctor' size='large' />
        </Message.Header>
        <div>{entry.description}</div>
        <ul>
          {entry.diagnosisCodes.map(diagnosisCode => 
            <li key={diagnosisCode}>{diagnosisCode} {diagnoses.find(diagnose => diagnose.code === diagnosisCode)?.name}</li>
          )}
        </ul>
        <div><Icon name='heart' color={iconColors} /></div>
      </Message.Content>
    </Message>
  );
};

export const EntryInfo: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalDetail entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetail entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckDetail entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};