import User from "../models/User";
import GroceryItem from "../models/GroceryItem";
import { revalidatePath } from "next/cache";
import connectDb from "../lib/db";
import Link from "next/link";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role !== "admin") {
    redirect("/dashboard");
  }

  console.log(session);

  // Get users
  const data = await User.find({});
  const users = JSON.parse(JSON.stringify(data));

  const deleteUser = async (formData: FormData) => {
    "use server";

    await connectDb();

    const userId = formData.get("userId");
    const user = await User.findByIdAndDelete({ _id: userId });
    const userGroceryItems = await GroceryItem.deleteMany({ userId });

    revalidatePath("/admin");
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link href={`admin/edit/${user._id}`} className="btn">
                    Edit
                  </Link>
                </td>
                <td>
                  <form action={deleteUser}>
                    <input
                      type="hidden"
                      name="userId"
                      defaultValue={user._id}
                    />
                    <button className="btn">Delete</button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
