"use server";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import connectDb from "./db";

export const loginGoogleAction = async () => {
  await connectDb();

  const response = await auth.api.signInSocial({
    body: {
      provider: "google",
    },
  });

  redirect(response.url!);
};
