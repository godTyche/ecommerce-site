const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeApi").get(sendStripeApi);

module.exports = router;
