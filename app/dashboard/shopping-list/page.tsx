import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { Item } from "@/app/lib/types";
import { revalidatePath } from "next/cache";
import StoreItem from "@/app/components/StoreItem";

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
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Count</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {shoppingItems.map((item) => {
            return (
              <StoreItem key={item._id} item={item} remove={removeFromList} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingListPage;
