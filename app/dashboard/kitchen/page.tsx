import connectDb from "@/app/lib/db";
import { Item } from "@/app/lib/types";
import GroceryItem from "@/app/models/GroceryItem";
import { revalidatePath } from "next/cache";

const KitchenPage = async () => {
  await connectDb();

  const data = await GroceryItem.find({ inKitchen: true }).lean();
  const items: Item[] = JSON.parse(JSON.stringify(data));

  const removeFromKitchen = async (formData: FormData) => {
    "use server";
    await connectDb();

    const id = formData.get("id");

    await GroceryItem.findByIdAndUpdate(id, { inKitchen: false });

    revalidatePath("/dashboard/kitchen");
  };

  return (
    <div>
      <h1>Kitchen Page</h1>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <input type="checkbox" name="selected" value={item._id} />
                </td>
                <td>{item.itemName}</td>
                <td>{item.price}</td>
                <td>{item.brand}</td>
                <td>
                  {item.size} {item.units}
                </td>
                <td>
                  <form action={removeFromKitchen}>
                    <input type="hidden" name="id" value={item._id} />
                    <button className="btn btn-xs">Remove</button>
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

export default KitchenPage;
