import { requireAccess } from "@/lib/access-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminEditor from "./editor";

export default async function AdminPage() {
  const requestHeaders = await headers();
  const request = new Request("https://studywithmadison.com/admin", { headers: requestHeaders });
  if (!(await requireAccess(request))) redirect("/");
  return <AdminEditor />;
}
