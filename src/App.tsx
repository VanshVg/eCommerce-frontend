import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Devices from "./pages/Categories/Devices";
import FashionItems from "./pages/Categories/FashionItems";
import Listing from "./pages/Listing";
import ProductDetails from "./pages/ProductDetails";
import Activation from "./pages/auth/Activation";
import Protected from "./components/Protected";
import Cart from "./pages/cart/Cart";
import AuthRoutes from "./components/AuthRoutes";
import Error from "./pages/Error";
import Orders from "./pages/Orders/Orders";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/auth/login" element={<Login />}></Route>
            <Route path="/auth/register" element={<Register />}></Route>
            <Route
              path="/auth/activation/:token"
              element={<Activation />}
            ></Route>
          </Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/list/devices" element={<Devices />}></Route>
          <Route path="/list/fashion" element={<FashionItems />}></Route>
          <Route path="/list/:category" element={<Listing />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route element={<Protected />}>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
          </Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
