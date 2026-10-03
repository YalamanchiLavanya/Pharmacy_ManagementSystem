import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from "../features/cartSlice";

import api from "../services/api";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  async function handlePlaceOrder() {
    if (!user) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const paymentMethod =
      document.querySelector(
        'input[name="payment"]:checked'
      )?.value;

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      // Get existing orders

      const ordersResponse = await api.get("/orders");

      const numericIds = ordersResponse.data
        .map((order) => Number(order.id))
        .filter((id) => Number.isFinite(id));

      const nextOrderId =
        numericIds.length > 0
          ? Math.max(...numericIds) + 1
          : 1;


      // Create new order

      const order = {
        id: nextOrderId,

        userId: user.id,

        customerName: user.name,

        customerEmail: user.email,

        items: cart.map((item) => ({
          medicineId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),

        totalItems: totalItems,

        totalAmount: totalAmount,

        paymentMethod: paymentMethod,

        status: "Pending",

        orderDate: new Date().toISOString()
      };


      // Save order

      await api.post("/orders", order);


      // Clear cart

      dispatch(clearCart());


      alert(
        `Order placed successfully!\nOrder ID: ${nextOrderId}`
      );

      navigate("/");

    } catch (error) {
      console.error(error);

      alert(
        "Failed to place order. Please try again."
      );
    }
  }


  if (cart.length === 0) {
    return (
      <div className="cart-container">

        <div className="empty-cart">

          <h1>🛒 Your Cart is Empty</h1>

          <p>
            Add some medicines to your cart
            before placing an order.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/medicines")}
          >
            Browse Medicines
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="cart-container">

      <div className="cart-header">

        <h1>
          🛒 Shopping Cart
        </h1>

        <p>
          Review your medicines before
          placing the order.
        </p>

      </div>


      {/* Cart Items */}

      <div className="cart-items">

        {cart.map((item) => (

          <div
            className="cart-item"
            key={item.id}
          >

            <div className="cart-item-image">

              <img
                src={item.image}
                alt={item.name}
              />

            </div>


            <div className="cart-item-info">

              <h3>
                {item.name}
              </h3>

              <p>
                {item.manufacturer}
              </p>

              <p>
                ₹{item.price}
              </p>

            </div>


            {/* Quantity */}

            <div className="quantity-controls">

              <button
                onClick={() =>
                  dispatch(
                    decreaseQuantity(item.id)
                  )
                }
              >
                −
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  dispatch(
                    increaseQuantity(item.id)
                  )
                }
              >
                +
              </button>

            </div>


            {/* Item Total */}

            <div className="cart-item-total">

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>


            {/* Remove */}

            <button
              className="btn btn-danger"
              onClick={() =>
                dispatch(
                  removeFromCart(item.id)
                )
              }
            >
              🗑️ Remove
            </button>

          </div>

        ))}

      </div>


      {/* Order Summary */}

      <div className="cart-summary">

        <h2>
          Order Summary
        </h2>

        <div className="summary-row">

          <span>
            Total Items
          </span>

          <strong>
            {totalItems}
          </strong>

        </div>

        <div className="summary-row">

          <span>
            Total Amount
          </span>

          <strong>
            ₹{totalAmount}
          </strong>

        </div>


        {/* Payment */}

        <div className="payment-section">

          <h3>
            Select Payment Method
          </h3>

          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Credit/Debit Card"
            />
            Credit/Debit Card
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Net Banking"
            />
            Net Banking
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
            />
            Cash on Delivery
          </label>

        </div>


        {/* Place Order */}

        <button
          className="btn btn-primary place-order-btn"
          onClick={handlePlaceOrder}
        >
          📦 Place Order
        </button>

      </div>

    </div>
  );
}

export default Cart;