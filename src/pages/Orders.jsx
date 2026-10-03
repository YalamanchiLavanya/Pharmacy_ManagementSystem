import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      const response = await api.get(`/orders/${id}`);

      await api.put(`/orders/${id}`, {
        ...response.data,
        status: status
      });

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          String(order.id) === String(id)
            ? { ...order, status: status }
            : order
        )
      );

      alert("Order status updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update order status");
    }
  }

  async function deleteOrder(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/orders/${id}`);

      setOrders((currentOrders) =>
        currentOrders.filter(
          (order) => String(order.id) !== String(id)
        )
      );

      alert("Order deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete order");
    }
  }

  if (loading) {
    return (
      <div className="orders-container">
        <h1>Loading Orders...</h1>
      </div>
    );
  }

  return (
    <div className="orders-container">

      <div className="orders-header">
        <h1>📦 Orders</h1>
        <p>Manage customer pharmacy orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Found</h2>
          <p>Customer orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-top">

                <div>
                  <h2>
                    Order #{order.id}
                  </h2>

                  <p>
                    Customer: {order.customerName}
                  </p>

                  <p>
                    Email: {order.customerEmail}
                  </p>
                </div>

                <div className="order-status">

                  <label>
                    Status
                  </label>

                  <select
                    value={order.status || "Pending"}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>

                </div>

              </div>


              <div className="order-details">

                <h3>
                  Medicines
                </h3>

                {order.items &&
                  order.items.map((item, index) => (

                    <div
                      className="order-medicine"
                      key={index}
                    >

                      <span>
                        {item.name}
                      </span>

                      <span>
                        ₹{item.price} × {item.quantity}
                      </span>

                    </div>

                  ))}

              </div>


              <div className="order-summary">

                <p>
                  <strong>
                    Total Items:
                  </strong>{" "}
                  {order.totalItems}
                </p>

                <p>
                  <strong>
                    Payment:
                  </strong>{" "}
                  {order.paymentMethod}
                </p>

                <p>
                  <strong>
                    Total Amount:
                  </strong>{" "}
                  ₹{order.totalAmount}
                </p>

                <p>
                  <strong>
                    Order Date:
                  </strong>{" "}
                  {order.orderDate
                    ? new Date(
                        order.orderDate
                      ).toLocaleString()
                    : "N/A"}
                </p>

              </div>


              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteOrder(order.id)
                }
              >
                🗑️ Delete Order
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Orders;