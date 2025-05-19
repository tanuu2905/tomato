import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import { toast } from "react-toastify";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/show`);
      console.log("Fetched orders:", response.data.orders); // for debug
      setOrders(response.data.orders || []);
    } catch (err) {
      toast.error("Failed to fetch orders");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [url]);

  return (
    <div className="order-list">
      <div className="order-header">
        <h2>Order List</h2>
        <button className="refresh-btn" onClick={fetchOrders}>
          🔄 Refresh
        </button>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Items Count</th>
            <th>Amount ($)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-msg">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>{Array.isArray(order.items) ? order.items.length : 0}</td>
                <td>${order.amount || 0}</td>
                <td>
                  {order.date ? new Date(order.date).toLocaleString() : "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
