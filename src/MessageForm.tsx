import React, { useState, useEffect } from "react";
import { sendSMS } from "./service";
import "./App.css";
import { TResponse } from "./models";
interface Props {
  handleResponseChange: (res: TResponse) => void;
}

const MessageForm: React.FC<Props> = ({ handleResponseChange }) => {
  const [formData, setFormData] = useState<{
    recipient: string;
    message: string;
  }>({
    recipient: "",
    message: "",
  });
  const [error, setError] = useState<string>();
  const sender = "61481074860";
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    const { message } = formData;
    if (message.length > 480) {
      setError("Max length 480 characters exceeded.");
    }
    return () => {
      setError("");
    };
  }, [formData]);
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { recipient, message } = formData;
    sendSMS(sender, recipient, message).then((response) => {
      const { recipient, message, sms_count } = response;
      handleResponseChange({ recipient, message, sms_count });
    });
  };
  return (
    <div className="MessageForm">
      <header>Send SMS</header>
      <form onSubmit={handleSubmit}>
        <label>
          Sender:
          <input type="text" name="sender" value={sender} readOnly />
        </label>
        <label htmlFor="recipient">
          Recipient:
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="message">
          Message:
          <input
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </label>
        {error && <div>{error}</div>}
        <button type="submit" disabled={!!error}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
