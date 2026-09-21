"use client";
import { Item } from "../lib/types";
import ShopItem from "@/app/components/ShopItem";
import { useState } from "react";
import Counter from "./Counter";

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
  const total = items.reduce((sum, item) => {
    const count = counts[item._id] || 1;
    const cost = item.price * count;
    return sum + cost;
  }, 0);

  return (
    <table className="table table-xs">
      <thead>
        <tr>
          <th></th>
          <th>Count</th>
          <th>Name</th>
          <th>Price</th>
          <th>Brand</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return (
            <tr key={item._id}>
              <td>
                <input
                  type="checkbox"
                  value={item._id}
                  name="selected"
                  form="kitchen"
                />
              </td>
              <td>
                <Counter
                  count={counts[item._id] || 1}
                  add={() => counter(item._id, 1)}
                  subtract={() => counter(item._id, -1)}
                />
              </td>
              <td>{item.itemName}</td>
              <td>${(item.price * (counts[item._id] || 1)).toFixed(2)}</td>
              <td>{item.brand}</td>
              <td>
                <form action={remove}>
                  <input type="hidden" name="id" defaultValue={item._id} />
                  <button className="btn">Remove</button>
                </form>
              </td>
            </tr>
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
