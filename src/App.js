import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Category from "./components/Category/Category";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import Details from "./components/Details/Details";
import Notfound from "./components/Notfound/Notfound";
import Cart from "./components/Cart/Cart";
import UserTokenProvider from "./components/context/tokenContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CartProvider from "./components/context/cartContext";
import {ToastContainer} from "react-toastify";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

function App() {

const router = createBrowserRouter([
  {path: '', element:<Layout/>, children: [
          {path:'', element: <ProtectedRoute>
                  <Home/>
              </ProtectedRoute>},
          {path:'home', element: <ProtectedRoute>
                  <Home/>
              </ProtectedRoute>,},
          {path:'login', element: <Login/>},
          {path:'register', element: <Register/>},
          {path:'categories', element:
                  <ProtectedRoute>
                      <Category/>
                      </ProtectedRoute>},
          {path:'brands', element:
                  <ProtectedRoute>
                  <Brands/>
                      </ProtectedRoute>},
          {path:'checkout/:cart', element:
                  <ProtectedRoute>
                      <Checkout/>
                  </ProtectedRoute>},
          {path:'allorders', element:
                  <ProtectedRoute>
                      <Orders/>
                  </ProtectedRoute>},

          {path:'cart', element:
                  <ProtectedRoute>
                  <Cart/>
                      </ProtectedRoute>},
          {path:'password', element:
                      <ForgotPassword/>},
          {path:'reset', element:
                  <ResetPassword/>},
          {path:'products', element:
                  <ProtectedRoute>
                  <Products/>
                      </ProtectedRoute>},
          {path:'details/:item', element:
                  <ProtectedRoute>
                  <Details/>
                      </ProtectedRoute>},
          {path:'*', element: <Notfound/>},

    ] },
])



  return (
      <CartProvider>
          <UserTokenProvider>
              <RouterProvider router={router}/>
              <ToastContainer theme={'colored'}/>
          </UserTokenProvider>
      </CartProvider>

  );
}

export default App;
