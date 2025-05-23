import { db, auth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, password } = await req.json();

  const snapshot = await db
    .collection("admins")
    .where("userId", "==", userId)
    .where("password", "==", password)
    .get();

  if (snapshot.empty) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const userData = snapshot.docs[0].data();

  try {
    await auth.getUser(userId);
  } catch (error) {
    await auth.createUser({
      uid: userId,
    });
  }

  const customToken = await auth.createCustomToken(userId, {
    role: userData.role,
  });

  return NextResponse.json({ token: customToken });
}
