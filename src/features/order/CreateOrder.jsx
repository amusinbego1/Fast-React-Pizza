import { useRef, useState } from "react";
import CreateUserForcer from "../user/CreateUserForcer";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  redirect,
  useActionData,
  useAsyncError,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import ErrorBlock from "../../ui/ErrorBlock";
import { getAddress } from "../../services/apiGeocoding";
import { clearCart } from "../cart/cartSlice";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  //TODO: ADD error handling using useActionData
  const actionData = useActionData();
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitting = useNavigation().state === "submitting";
  const dispatch = useDispatch();

  return (
    <div>
      <CreateUserForcer />

      <h2 className="my-6 text-xl font-semibold ">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="space-y-3">
          <div className="items-center sm:flex ">
            <label className="sm:basis-40">First Name</label>
            <input
              type="text"
              name="customer"
              defaultValue={username}
              required
              className="input w-full py-1.5 sm:py-1"
            />
          </div>

          <div className="items-center sm:flex">
            <label className="sm:basis-40">Phone number</label>
            <input
              type="tel"
              name="phone"
              required
              className="input w-full py-1.5 sm:py-1"
            />
          </div>

          {actionData?.phone && <ErrorBlock message={actionData.phone} />}

          <div className="items-center sm:flex">
            <label className="sm:basis-40">Address</label>
            <span className="flex w-full flex-wrap items-center gap-4">
              <input
                type="text"
                name="address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="input grow py-1.5 sm:py-1"
              />
              <button
                type="button"
                className=" rounded-full bg-transparent px-2.5 py-1.5 text-sm text-stone-500 outline-none ring ring-stone-400 transition-colors duration-200 hover:bg-stone-400 hover:text-stone-100"
                onClick={() => {
                  try {
                    setIsLoading(true);
                    navigator.geolocation.getCurrentPosition(
                      async function (position) {
                        const address = await getAddress(
                          position.coords.latitude,
                          position.coords.longitude,
                        );
                        setLocation(address);
                      },
                      () => alert("Cannot get address"),
                    );
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                {isLoading ? "Loading" : "Get My Location"}
              </button>
            </span>
          </div>

          <div className=" ml-1 flex items-center space-x-4">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              className="h-6 w-6 bg-yellow-300 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-1"
              // value={withPriority}
              // onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority">
              Want to yo give your order priority?
            </label>
          </div>

          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <input type="hidden" value={isSubmitting} name="isSubmitting" />
        </div>

        <div className="mt-8">
          <Button
            isDisabled={isSubmitting}
            // onClick={() => dispatch(clearCart())}
          >
            {isSubmitting ? "Loading..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const formObj = Object.fromEntries(formData);
  const cart = JSON.parse(formObj.cart).map((el) => {
    return { ...el, pizzaId: el.id };
  });
  const data = { ...formObj, cart };
  const errors = {};
  if (!isValidPhone(data.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;
  const dispatch = store.dispatch;
  dispatch(clearCart());

  const { id } = await createOrder(data);
  return redirect("/order/" + id);
}

export default CreateOrder;
