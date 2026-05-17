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
        <input
          type="checkbox"
          value={item._id}
          name="selected"
          form="kitchen"
        />
      </td>
      <td>
        <Counter
          count={count}
          add={() => setCount(count + 1)}
          subtract={() => setCount(Math.max(1, count - 1))}
        />
      </td>
      <td>{item.itemName}</td>
      <td>${(item.price * count).toFixed(2)}</td>
      <td>{item.priceType}</td>
      <td>{item.brand}</td>
      <td>{`${item.size * count} ${item.units}`}</td>
      <td>{item.location}</td>
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
