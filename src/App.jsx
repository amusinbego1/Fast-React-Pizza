import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Error from "./ui/Error";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Order, {
  loader as orderLoader,
  action as orderAction,
} from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import CreateUser from "./features/user/CreateUser";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <CreateUser />,
        path: "user/new",
      },
      {
        element: <Menu />,
        path: "menu",
        loader: menuLoader,
      },
      {
        element: <Cart />,
        path: "cart",
      },
      {
        element: <Order />,
        path: "order/:id",
        loader: orderLoader,
        action: orderAction,
      },
      {
        element: <CreateOrder />,
        path: "order/new",
        action: createOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
