// Test ID: IIDSAT

import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import Badge from "../../ui/Badge";
import OrderItem from "./OrderItem";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { makeOrderPriority } from "../cart/cartSlice";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const fetcher = useFetcher();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="my-7 flex flex-wrap items-center justify-between gap-x-5">
        <h2 className=" text-xl font-semibold">Order #{id} status</h2>

        <div className="my-2 flex gap-x-3">
          {priority && <Badge color="red">Priority</Badge>}
          <Badge color="green">{status} order</Badge>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 bg-stone-300 px-6 py-4">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <small className="text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </small>
      </div>

      <ul className="my-5 divide-y divide-stone-300">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id + item.name} />
        ))}
      </ul>

      <div className="flex items-end justify-between bg-stone-300 px-6 py-4">
        <div>
          <p>Price pizza: {formatCurrency(orderPrice)}</p>
          {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
          <p className="mt-1 font-semibold">
            To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>
        {!priority && calcMinutesLeft(estimatedDelivery) >= 10 && (
          <fetcher.Form method="PATCH">
            <Button name={"order"} id="order" value={JSON.stringify(order)}>
              Make Priority
            </Button>
          </fetcher.Form>
        )}
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.id);
  return order;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = { ...JSON.parse(Object.fromEntries(formData).order) };
  data.priority = true;
  data.priorityPrice = data.orderPrice * 0.2;
  await updateOrder(data.id, data);
  return null;
}

export default Order;
