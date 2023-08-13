import { Link } from "react-router-dom";
import CreateUserForcer from "../user/CreateUserForcer";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart, getTotalPrice } from "./cartSlice";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const totalPrice = useSelector(getTotalPrice);

  return (
    <div>
      <CreateUserForcer />
      <h2 className="my-5 text-xl font-semibold">Your cart, {username}</h2>

      <div>
        <ul className="divide-y divide-stone-300 border-b ">
          {cart.map((pizza, i) => (
            <CartItem item={pizza} key={pizza.name + i} />
          ))}
        </ul>

        {cart.length !== 0 && (
          <div className="mt-5 space-x-4">
            <Button>
              <Link className="outline-none" to="/order/new">
                Order pizzas{" "}
                <span className="sm: hidden">{formatCurrency(totalPrice)}</span>
              </Link>
            </Button>
            <Button isSecondary={true} onClick={() => dispatch(clearCart())}>
              Clear cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
