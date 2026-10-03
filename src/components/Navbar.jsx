import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cart = useSelector((state) => state.cart);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          💊 MediCare Pharmacy
        </Link>

        {user && (
          <div className="nav-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/medicines">
              Medicines
            </Link>

            <Link to="/cart">
              🛒 Cart ({cartCount})
            </Link>

            {user.role === "ADMIN" && (
              <>
                <Link to="/add-medicine">
                  Add Medicine
                </Link>

                <Link to="/orders">
                  Orders
                </Link>

                <Link to="/customers">
                  Customers
                </Link>
              </>
            )}

            <Link to="/logout">
              Logout
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;