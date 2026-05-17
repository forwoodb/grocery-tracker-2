"use client";
import { useState } from "react";
import Counter from "./Counter";
import { Item } from "../lib/types";

interface MealItemProps {
  item: Item;
}

const MealItem = ({ item }: MealItemProps) => {
  const [count, setCount] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);

  const unitPrice = item.price / item.size;

  console.log(unitPrice);

  return (
    <tr key={item._id}>
      <td>
        <input type="checkbox" name="selected" value={item._id} />
      </td>
      <td>{item.itemName}</td>
      <td>{itemPrice}</td>
      <td>{item.brand}</td>
      <td>
        <Counter
          count={count}
          add={() => setCount(count + 1)}
          subtract={() => setCount(Math.max(0, count - 1))}
        />
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
