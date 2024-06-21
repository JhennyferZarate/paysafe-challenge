import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { createPaymentIntent, getConfig } from "../services/paymentService";
import "../../src/assets/css/checkoutPage.css";

const Checkout = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("PEN");
  const [isPaymentIntentCreated, setIsPaymentIntentCreated] = useState(false);

  useEffect(() => {
    const fetchStripeKey = async () => {
      try {
        const { publishableKey } = await getConfig();
        const stripe = await loadStripe(publishableKey);
        setStripePromise(stripe);
      } catch (error) {
        console.error("Error fetching Stripe publishable key:", error);
      }
    };

    fetchStripeKey();
  }, []);

  const createIntent = async () => {
    try {
      const { stripePaymentIntentId, clientSecret } = await createPaymentIntent(
        {
          amount,
          currency,
        }
      );

      localStorage.setItem("paymentIntentId", stripePaymentIntentId);
      setClientSecret(clientSecret);
      setIsPaymentIntentCreated(true);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const handleCreatePaymentIntent = async (e) => {
    e.preventDefault();
    await createIntent();
  };

  return (
    <div className="pag">
      <div className="container">
        <h1 className="title">
          {isPaymentIntentCreated ? "Payment" : "Checkout"}
        </h1>
        {!isPaymentIntentCreated ? (
          <form className="form" onSubmit={handleCreatePaymentIntent}>
            <div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
                className="input"
              />
            </div>
            <div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="select"
              >
                <option value="PEN">PEN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <button className="button" type="submit">
              Pay
            </button>
          </form>
        ) : (
          clientSecret &&
          stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )
        )}
      </div>
    </div>
  );
};

export default Checkout;
