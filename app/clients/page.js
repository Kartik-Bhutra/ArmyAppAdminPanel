import Table from "@/app/clients/(components)/Table";
import Dashboard from "@/components/Dashboard";
import { getAuthUser } from "@/utils/getAuthUser";
import { redirect } from "next/navigation";

export default async function ClientsPage() {
  let user;

  try {
    user = await getAuthUser();
    if (!user) {
      redirect("/login");
    }
  } catch (err) {
    redirect("/login");
  }
  return (
    <Dashboard user={user}>
      <main className="p-6">
        <div className="bg-white bordered ">
          <Table />
        </div>
      </main>
    </Dashboard>
  );
}
