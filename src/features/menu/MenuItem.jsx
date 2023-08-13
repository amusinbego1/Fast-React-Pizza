import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { decreaseQuantity, increaseQuantity } from "../cart/cartSlice";
import Button from "../../ui/Button";

/* eslint-disable react/prop-types */
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const quantity = useSelector(
    (state) => state.cart.cart.find((pizza) => pizza.id === id)?.quantity,
  );
  const dispatch = useDispatch();
  return (
    <li
      className={`inset-0 z-10 flex flex-col items-start justify-between space-x-3 px-5 py-3 sm:flex-row sm:items-end`}
    >
      <div className="flex space-x-3 py-3">
        <img
          className={`w-20 sm:w-28 ${soldOut ? "opacity-80 grayscale" : ""}`}
          src={imageUrl}
          alt={name}
        />
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm font-extralight capitalize italic text-stone-500">
              {ingredients.join(", ")}
            </p>
          </div>
          <div>
            {!soldOut ? (
              <p>{formatCurrency(unitPrice)}</p>
            ) : (
              <p className="text-lg font-medium uppercase text-stone-600">
                Sold out
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mb-3 space-x-3">
        <Button
          isDisabled={soldOut}
          isCircle={true}
          onClick={() => dispatch(decreaseQuantity(pizza))}
        >
          -
        </Button>
        <span>{quantity || 0}</span>
        <Button
          isDisabled={soldOut}
          isCircle={true}
          onClick={() => dispatch(increaseQuantity(pizza))}
        >
          +
        </Button>
      </div>
    </li>
  );
}

export default MenuItem;
