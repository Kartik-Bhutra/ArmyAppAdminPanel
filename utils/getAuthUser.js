import { auth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export async function getAuthUser() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) {
      return null;
    }
    const decoded = await auth.verifyIdToken(token);
    const userId = decoded.uid;
    const role = decoded.role;
    return { userId, role };
  } catch (err) {
    return null;
  }
}
