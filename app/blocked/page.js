"use client";
import Table from "@/components/blocked.components/Table";
import Dashboard from "@/components/Dashboard";

export default function BlockedPage() {
  return (
    <Dashboard>
      <main className="p-6">
        <Table/>
      </main>
    </Dashboard>
  );
}
