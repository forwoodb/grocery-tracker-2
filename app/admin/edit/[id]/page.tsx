import connectDb from "@/app/lib/db";
import User from "@/app/models/User";
import { getSession } from "better-auth/api";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditUserPage = async ({ params }: PageProps) => {
  await connectDb();

  const session = getSession();

  console.log(session);

  const { id } = await params;

  const data = await User.findOne({ _id: id });
  const user = JSON.parse(JSON.stringify(data));

  const updateUser = async (formData: FormData) => {
    "use server";

    await connectDb();

    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role");

    await User.findByIdAndUpdate(id, { name, email, role });

    redirect("/admin");
  };

  return (
    <>
      <main>
        <section>
          <div className="container p-4">
            <h1 className="text-lg text-center">Edit User</h1>
            <form
              action={updateUser}
              className="flex flex-col gap-4 w-xs p-4 mx-auto"
            >
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                className="input"
              />
              <input
                type="text"
                name="email"
                defaultValue={user.email}
                className="input"
              />
              <select name="role" id="role" className="select">
                <option value="user" selected={user.role === "user"}>
                  User
                </option>
                <option value="admin" selected={user.role === "admin"}>
                  Admin
                </option>
              </select>
              <button className="btn">Update </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default EditUserPage;
