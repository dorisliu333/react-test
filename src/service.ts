// there's a proxy config in package.json that specifies all unknown requests are proxied to the burstsms mtmo api
// this means instead of making a call to https://api.tp.mtmo.io/v1/sender you would call just /v1/sender

type SendSMSResponse = {
  created_at: string;
  id: string;
  is_gsm: boolean;
  message: string;
  message_ref: string;
  recipient: string;
  recipient_country: string;
  sender: string;
  sender_country: string;
  sms_count: string;
  status: string;
  updated_at: string;
};

export const sendSMS = async (
  sender: string,
  recipient: string,
  message: string
): Promise<SendSMSResponse> => {
  const response = await fetch("https://api.transmitmessage.com/v2/sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "25a7c0141a462adbe069519ef4c62baa",
    },
    body: JSON.stringify({
      recipient: recipient,
      message_ref: "message ref",
      message: message,
      sender: sender,
      track_links: false,
      is_sandbox: false,
    }),
  });
  const data: SendSMSResponse = await response.json();
  return data;
};
