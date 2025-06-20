import { db, admin } from "@/lib/firebaseAdmin";
import admins from "@/constants/admins.json";
import { gcm } from "@noble/ciphers/aes";
import { utf8ToBytes } from "@noble/ciphers/utils";
import { Buffer } from "buffer";
import argon2 from "argon2";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const iv64 = process.env.ENCRYPTION_IV;
    const key64 = process.env.ENCRYPTION_KEY;

    if (!iv64 || !key64) {
      return NextResponse.json(
        { error: "Missing ENCRYPTION_IV or ENCRYPTION_KEY" },
        { status: 500 }
      );
    }

    const key = Buffer.from(key64, "base64url");
    const iv = Buffer.from(iv64, "base64url");
    const batch = db.batch();

    let authenticated = 0;
    const entries = Object.entries(admins);

    for (const [username, { password, role, mobile }] of entries) {
      const aes = gcm(key, iv);
      if (role === true) authenticated++;

      const encryptedMobileBytes = aes.encrypt(utf8ToBytes(mobile));
      const encryptedMobile =
        Buffer.from(encryptedMobileBytes).toString("base64url");

      const hashedPassword = await argon2.hash(password);

      const docRef = db.collection("admins").doc(username);

      batch.set(docRef, {
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        mobile: encryptedMobile,
        password: hashedPassword,
        role: !!role,
      });
    }

    const metaRef = db.collection("admins").doc("metadata");
    batch.set(metaRef, {
      authenticated,
      requests: entries.length - authenticated,
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
