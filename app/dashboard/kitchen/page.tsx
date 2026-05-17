import connectDb from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";

const KitchenPage = async () => {
  await connectDb();

  const items = await GroceryItem.find({ inKitchen: true });

  console.log(items);

  return (
    <div>
      <h1>Kitchen Page</h1>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <input type="checkbox" name="selected" value={item._id} />
                </td>
                <td>{item.itemName}</td>
                <td>{item.price}</td>
                <td>{item.brand}</td>
                <td>
                  {item.size} {item.units}
                </td>
                <td>
                  <form action="">
                    <input type="hidden" name="id" value={item._id} />
                    <button></button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default KitchenPage;
