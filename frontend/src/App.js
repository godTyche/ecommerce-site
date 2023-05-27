import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";

import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import Profile from "./components/user/Profile.js";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import ProtectedRoute from "./components/route/ProtectedRoute";

import { loadUser } from "./actions/userActions";
import store from "./store";
import axios from "axios";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51NAZUiEPfo7g9wMRjD5EEbzBBwUYSnZ9aitts3bZb54XWwGS2CPviw1dliZt56q8sciiUqfwsHgVhlzJPlYRM4VU00E7yVIZKC"
);
function App() {
  const [stripeApiKey, setStripeAipKey] = useState("");
  const stripePromise = loadStripe(
    "pk_test_51NAZUiEPfo7g9wMRjD5EEbzBBwUYSnZ9aitts3bZb54XWwGS2CPviw1dliZt56q8sciiUqfwsHgVhlzJPlYRM4VU00E7yVIZKC"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "sk_test_51NAZUiEPfo7g9wMRpmM7G3S5F2QL784awUm2ne9jEuFfPhYRpSlvHX8BXOMgd8mytPJIQsypFKiXH317rMbzR52s00NczdW8Ay",
  };

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeKey() {
      const { data } = await axios.get("/api/v1/stripeApi");
      setStripeAipKey(data.stripeApiKey);
    }

    // getStripeKey();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Routes>
              <Route path="/" element={<Home key="/" />} exact />
              <Route path="/search/:keyword" element={<Home key="/search" />} />
              <Route path="/product/:id" element={<ProductDetails />} exact />

              <Route path="/cart" element={<Cart />} />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
                exact
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/password/forgot"
                element={<ForgotPassword />}
                exact
              />
              <Route
                path="/password/reset/:token"
                element={<NewPassword />}
                exact
              />
              <Route
                path="/me"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/me/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/password/update"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
                exact
              />

              <Route
                path="/orders/me"
                element={
                  <ProtectedRoute>
                    <ListOrders />
                  </ProtectedRoute>
                }
                exact
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Elements>
  );
}

export default App;
