"use client";
import Counter from "./Counter";
import { Item } from "../lib/types";

interface MealItemProps {
  item: Item;
  remove: (formData: FormData) => Promise<void>;
  count: number;
  cost: number;
  add: () => void;
  subtract: () => void;
}

const MealItem = ({
  item,
  remove,
  count,
  cost,
  add,
  subtract,
}: MealItemProps) => {
  return (
    <tr key={item._id}>
      <td>
        <input type="checkbox" name="selected" value={item._id} />
      </td>
      <td>{item.itemName}</td>
      <td>${cost.toFixed(2)}</td>
      <td>{item.brand}</td>
      <td className="flex">
        <Counter count={count} add={add} subtract={subtract} /> {item.units}
      </td>
      <td>
        <form action={remove}>
          <input type="hidden" name="id" value={item._id} />
          <button className="btn btn-xs">Remove</button>
        </form>
      </td>
    </tr>
  );
};

export default MealItem;
