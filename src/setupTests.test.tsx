// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MessagePage from "./MessagePage";
import { sendSMS } from "./service";
import MessageDisplay from "./MessageDisplay";

jest.mock("./service", () => ({
  sendSMS: jest.fn(),
}));
describe("Message Page", () => {
  it("should change value according user input", () => {
    render(<MessagePage />);
    const recipientInput = screen.getByLabelText(/recipient/i);
    const messageInput = screen.getByLabelText(/message/i);
    expect(screen.getByLabelText(/message/i));
    fireEvent.change(recipientInput, {
      target: { value: "614004402030" },
    });
    fireEvent.change(messageInput, {
      target: { value: "This is a test message" },
    });
    expect(recipientInput).toHaveValue("614004402030");
    expect(messageInput).toHaveValue("This is a test message");
  });
  it("should get response", async () => {
    const messageResponse = {
      created_at: "2023-02-17T09:28:16.881810776Z",
      id: "a1f4f19b-4b88-45b3-a6fa-6cc96fd3ca37",
      is_gsm: true,
      message: "test message",
      message_ref: "message ref",
      recipient: "61404234023",
      recipient_country: "AU",
      sender: "6140234232",
      sender_country: "AU",
      sms_count: "1",
      status: "pending",
      updated_at: "2023-02-17T09:28:16.881810776Z",
    };
    //@ts-ignore
    sendSMS.mockResolvedValueOnce(messageResponse);
    const { message, sms_count, recipient } = await sendSMS(
      messageResponse.sender,
      messageResponse.recipient,
      messageResponse.message
    );
    render(
      <MessageDisplay
        responseValue={{
          message: message,
          sms_count: sms_count,
          recipient: recipient,
        }}
      />
    );
    const dataElement = await screen.findByText("Message: test message");
    expect(dataElement).toBeInTheDocument();
  });
});
