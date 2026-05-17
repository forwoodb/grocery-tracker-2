import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";

const KitchenPage = async () => {
  await connectDb();

  const items = await GroceryItem.find({ inKitchen: true });

  return (
    <div>
      <h1>Kitchen Page</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default KitchenPage;
