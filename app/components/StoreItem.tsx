"use client";
import Counter from "./Counter";
import { Item } from "../lib/types";
import { useState } from "react";

interface StoreItemProps {
  item: Item;
  remove: (formData: FormData) => Promise<void>;
}

const StoreItem = ({ item, remove }: StoreItemProps) => {
  const [count, setCount] = useState(1);

  return (
    <tr>
      <td>
        <input type="checkbox" name="" id="" />
      </td>
      <td>{item.itemName}</td>
      <td>
        <Counter
          count={count}
          add={() => setCount(count + 1)}
          subtract={() => setCount(count - 1)}
        />
      </td>
      <td>${(item.price * count).toFixed(2)}</td>
      <td>
        <form action={remove}>
          <input type="hidden" name="id" defaultValue={item._id} />
          <button className="btn">Remove</button>
        </form>
      </td>
    </tr>
  );
};

export default StoreItem;
