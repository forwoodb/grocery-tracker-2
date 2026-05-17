import ItemForm from "@/app/components/ItemForm";
import { auth } from "@/app/lib/auth";
import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { refresh, revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Item } from "@/app/lib/types";
import StoreItems from "@/app/components/StoreItems";

const StorePage = async () => {
  await connectDb();

  // Get session info
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const data = await GroceryItem.find({}).lean();
  const groceryItems: Item[] = JSON.parse(JSON.stringify(data));

  const createGroceryItem = async (formData: FormData) => {
    "use server";
    await connectDb();

    const userId = session.user.id;
    const data = Object.fromEntries(formData);
    const newItem = await new GroceryItem({ ...data, userId });

    await newItem.save();

    revalidatePath("/");
  };

  const deleteGroceryItem = async (formData: FormData) => {
    "use server";
    await connectDb();

    const id = formData.get("id");

    await GroceryItem.findByIdAndDelete(id);

    revalidatePath("/dashboard/store");
    // refresh();
  };

  const createShoppingList = async (formData: FormData) => {
    "use server";
    await connectDb();

    const selected = formData.getAll("selected");

    for (const id of selected) {
      await GroceryItem.findByIdAndUpdate(id, { inList: true });
    }

    redirect("/dashboard/shopping-list");
  };

  return (
    <>
      <ItemForm submit={createGroceryItem} item={null} />
      <StoreItems
        groceryItems={groceryItems}
        deleteGroceryItem={deleteGroceryItem}
        createShoppingList={createShoppingList}
      />
    </>
  );
};

export default StorePage;
