import User from "../models/User";

const AdminPage = async () => {
  // Get users
  const users = await User.find({});

  const deleteUser = async (params: type) => {};
  console.log(users);

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
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <form action="">
                    <input type="hidden" name="userId" />
                    <button>Delete</button>
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
