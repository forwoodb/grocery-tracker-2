import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { Item } from "@/app/lib/types";
import { revalidatePath } from "next/cache";
import ShopItem from "@/app/components/ShopItem";
import { redirect } from "next/navigation";

const ShoppingListPage = async () => {
  await connectDb();

  const data = await GroceryItem.find({ inList: true }).lean();
  const shoppingItems: Item[] = JSON.parse(JSON.stringify(data));

  const removeFromList = async (formData: FormData) => {
    "use server";
    await connectDb();

    const id = formData.get("id");

    await GroceryItem.findByIdAndUpdate(id, { inList: false });
    console.log(id);

    revalidatePath("/dashboard/shopping-list");
  };

  const addToKitchen = async (formData: FormData) => {
    "use server";
    await connectDb();

    const selected = formData.getAll("selected");

    for (const id of selected) {
      await GroceryItem.findByIdAndUpdate(id, {
        inKitchen: true,
        inList: false,
      });

      redirect("/dashboard/kitchen");
      console.log(id);
    }
  };

  return (
    <div>
      <h1>Shopping List Page</h1>
      <form action={addToKitchen} id="kitchen">
        <button className="btn btn-xs">Add Checked Items to Kitchen</button>
      </form>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Count</th>
            <th>Name</th>
            <th>Price</th>
            <th>Price Type</th>
            <th>Brand</th>
            <th>Size</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {shoppingItems.map((item) => {
            return (
              <ShopItem key={item._id} item={item} remove={removeFromList} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingListPage;
