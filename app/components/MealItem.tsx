"use client";
import { useState } from "react";
import Counter from "./Counter";
import { Item } from "../lib/types";

interface MealItemProps {
  item: Item;
  count: number;
}

const MealItem = ({ item, count, add, subtract }: MealItemProps) => {
  return (
    <tr key={item._id}>
      <td>
        <input type="checkbox" name="selected" value={item._id} />
      </td>
      <td>{item.itemName}</td>
      <td>${item.cost.toFixed(2)}</td>
      <td>{item.brand}</td>
      <td className="flex">
        <Counter count={count} add={add} subtract={subtract} /> {item.units}
      </td>
      <td>
        {/* <form action={removeFromKitchen}>
                      <input type="hidden" name="id" value={item._id} />
                      <button className="btn btn-xs">Remove</button>
                    </form> */}
      </td>
    </tr>
  );
};

export default MealItem;
