import { db, admin } from "@/lib/firebaseAdmin";
import blocked from "@/constants/blocked.json";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const batch = db.batch();
    const Obj = {};
    const blockedNumbers = Object.keys(blocked);
    blockedNumbers.forEach((number) => {
      Obj[`+91${number}`] = {
        createdAt: new Date(),
        remark: "number from India",
      };
    });
    const docRef = db.collection("blocked").doc("numbers");
    batch.set(docRef, {
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      ...Obj,
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
