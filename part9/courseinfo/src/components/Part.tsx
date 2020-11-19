import React from "react";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface unionCoursePart extends CoursePartWithDesc {
  name: "With like";
  likes: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | unionCoursePart;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{part: CoursePart}> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div key={part.name}>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <br/>
        </div>
      )
    case 'Using props to pass data':
      return (
        <div key={part.name}>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>groupProjectCount: {part.groupProjectCount}</p>
          <br/>
        </div>
      )
    case 'Deeper type usage':
      return (
        <div key={part.name}>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>exerciseSubmissionLink: {part.exerciseSubmissionLink}</p>
          <br/>
        </div>
      )
    case 'With like':
      return (
        <div key={part.name}>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>likes: {part.likes}</p>
          <br/>
        </div>
      )
    default:
      return assertNever(part);
  }
};

export default Part;