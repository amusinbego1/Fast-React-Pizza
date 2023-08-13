/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex items-center justify-between py-3">
        <p className="flex flex-col">
          <span>
            {quantity}&times; {name}
          </span>
          <small className="ml-7 font-light capitalize">
            {isLoadingIngredients ? "Loading" : ingredients?.join(", ")}
          </small>
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
