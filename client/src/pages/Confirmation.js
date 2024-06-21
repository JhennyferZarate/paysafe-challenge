import { useEffect } from "react";
import { updateTransactionStatus } from "../services/paymentService";
import checkImage from "../assets/img/check.png";
import "../assets/css/confirmationPage.css";

const Confirmation = () => {
  useEffect(() => {
    const storedPaymentIntentId = localStorage.getItem("paymentIntentId");

    const infoPayment = async () => {
      try {
        await updateTransactionStatus(storedPaymentIntentId, "Paid");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    infoPayment();

    localStorage.removeItem("paymentIntentId");
  }, []);

  return (
    <div className="pag">
      <div className="container">
        <img className="img" src={checkImage} alt="green_check" />
        <h1 className="title">Order Confirmed</h1>
        <p className="subtitle">Recept: #123456789</p>
        <div className="timestamp-div">
          <p className="timestamp">FECHA Y HORA</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
