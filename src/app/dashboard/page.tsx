
import { auth } from "@/auth";
import ButtonSignout from "./_components/button-signout";
import ClientAuth from "./_components/client-auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard : {session?.user?.email}</h1>
			<ButtonSignout />
      <ClientAuth />
    </div>
  )
}