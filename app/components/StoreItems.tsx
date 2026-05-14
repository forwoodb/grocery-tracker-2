import { Item } from "../lib/types";
import Link from "next/link";

interface PageProps {
  groceryItems: Item[];
  deleteGroceryItem: (formData: FormData) => Promise<void>;
}

const StoreItems = ({ groceryItems, deleteGroceryItem }: PageProps) => {
  return (
    <div className="bg-base-100 rounded-xl shadow-md p-6">
      {/* <button click={addToList} className="btn btn-warning"> */}
      <button className="btn btn-warning">Add Checked Items to List</button>
      <table className="table table-sm table-pin-rows">
        {/* <table> */}
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Price</th>
            <th>Price Type</th>
            <th>Brand</th>
            <th>Size</th>
            <th>Location</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {groceryItems
            .sort((a, b) => {
              return a.itemName.localeCompare(b.itemName);
            })
            .map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{item.itemName}</td>
                  <td>${item.price?.toFixed(2)}</td>
                  <td>{item.priceType}</td>
                  <td>{item.brand}</td>
                  <td>{item.size}</td>
                  <td>{item.location}</td>
                  <td className="w-px whitespace-nowrap">
                    <Link
                      href={`/dashboard/store/edit/${item._id}`}
                      className="btn btn-sm"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="w-px whitespace-nowrap">
                    <form action={deleteGroceryItem}>
                      <input
                        type="hidden"
                        name="id"
                        defaultValue={item._id.toString()}
                      />
                      <button className="btn btn-sm bg-red-700 text-white">
                        Delete
                      </button>
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

export default StoreItems;
