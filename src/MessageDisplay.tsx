import React from "react";
import { TResponse } from "./models";

interface Props {
  responseValue?: TResponse;
}

const MessageDisplay: React.FC<Props> = (props) => {
  const { responseValue } = props;

  return (
    <div className="MessageDisplay">
      <header>Sent SMS count: {responseValue?.sms_count}</header>
      <div>Recipient: {responseValue?.recipient}</div>
      <div>Message: {responseValue?.message}</div>
    </div>
  );
};

export default MessageDisplay;
