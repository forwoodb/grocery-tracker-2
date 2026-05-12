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
      <h1>Edit User Page</h1>
      <form action="">
        <label className="floating-label">
          <span>Your Email</span>
          <input
            type="text"
            placeholder="mail@site.com"
            className="input input-md"
          />
        </label>
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
        <input
          type="text"
          name="role"
          defaultValue={user.role}
          className="input"
        />
        <button>Update</button>
      </form>
    </>
  );
};

export default EditUserPage;
