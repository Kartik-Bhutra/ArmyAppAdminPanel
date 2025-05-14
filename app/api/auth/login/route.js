import { db, auth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId, password } = await request.json();

    const snapshot = await db
      .collection("users")
      .where("userId", "==", userId)
      .where("password", "==", password)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { message: "Invalid userId or password" },
        { status: 401 }
      );
    }

    const userData = snapshot.docs[0].data();
    const customToken = await auth.createCustomToken(userData.userId, {
      role: userData.role,
    });

    return NextResponse.json({ token: customToken, role: userData.role });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
