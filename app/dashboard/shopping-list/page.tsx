import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { Item } from "@/app/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ShoppingTable from "@/app/components/ShoppingTable";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const ShoppingListPage = async () => {
  await connectDb();

  // Get session info
  const session = auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

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
        inList: false,
        inKitchen: true,
      });
    }

    redirect("/dashboard/kitchen");
  };

  return (
    <div className="bg-base-100 rounded-xl shadow-md p-6">
      <h2 className="text-3xl  font-semibold mb-6 text-center">
        Shopping List
      </h2>
      <form action={addToKitchen} id="kitchen">
        <button className="btn btn-xs btn-warning">
          Add Checked Items to Kitchen
        </button>
      </form>
      <ShoppingTable items={shoppingItems} remove={removeFromList} />
    </div>
  );
};

export default ShoppingListPage;
