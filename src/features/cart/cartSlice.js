import { createSlice } from "@reduxjs/toolkit";
import { updateOrder } from "../../services/apiRestaurant";

const initialState = {
  cart: [],
  priorityPrice: 0,
  priority: false,
  // [
  //     {
  //         pizzaId: 12,
  //         name: "Mediterranean",
  //         quantity: 2,
  //         unitPrice: 16,
  //         totalPrice: 32,
  //     },
  //     {
  //         pizzaId: 6,
  //         name: "Vegetale",
  //         quantity: 1,
  //         unitPrice: 13,
  //     },
  //     {
  //         pizzaId: 11,
  //         name: "Spinach and Mushroom",
  //         quantity: 1,
  //         unitPrice: 15,
  //     },
  // ],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      state.cart = state.cart.filter((pizza) => pizza.id !== action.payload.id);
    },
    clearCart(state, action) {
      state.cart = [];
    },
    increaseQuantity(state, action) {
      const pizza = state.cart?.find((pizza) => pizza.id === action.payload.id);
      if (pizza) {
        pizza.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity(state, action) {
      const currentPizza = state.cart?.find(
        (pizza) => pizza.id === action.payload.id,
      );
      if (!currentPizza) return;
      if (currentPizza?.quantity <= 1)
        state.cart = state.cart.filter(
          (pizza) => pizza.id !== action.payload.id,
        );
      else currentPizza.quantity--;
    },
    // makeItemPriority(state, action) {
    //   state.priority = true;
    //   state.priorityPrice =
    //     state.cart.reduce(
    //       (sum, pizza) => sum + pizza.quantity * pizza.unitPrice,
    //       0,
    //     ) * 0.2;
    //   //       priority,
    //   // priorityPrice,
    // },
  },
});

export async function makeOrderPriority(order) {
  order.priority = true;
  order.priorityPrice =
    order.cart.reduce(
      (sum, pizza) => sum + pizza.quantity * pizza.unitPrice,
      0,
    ) * 0.2;
  await updateOrder(order.id, order);
}

export function getTotalPrice(state) {
  return state.cart.cart.reduce(
    (sum, pizza) => sum + pizza.quantity * pizza.unitPrice,
    0,
  );
}

export function getTotalNumPizzas(state) {
  return state.cart.cart.reduce((sum, pizza) => sum + pizza.quantity, 0);
}

export const {
  addItem,
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions;

export default slice.reducer;
