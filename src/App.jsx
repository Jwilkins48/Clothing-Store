import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Item from "./pages/Item";
import CheckOut from "./pages/CheckOut";
import Navbar from "./components/Navbar";
import Wishlist from "./pages/Wishlist";
import "animate.css";
import Newsletter from "./pages/Newsletter";
import { useState } from "react";
import OrderPlaced from "./pages/OrderPlaced";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [checkOut, setCheckOut] = useState(false);
  const [checkOutEdit, setCheckOutEdit] = useState(false);

  return (
    <div className="app relative">
      <BrowserRouter>
        <Navbar checkOut={checkOut} setCheckOut={setCheckOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Newsletter" element={<Newsletter />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/shop/:gender/:clothingItem" element={<Shop />} />
          <Route
            path="/shop/:id"
            element={<Item checkOut={checkOut} setCheckOut={setCheckOut} />}
          />
          <Route
            path="/check-out"
            element={
              <CheckOut
                setCheckOut={setCheckOut}
                checkOut={checkOut}
                setCheckOutEdit={setCheckOutEdit}
                checkOutEdit={checkOutEdit}
              />
            }
          />
          <Route path="/orderPlaced" element={<OrderPlaced />} />
          <Route path="/wishlist" element={<PrivateRoute />}>
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
