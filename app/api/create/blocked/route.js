import { db, admin } from "@/lib/firebaseAdmin";
import blocked from "@/constants/blocked.json";
import { gcm } from "@noble/ciphers/aes";
import { utf8ToBytes } from "@noble/ciphers/utils";
import { Buffer } from "buffer";
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

    const blockedNumbers = Object.keys(blocked);

    blockedNumbers.forEach((number) => {
      const aes = gcm(key, iv);
      const encrypted = aes.encrypt(utf8ToBytes(number));
      const encryptedId = Buffer.from(encrypted).toString("base64url");

      const docRef = db.collection("blocked").doc(encryptedId);
      batch.set(docRef, {
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    const metadataRef = db.collection("blocked").doc("metadata");
    batch.set(metadataRef, {
      total: blockedNumbers.length,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      total: blockedNumbers.length,
    });
  } catch (err) {
    console.error("Encryption or Firestore error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
