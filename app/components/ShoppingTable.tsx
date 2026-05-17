"use client";
import { Item } from "../lib/types";
import ShopItem from "@/app/components/ShopItem";
import { useState } from "react";

interface ShoppingTableProps {
  items: Item[];
  remove: (formData: FormData) => Promise<void>;
}

const ShoppingTable = ({ items, remove }: ShoppingTableProps) => {
  const [shoppingItems, setShoppingItems] = useState(
    items.map((item) => {
      return {
        ...item,
        count: 1,
      };
    }),
  );

  // Counter functions
  const counter = (mode: string, id: string) => {
    const list = shoppingItems.map((item) => {
      if (id === item._id) {
        let shoppingCount;
        if (mode === "add") {
          shoppingCount = item.count + 1;
        } else {
          shoppingCount = Math.max(1, item.count - 1);
        }
        const countItem = {
          ...item,
          count: shoppingCount,
        };
        return countItem;
      }
      return item;
    });
    setShoppingItems(list);
  };

  const add = (id: string) => {
    counter("add", id);
  };

  const subtract = (id: string) => {
    counter("subtract", id);
  };

  // Get list total
  let total = 0;
  for (let i = 0; i < shoppingItems.length; i++) {
    const item = shoppingItems[i];
    total = total + item.price * item.count;
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
        {shoppingItems.map((item) => {
          return (
            <ShopItem
              key={item._id}
              item={item}
              remove={remove}
              count={item.count}
              add={() => add(item._id)}
              subtract={() => subtract(item._id)}
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
