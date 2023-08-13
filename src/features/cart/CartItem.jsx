import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

/* eslint-disable react/prop-types */
function CartItem({ item }) {
  const { id, name, quantity, unitPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="flex items-center justify-between px-3 py-3">
      <div className="flex-grow pl-3 pr-6  sm:flex sm:justify-between">
        <p className="">
          {quantity}&times; {name}
        </p>
        <p className=" font-semibold">{formatCurrency(quantity * unitPrice)}</p>
      </div>
      <div className="space-x-3 sm:mb-1">
        <Button
          isCircle={true}
          onClick={() => dispatch(decreaseQuantity(item))}
        >
          -
        </Button>
        <span>{quantity || 0}</span>
        <Button
          isCircle={true}
          onClick={() => dispatch(increaseQuantity(item))}
        >
          +
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
