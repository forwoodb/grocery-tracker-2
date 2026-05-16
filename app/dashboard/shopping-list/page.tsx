import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { Item } from "@/app/lib/types";
import { revalidatePath } from "next/cache";

const ShoppingListPage = async () => {
  await connectDb();

  const data = await GroceryItem.find({ inList: true }).lean();
  const shoppingItems: Item[] = JSON.parse(JSON.stringify(data));

  const removeFromList = async (formData: FormData) => {
    "use server";

    const id = formData.get("id");

    await GroceryItem.findByIdAndUpdate(id, { inList: false });
    console.log(id);

    revalidatePath("/dashboard/shopping-list");
  };

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
                <td>
                  <form action={removeFromList}>
                    <input type="hidden" name="id" defaultValue={item._id} />
                    <button className="btn">Remove</button>
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

export default ShoppingListPage;
