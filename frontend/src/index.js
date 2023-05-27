import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeProvider } from "react-stripe-elements";

const stripePromise = loadStripe(
  "pk_test_51NAZUiEPfo7g9wMRjD5EEbzBBwUYSnZ9aitts3bZb54XWwGS2CPviw1dliZt56q8sciiUqfwsHgVhlzJPlYRM4VU00E7yVIZKC"
);
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};
const options1 = {
  // passing the client secret obtained from the server
  clientSecret:
    "sk_test_51NAZUiEPfo7g9wMRpmM7G3S5F2QL784awUm2ne9jEuFfPhYRpSlvHX8BXOMgd8mytPJIQsypFKiXH317rMbzR52s00NczdW8Ay",
};

const root = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  root
);
