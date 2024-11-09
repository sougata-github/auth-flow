import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

//create session and store in HTTP-only cookie
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

//delete session for logging out
export async function deleteSession() {
  (await cookies()).delete("session");
}

//creating a JWT
export async function encrypt(payload: SessionPayload) {
  return (
    new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      //signs the token with encodeKey, which makes it secure
      .sign(encodeKey)
  );
}

//verifying wether a given token is valid.
export async function decrypt(session: string | undefined = "") {
  try {
    //verifies the token using the same secret key and algorithm.
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    throw error;
  }
}
