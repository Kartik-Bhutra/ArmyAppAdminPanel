import { db, admin } from "@/lib/firebaseAdmin";
import reports from "@/constants/reports.json";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const batch = db.batch();

    for (const report of reports) {
      const by = report.by.map((r) => {
        return {
          name: r.name,
          mobile: `+91${r.mobile}`,
          reportedAt: new Date(),
        };
      });

      const docRef = db.collection("reports").doc();

      batch.set(docRef, {
        mobile: `+91${report.mobile}`,
        by,
      });
    }

    const metaRef = db.collection("reports").doc("metadata");
    batch.set(metaRef, {
      reports: reports.length,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
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
