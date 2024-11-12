import React from "react";

type RepliesCounterProps = {
  count: number;
  onClick?: () => void;
};

const RepliesCounter = ({ count, onClick }: RepliesCounterProps) => {
  const label = count > 1 ? "respuestas" : "respuesta";

  return (
    <div className="link-primary text-sm" onClick={onClick}>
      {(!count || count === 0)  ? <>Sé el primero en responder</> : <>{count} {label}</>} 
    </div>
  );
};

export default RepliesCounter;
