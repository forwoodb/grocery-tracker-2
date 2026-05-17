"use client";
import MealItem from "@/app/components/MealItem";
import { Item } from "../lib/types";
import { useState } from "react";

interface MealTableProps {
  items: Item[];
}

const MealTable = ({ items }: MealTableProps) => {
  const [mealItems, setMealItems] = useState(
    items.map((item) => {
      return {
        ...item,
        count: 0,
        cost: 0,
      };
    }),
  );

  // Counter functions
  const counter = (mode, id) => {
    const list = mealItems.map((item) => {
      const unitPrice = item.price / item.size;
      if (id === item._id) {
        let itemCount;
        if (mode === "add") {
          itemCount = item.count + 1;
        } else {
          itemCount = Math.max(0, item.count - 1);
        }
        return {
          ...item,
          count: itemCount,
          cost: unitPrice * itemCount,
        };
      }
      return item;
    });
    setMealItems(list);
  };

  const add = (id) => {
    counter("add", id);
  };

  const subtract = (id) => {
    counter("subtract", id);
  };

  // Get total cost of meal
  let total = 0;
  for (let i = 0; i < mealItems.length; i++) {
    const item = mealItems[i];

    total = total + item.cost;
  }

  return (
    <table className="table table-xs">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Cost</th>
          <th>Brand</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {mealItems.map((item) => {
          return (
            <MealItem
              key={item._id}
              item={item}
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
          <td>Total</td>
          <td>${total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default MealTable;
