import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getMedicine } from "../services/api";
import { addToCart } from "../features/cartSlice";

function MedicineDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [medicine, setMedicine] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedicine();
  }, [id]);

  async function loadMedicine() {
    try {
      const response = await getMedicine(id);

      setMedicine(response.data);
    } catch (error) {
      console.error(error);

      alert("Failed to load medicine");

      navigate("/medicines");
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert(
        "Please login to add medicines to cart."
      );

      navigate("/login");

      return;
    }

    dispatch(addToCart(medicine));

    alert("Medicine added to cart!");
  }

  if (loading) {
    return (
      <div className="details-container">
        <h1>Loading Medicine...</h1>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="details-container">
        <h1>Medicine not found</h1>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/medicines")}
        >
          Back to Medicines
        </button>
      </div>
    );
  }

  return (
    <div className="details-container">

      <button
        className="back-button"
        onClick={() => navigate("/medicines")}
      >
        ← Back to Medicines
      </button>


      <div className="medicine-details-card">

        {/* Image */}

        <div className="details-image">

          <img
            src={medicine.image}
            alt={medicine.name}
          />

        </div>


        {/* Information */}

        <div className="details-content">

          <span className="category">
            {medicine.category}
          </span>

          <h1>
            {medicine.name}
          </h1>

          <p className="generic-name">
            Generic Name:{" "}
            <strong>
              {medicine.genericName}
            </strong>
          </p>


          <div className="details-info">

            <p>
              <strong>
                Manufacturer:
              </strong>{" "}
              {medicine.manufacturer}
            </p>

            <p>
              <strong>
                Dosage:
              </strong>{" "}
              {medicine.dosage}
            </p>

            <p>
              <strong>
                Category:
              </strong>{" "}
              {medicine.category}
            </p>

            <p>
              <strong>
                Expiry Date:
              </strong>{" "}
              {medicine.expiryDate}
            </p>

            <p>
              <strong>
                Stock:
              </strong>{" "}

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
              <strong>
                Prescription:
              </strong>{" "}

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

          </div>


          <div className="details-price">
            ₹{medicine.price}
          </div>


          <button
            className="btn btn-primary details-cart-btn"
            onClick={handleAddToCart}
            disabled={medicine.stock <= 0}
          >
            🛒 Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default MedicineDetails;