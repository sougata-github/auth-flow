/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const testUser = {
  id: "1",
  email: "contact@sougata.io",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  //typically fetch the user from database and then compare hashed password.

  //if user doesn't exist then throw error.

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        password: ["Invalid email or password"],
      },
    };
  }

  //create session
  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
