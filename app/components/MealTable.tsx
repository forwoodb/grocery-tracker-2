"use client";
import MealItem from "@/app/components/MealItem";
import { Item } from "../lib/types";
import { useState } from "react";

interface MealTableProps {
  mealItems: Item[];
  remove: (formData: FormData) => Promise<void>;
}

const MealTable = ({ mealItems, remove }: MealTableProps) => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const counter = (id: string, num: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + num),
    }));
  };

  const total = mealItems.reduce((sum, item) => {
    const count = counts[item._id] || 0;
    const cost = (item.price / item.size) * count;

    return sum + cost;
  }, 0);

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
          const count = counts[item._id] || 0;
          const unitPrice = item.price / item.size;
          const cost = unitPrice * count;

          return (
            <MealItem
              key={item._id}
              item={item}
              remove={remove}
              count={count}
              cost={cost}
              add={() => counter(item._id, 1)}
              subtract={() => counter(item._id, -1)}
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
