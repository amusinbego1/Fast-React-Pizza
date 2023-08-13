import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import CreateUserForcer from "../user/CreateUserForcer";
import MenuItem from "./MenuItem";
import CartOverview from "../cart/CartOverview";

function Menu() {
  const data = useLoaderData();
  return (
    <div className="divide-y divide-stone-300">
      <CreateUserForcer />
      {data.map((pizza, i) => (
        <MenuItem pizza={pizza} key={i + pizza.name} />
      ))}
    </div>
  );
}

export const loader = async function () {
  const data = await getMenu();
  return data;
};

export default Menu;
