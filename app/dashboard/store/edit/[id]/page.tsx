import ItemForm from "@/app/components/ItemForm";
import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { Item } from "@/app/lib/types";
interface PageProps {
  params: Promise<{ id: string }>;
}

const EditGroceryItemPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const groceryItem = (await GroceryItem.findOne({ _id: id })) as Item;

  const updateItem = async (formData: FormData) => {
    "use server";
    await connectDb();

    console.log(id);
  };

  return (
    <>
      <h1>Edit Page</h1>
      <ItemForm submit={updateItem} item={groceryItem} />
    </>
  );
};

export default EditGroceryItemPage;
