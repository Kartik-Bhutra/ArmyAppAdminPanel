import { db, auth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import {useHash, verifyHash} from "@/hooks/useHash";

export async function POST(req) {
  try {
    const { userId, password } = await req.json();

    const userDoc = await db.collection("admins").doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 401 });
    }

    const userData = userDoc.data();
    const hashedPassword = useHash(password);
    if (verifyHash(hashedPassword, userData.passwordHash, userData.salt)) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }

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

    return NextResponse.json({
      token: customToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Server error occurred" },
      { status: 500 }
    );
  }
}
