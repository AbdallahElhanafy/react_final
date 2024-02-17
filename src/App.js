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

function App() {

const router = createBrowserRouter([
  {path: '', element:<Layout/>, children: [
          {path:'', element: <Home/>},
          {path:'home', element: <Home/>},
          {path:'login', element: <Login/>},
          {path:'register', element: <Register/>},
          {path:'categories', element: <Category/>},
          {path:'brands', element: <Brands/>},
          {path:'cart', element: <Cart/>},
          {path:'products', element: <Products/>},
          {path:'details', element: <Details/>},
          {path:'*', element: <Notfound/>},

    ] },
])



  return (
      <UserTokenProvider>
          <RouterProvider router={router}/>
      </UserTokenProvider>
  );
}

export default App;
