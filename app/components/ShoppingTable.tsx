"use client";

import { Item } from "../lib/types";
import ShopItem from "@/app/components/ShopItem";
import { useState } from "react";

interface ShoppingTableProps {
  items: Item[];
  remove: (formData: FormData) => Promise<void>;
}

const ShoppingTable = ({ items, remove }: ShoppingTableProps) => {
  const [count, setCount] = useState(1);

  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    total = total + item.price;
  }

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
              count={count}
              add={() => setCount(count + 1)}
              subtract={() => setCount(Math.max(1, count - 1))}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>${total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ShoppingTable;
