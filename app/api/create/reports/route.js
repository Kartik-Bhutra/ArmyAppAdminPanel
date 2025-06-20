import { db, admin } from "@/lib/firebaseAdmin";
import reports from "@/constants/reports.json";
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

    for (const report of reports) {
      // Encrypt the reported person's mobile
      const aesForReported = gcm(key, iv);
      const encryptedMobile = Buffer.from(
        aesForReported.encrypt(utf8ToBytes(report.mobile))
      ).toString("base64url");

      // Encrypt each reporter's mobile
      const by = report.by.map((r) => {
        const aesForBy = gcm(key, iv);
        return {
          name: r.name,
          mobile: Buffer.from(
            aesForBy.encrypt(utf8ToBytes(r.mobile))
          ).toString("base64url"),
          reportedAt: new Date(),
        };
      });

      // Auto-generated Firestore document ID
      const docRef = db.collection("reports").doc();

      batch.set(docRef, {
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        mobile: encryptedMobile,
        by,
      });
    }

    const metaRef = db.collection("reports").doc("metadata");
    batch.set(metaRef, {
      reports: reports.length,
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: `Saved ${reports.length} reports.`,
    });
  } catch (err) {
    console.error("Encryption or Firestore error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
