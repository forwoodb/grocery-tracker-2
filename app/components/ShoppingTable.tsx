"use client";
import { Item } from "../lib/types";
import ShopItem from "@/app/components/ShopItem";
import { useState } from "react";

interface ShoppingTableProps {
  items: Item[];
  remove: (formData: FormData) => Promise<void>;
}

const ShoppingTable = ({ items, remove }: ShoppingTableProps) => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const counter = (id: string, num: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + num,
    }));
  };

  // // Get list total
  // let total = 0;
  // for (let i = 0; i < items.length; i++) {
  //   const item = items[i];
  //   total = total + item.price * item.count;
  // }

  return (
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
        {items.map((item) => {
          return (
            <ShopItem
              key={item._id}
              item={item}
              remove={remove}
              count={counts[item._id] || 1}
              add={() => counter(item._id, 1)}
              subtract={() => counter(item._id, -1)}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td>Total</td>
          {/* <td>${total.toFixed(2)}</td> */}
        </tr>
      </tfoot>
    </table>
  );
};

export default ShoppingTable;
