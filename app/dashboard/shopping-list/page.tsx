import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { Item } from "@/app/lib/types";

const ShoppingListPage = async () => {
  await connectDb();

  const data = await GroceryItem.find({ inList: true }).lean();
  const shoppingItems: Item[] = JSON.parse(JSON.stringify(data));
  console.log(shoppingItems);

  return (
    <div>
      <h1>Shopping List Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {shoppingItems.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td>{item.itemName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingListPage;
