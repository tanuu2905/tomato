import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [showThankYou, setShowThankYou] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

      if (response.data.success) {
        const { order } = response.data;

        const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: "Tomato",
          description: "Test Transaction",
          order_id: order.id,
          handler: function (response) {
  console.log("Payment ID:", response.razorpay_payment_id);

  // Clear local cart storage
  localStorage.removeItem("cartItems");
  window.localStorage.setItem("cartItems", JSON.stringify({}));

  // Show thank-you popup
  setShowThankYou(true);

  // Redirect to homepage after 3 seconds
  setTimeout(() => {
    setShowThankYou(false);
    window.location.href = "/";
  }, 3000);
},
          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        alert("Payment initialization failed");
      }
    } catch (error) {
      console.error("Error in Razorpay:", error);
      alert("Something went wrong. Try again.");
    }
  };

  {showThankYou && (
  <div className="popup-overlay">
    <div className="popup">
      <h2>🎉 Thank You!</h2>
      <p>Your payment was successful.</p>
      <p>Your cart has been cleared.</p>
      <p>Redirecting you to the homepage...</p>
    </div>
  </div>
)}

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First name" />
          <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last name" />
        </div>
        <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" />
        <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
        <div className="multi-fields">
          <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
          <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State " />
        </div>
        <div className="multi-fields">
          <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code" />
          <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country " />
        </div>
        <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? getTotalCartAmount() : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;