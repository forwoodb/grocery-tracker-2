import ItemForm from "@/app/components/ItemForm";
import connectDb from "@/app/lib/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditGroceryItemPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const updateItem = async (formData: FormData) => {
    "use server";
    await connectDb();

    console.log(id);
  };

  return (
    <>
      <h1>Edit Page</h1>
      <ItemForm submit={updateItem} />
    </>
  );
};

export default EditGroceryItemPage;
