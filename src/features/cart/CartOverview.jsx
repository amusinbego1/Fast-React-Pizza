import { useSelector } from "react-redux";
import { getTotalNumPizzas, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { Link } from "react-router-dom";

function CartOverview() {
  const totalPrice = useSelector(getTotalPrice);
  const numPizzas = useSelector(getTotalNumPizzas);

  if (!numPizzas) return;

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <p className="space-x-3 p-2 text-stone-400 md:p-3">
        <span>{`${numPizzas} pizza${numPizzas === 1 ? "" : "s"}`}</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link
        className="transition-colors duration-200 hover:text-white"
        to="/cart"
      >
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
