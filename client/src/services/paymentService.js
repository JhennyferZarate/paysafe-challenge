import $ from "jquery";

const apiUrl = "http://192.168.0.20:3000/api";

export const getConfig = async () => {
  try {
    const response = await $.ajax({
      url: `${apiUrl}/transactions/config`,
      method: "GET",
      contentType: "application/json",
    });

    return response;
  } catch (error) {
    console.error("Error fetching config:", error);
    throw error;
  }
};

export const createPaymentIntent = async (data) => {
  try {
    const response = await $.ajax({
      url: `${apiUrl}/transactions/create`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

export const updateTransactionStatus = async (idPayment, status) => {
  try {
    const response = await $.ajax({
      url: `${apiUrl}/transactions/update/${idPayment}`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ newStatus: status }),
    });

    return response;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};
