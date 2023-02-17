import React, { useState } from "react";

import MessageDisplay from "./MessageDisplay";
import MessageForm from "./MessageForm";
import { TResponse } from "./models";

const MessagePage = () => {
  const [responseValue, setResponseValue] = useState<TResponse>();
  const handleResponseChange = (res: TResponse) => {
    setResponseValue(res);
  };
  return (
    <div className="MessagePage">
      <MessageForm handleResponseChange={handleResponseChange} />
      <MessageDisplay responseValue={responseValue} />
    </div>
  );
};

export default MessagePage;
