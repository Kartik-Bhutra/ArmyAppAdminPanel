import { auth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { idToken } = await req.json();
    const decoded = await auth.verifyIdToken(idToken);
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Invalid ID token" }, { status: 401 });
  }
}
