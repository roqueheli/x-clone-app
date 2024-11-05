import React from "react";

const Messages = ({ params }: { params: { id: string } }) => {
  return <div>Message: {params.id}</div>;
};

export default Messages;
