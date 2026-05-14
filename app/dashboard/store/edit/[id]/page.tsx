import ItemForm from "@/app/components/ItemForm";
import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { Item } from "@/app/lib/types";
import { redirect } from "next/navigation";
interface PageProps {
  params: Promise<{ id: string }>;
}

const EditGroceryItemPage = async ({ params }: PageProps) => {
  await connectDb();

  const { id } = await params;

  const groceryItem = (await GroceryItem.findOne({ _id: id })) as Item;

  const updateItem = async (formData: FormData) => {
    "use server";
    await connectDb();

    const update = Object.fromEntries(formData);

    await GroceryItem.findByIdAndUpdate(id, { ...update });

    redirect("/dashboard/store");
  };

  return (
    <>
      <h1>Edit Page</h1>
      <ItemForm submit={updateItem} item={groceryItem} />
    </>
  );
};

export default EditGroceryItemPage;
