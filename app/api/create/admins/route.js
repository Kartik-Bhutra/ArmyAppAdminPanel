import { db, admin } from "@/lib/firebaseAdmin";
import admins from "@/constants/admins.json";
import argon2 from "argon2";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const batch = db.batch();

    let authenticated = 0;
    const entries = Object.entries(admins);

    for (const [username, { password, role, mobile }] of entries) {
      if (role === true) authenticated++;

      const hashedPassword = await argon2.hash(password);

      const docRef = db.collection("admins").doc(username);

      batch.set(docRef, {
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        mobile: `+91${mobile}`,
        password: hashedPassword,
        role,
      });
    }

    const metaRef = db.collection("admins").doc("metadata");
    batch.set(metaRef, {
      authenticated,
      requests: entries.length - authenticated,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      total: entries.length,
    });
  } catch (err) {
    console.error("Encryption or Firestore error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
