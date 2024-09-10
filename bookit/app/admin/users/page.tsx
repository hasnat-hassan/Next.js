import Error from "@/app/error";
import AllUsers from "@/components/admin/AllUsers";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "All Users - ADMIN",
};

const allUsers = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}/api/admin/users`,
    authHeaders
  );
  return res.json();
};

export default async function AdminUsersPage() {
  const data = await allUsers();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <AllUsers data={data} />;
}
