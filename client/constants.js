const CONSTANTS = {
  BASE_URL: "http://localhost:3000",
  UPLOAD_FOLDER: "uploads",
  SHIPPING_METHOD: ["Free", "NP", "UKP"],
  ORDER_STATUS: [
    "new",
    "payed",
    "confirmed",
    "on the way",
    "delivered",
    "canceled",
  ],
  SHIPPING_PRICE: { free: 0, NP: 80, UKR: 70 },
  STRIPE_SECRET_KEY: 'pk_test_51RsNQxEwAJ4b9QpfkpEI0vYjGupfeN2xPtyr56zMxu5I4yQgv36ppp6yDynPXZz3GQjpv1Wsh64rPSHJQN3uCIdT001nIwOTrb'
};

export default CONSTANTS;
