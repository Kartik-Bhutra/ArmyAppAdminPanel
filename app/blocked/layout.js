import Dashboard from "@/components/Dashboard";
import { getAuthUser } from "@/utils/getAuthUser";
import { redirect } from "next/navigation";

export default async function BlockedPage({children}) {
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
      {children}
    </Dashboard>
  );
}