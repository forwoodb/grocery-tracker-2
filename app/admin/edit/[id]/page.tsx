import connectDb from "@/app/lib/db";
import User from "@/app/models/User";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditUserPage = async ({ params }: PageProps) => {
  await connectDb();

  const { id } = await params;

  const user = await User.findOne({ _id: id });
  console.log(id);

  return (
    <>
      <main>
        <section>
          <div className="container p-4">
            <h1 className="text-lg text-center">Edit User</h1>
            <form
              // action={updateUser}
              className="flex flex-col gap-4 w-xs p-4 mx-auto"
            >
              <input
                type="text"
                name="name"
                value={user.name}
                className="input"
              />
              <input
                type="text"
                name="email"
                value={user.email}
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
