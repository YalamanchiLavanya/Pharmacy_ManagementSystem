import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

function MedicineCard({ medicine, onDelete }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function handleAddToCart() {
    if (!user) {
      alert("Please login to add medicines to cart.");
      navigate("/login");
      return;
    }

    dispatch(addToCart(medicine));

    alert("Medicine added to cart!");
  }

  return (
    <div className="medicine-card">

      {/* Medicine Image */}

      <div className="medicine-image">
        <img
          src={medicine.image}
          alt={medicine.name}
        />
      </div>


      {/* Medicine Information */}

      <div className="medicine-content">

        <span className="category">
          {medicine.category}
        </span>

        <h3>
          {medicine.name}
        </h3>

        <p>
          <strong>Generic:</strong>{" "}
          {medicine.genericName}
        </p>

        <p>
          <strong>Manufacturer:</strong>{" "}
          {medicine.manufacturer}
        </p>

        <p>
          <strong>Dosage:</strong>{" "}
          {medicine.dosage}
        </p>

        <p>
          <strong>Stock:</strong>{" "}

          <span
            className={
              medicine.stock < 50
                ? "low-stock"
                : "available-stock"
            }
          >
            {medicine.stock}
          </span>
        </p>

        <p>
          <strong>Prescription:</strong>{" "}

          {medicine.prescription ? (
            <span className="prescription-required">
              Required
            </span>
          ) : (
            <span className="prescription-not-required">
              Not Required
            </span>
          )}
        </p>

        <h2>
          ₹{medicine.price}
        </h2>


        {/* Buttons */}

        <div className="card-buttons">

          <Link
            to={`/medicines/${medicine.id}`}
            className="btn btn-info"
          >
            View Details
          </Link>


          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={medicine.stock <= 0}
          >
            🛒 Add to Cart
          </button>


          {/* Admin Buttons */}

          {user && user.role === "ADMIN" && (
            <>
              <Link
                to={`/edit-medicine/${medicine.id}`}
                className="btn btn-warning"
              >
                ✏️ Edit
              </Link>

              <button
                className="btn btn-danger"
                onClick={() =>
                  onDelete(medicine.id)
                }
              >
                🗑️ Delete
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default MedicineCard;