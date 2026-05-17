// "use client";

// import { useState } from "react";
import { Item } from "../lib/types";
import Link from "next/link";

interface StoreItemsProps {
  groceryItems: Item[];
  deleteGroceryItem: (formData: FormData) => Promise<void>;
  createShoppingList: (formData: FormData) => Promise<void>;
}

const StoreItems = ({
  groceryItems,
  deleteGroceryItem,
  createShoppingList,
}: StoreItemsProps) => {
  return (
    <div className="bg-base-100 rounded-xl shadow-md p-6">
      {/* <button click={addToList} className="btn btn-warning"> */}
      <form action={createShoppingList} id="shopping-list">
        <button className="btn btn-warning">Add Checked Items to List</button>
      </form>
      <table className="table table-xs table-pin-rows">
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
                    <input
                      type="checkbox"
                      name="selected"
                      value={item._id}
                      form="shopping-list"
                    />
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
                      <input type="hidden" name="id" defaultValue={item._id} />
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
