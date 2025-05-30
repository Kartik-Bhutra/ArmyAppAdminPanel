"use client";
import React from "react";
import Dashboard from "@/components/Dashboard";
import Table from "@/components/reports.components/Table";

export default function Reports() {
  

  return (
    <Dashboard>
      <main className="p-6">
        <div className="bg-white bordered">
          <Table/>
        </div>
      </main>
    </Dashboard>
  );
}
