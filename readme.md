## BurstSMS React Test

- **MessageForm.tsx** contains a form with 3 inputs: Sender, Recipient, Message.
- The form can validate that the message length is a maximum of 3 SMS worth of text.
- The Sender on the form is read-only field with the value of `61481074860`
- **service.ts** implement function sendSMS to fetch SMS api call

- **MessageDisplay.tsx** will display a list of messages that have been sent with the following data: Recipient, Message, Number of Messages. These are returned by the BurstSMS API.

- **setupTests.test.tsx** two unit test to ensure the function is working
