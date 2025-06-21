import { db, admin } from "@/lib/firebaseAdmin";
import clients from "@/constants/clients.json";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const batch = db.batch();
    let authenticatedCount = 0;

    const entries = Object.entries(clients);

    for (const [deviceId, { name, mobile, authenticated }] of entries) {
      if (authenticated === true) authenticatedCount++;

      const docRef = db.collection("requests_authentication").doc(deviceId);

      batch.set(docRef, {
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        name,
        mobile: `+91${mobile}`,
        authenticated,
        UUID: randomUUID(),
      });
    }

    const metaRef = db.collection("requests_authentication").doc("metadata");
    batch.set(metaRef, {
      authenticated: authenticatedCount,
      requests: entries.length - authenticatedCount,
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
