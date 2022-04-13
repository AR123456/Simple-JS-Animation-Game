import React from "react";
import { Alert } from "react-bootstrap";
// children is the text to shoe
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

// set a default for the variant
Message.default.Props = {
  variant: "info",
};

export default Message;
