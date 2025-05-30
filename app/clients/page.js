"use client";


import Table from "@/components/clients.components/Table";
// DEMO Data Inport
import Dashboard from "@/components/Dashboard";

export default function ClientsPage() {
  
  return (
    <Dashboard>
      <main className="p-6">
        <div className="bg-white bordered ">
          <Table/>
        </div>
      </main>
    </Dashboard>
  );
}
