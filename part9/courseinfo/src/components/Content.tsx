import React from "react";
import Part, { CoursePart } from "./Part";

const Content: React.FC<{courseParts: CoursePart[]}> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(coursePart => 
        <Part part={coursePart} key={coursePart.name} />
      )}
    </div>
  )
};

export default Content;