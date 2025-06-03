import Dashboard from "@/components/Dashboard";
import Table from "@/app/reports/(components)/Table";
import { getAuthUser } from "@/utils/getAuthUser";
import { redirect } from "next/navigation";

export default async function Reports() {
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
        <div className="bg-white bordered">
          <Table />
        </div>
      </main>
    </Dashboard>
  );
}
