import type { NextRequest } from "next/server";

async function inviteUser(
  first_name: string,
  last_name: string,
  email: string
): Promise<void> {
  // This API request is to an undocumented legacy endpoint. It only accepts
  // form-encoded values, and needs a specific legacy token.
  const res = await fetch(
    "https://batonrouge.slack.com/api/users.admin.invite",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        first_name,
        last_name,
        email,
        resend: "true",
        token: process.env.SLACK_ADMIN_TOKEN!,
      }),
    }
  );

  const response = await res.json();
  if (!response.ok) {
    console.error(response);
  }
}

export default async function buttonHandler(req: NextRequest) {
  const body = await req.formData();
  const payload = body.get("payload");
  if (!payload) {
    console.error(body);
    return new Response(null, { status: 500 });
  }

  const parsedPayload = JSON.parse(payload as string);
  const { callback_id } = parsedPayload;
  if (!callback_id) {
    console.error({ parsedPayload });
    return new Response(null, { status: 500 });
  }
  console.log({ split: callback_id.split("\\") });
  const [, email, firstName, lastName] = callback_id.split("\\");
  const action =
    parsedPayload.actions[0].value === "approve" ? "approved" : "denied";
  const message = `${parsedPayload.user.name} ${action} the invite application from ${firstName} ${lastName}.`;

  const res = await fetch("https://slack.com/api/chat.update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
    },
    body: JSON.stringify({
      ts: parsedPayload["message_ts"],
      channel: parsedPayload["channel"]["id"],
      text: parsedPayload["original_message"]["text"],
      attachments: JSON.stringify([
        parsedPayload["original_message"]["attachments"][0],
        {
          text: message,
          color:
            parsedPayload["actions"][0]["value"] === "approve"
              ? "good"
              : "danger",
        },
      ]),
    }),
  });

  if (!res.ok) {
    const response = await res.json();
    console.error(response);
    return new Response(null, { status: 500 });
  }

  // If we're going to invite the user, return a streaming response so that we
  // get a status code back to Slack in under three seconds. This prevents the
  // "Oh no, something went wrong." message.
  if (parsedPayload["actions"][0]["value"] === "approve") {
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        await inviteUser(firstName, lastName, email);
        controller.enqueue(encoder.encode(""));
        controller.close();
      },
    });
    return new Response(readable, { status: 200 });
  }

  return new Response("", { status: 200 });
}

export const config = {
  runtime: "edge",
};
