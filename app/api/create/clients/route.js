import { db, admin } from "@/lib/firebaseAdmin";
import clients from "@/constants/clients.json";
import { gcm } from "@noble/ciphers/aes";
import { utf8ToBytes } from "@noble/ciphers/utils";
import { Buffer } from "buffer";
import { randomUUID } from "crypto";
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
    let authenticatedCount = 0;

    const entries = Object.entries(clients);

    for (const [deviceId, { name, mobile, authenticated }] of entries) {
      if (authenticated === true) authenticatedCount++;

      let aes = gcm(key, iv);
      const encryptedMobile = Buffer.from(
        aes.encrypt(utf8ToBytes(mobile))
      ).toString("base64url");

      aes = gcm(key, iv);
      const encryptedDeviceId = Buffer.from(
        aes.encrypt(utf8ToBytes(deviceId))
      ).toString("base64url");

      const uuid = randomUUID();
      aes = gcm(key, iv);
      const encryptedUUID = Buffer.from(
        aes.encrypt(utf8ToBytes(uuid))
      ).toString("base64url");

      const docRef = db.collection("clients").doc(encryptedDeviceId);

      batch.set(docRef, {
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        name,
        mobile: encryptedMobile,
        authenticated: !!authenticated,
        UUID: encryptedUUID,
      });
    }

    const metaRef = db.collection("clients").doc("metadata");
    batch.set(metaRef, {
      authenticated: authenticatedCount,
      requests: entries.length - authenticatedCount,
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
