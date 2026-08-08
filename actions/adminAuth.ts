"use server";

import { signOut } from "@/auth";

/** Clear the Auth.js session cookies. Caller should hard-navigate to login. */
export async function signOutAction() {
  await signOut({ redirect: false });
}
