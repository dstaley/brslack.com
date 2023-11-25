"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function validCaptcha(
  response: string,
  remoteip: string
): Promise<boolean> {
  const form = new URLSearchParams({
    response,
    remoteip,
    sitekey: "84892392-d0ee-4289-b6a5-3432b51cb51f",
    secret: process.env.HCAPTCHA_SECRET!,
  });

  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });
  const captchaResponse = await res.json();
  const { success } = captchaResponse as { success: boolean };

  return success;
}

export async function submit(formData: FormData) {
  const requestHeaders = headers();
  const ipAddress = requestHeaders.get("x-forwarded-for");
  if (!ipAddress) {
    throw new Error("unable to determine IP address");
  }

  const body = formData;
  const hcaptcha = body.get("h-captcha-response");
  if (!hcaptcha) {
    throw new Error("missing h-captcha-response");
  }

  const valid = await validCaptcha(hcaptcha as string, ipAddress);
  if (valid) {
    const res = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
      body: JSON.stringify({
        channel: "admins",
        text: "Someone has requested an invite to the Baton Rouge Slack!",
        attachments: JSON.stringify([
          {
            fallback: "Plain text is not supported.",
            attachment_type: "default",
            fields: [
              {
                title: "Name",
                value: `${body.get("first_name")} ${body.get("last_name")}`,
                short: true,
              },
              {
                title: "Email",
                value: body.get("email"),
                short: true,
              },
              {
                title: "Twitter",
                value: body.get("twitter") ?? "Not provided",
                short: true,
              },
              {
                title: "GitHub",
                value: body.get("github") ?? "Not provided",
                short: true,
              },
              {
                title: "Bio",
                value: body.get("bio") ?? "Not provided",
              },
              {
                title: "Lives near Baton Rouge?",
                value:
                  body.get("lives_near_baton_rouge") === "on" ? "Yes" : "No",
              },
            ],
          },
          {
            fallback: "Plain text is not supported",
            callback_id: `invite-approval\\${body.get("email")}\\${body.get(
              "first_name"
            )}\\${body.get("last_name")}`,
            attachment_type: "default",
            actions: [
              {
                name: "approve",
                text: "Approve",
                type: "button",
                value: "approve",
                style: "primary",
              },
              {
                name: "reject",
                text: "Reject",
                type: "button",
                value: "reject",
                style: "danger",
              },
            ],
          },
        ]),
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      console.error(body);
      throw new Error("non-200 response from slack api");
    }
  }

  redirect("/invite-requested");
}
