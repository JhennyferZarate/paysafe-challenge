import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import "../assets/css/checkoutPage.css";
import { updateTransactionStatus } from "../services/paymentService";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
        },
      });

      const { error, paymentIntent } = response;

      if (error) {
        setMessage(error.message);
        await updateTransactionStatus(paymentIntent, "Cancelled");
        setIsProcessing(false);
      } else {
        setMessage("Payment successful!");
        await updateTransactionStatus(paymentIntent, "Success");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      setMessage(
        "An error occurred while processing your payment. Please try again."
      );
    }

    setIsProcessing(false);
  };

  return (
    <form className="form" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        className="button"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isProcessing ? "Processing..." : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
