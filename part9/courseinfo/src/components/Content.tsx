import React from "react";

interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<{courseParts: ContentProps[]}> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(coursePart => 
        <p key={coursePart.name}>{coursePart.name} {coursePart.exerciseCount}</p>
      )}
    </div>
  )
};

export default Content;