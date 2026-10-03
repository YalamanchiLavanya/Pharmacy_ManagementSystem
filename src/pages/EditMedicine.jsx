import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getMedicine,
  updateMedicine
} from "../services/api";

function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    name: "",
    genericName: "",
    manufacturer: "",
    category: "",
    dosage: "",
    price: "",
    stock: "",
    expiryDate: "",
    prescription: false,
    image: ""
  });

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
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setMedicine({
      ...medicine,
      [name]: type === "checkbox" ? checked : value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateMedicine(id, {
        ...medicine,
        price: Number(medicine.price),
        stock: Number(medicine.stock)
      });

      alert("Medicine updated successfully!");

      navigate("/medicines");
    } catch (error) {
      console.error(error);
      alert("Failed to update medicine");
    }
  }

  if (loading) {
    return (
      <div className="medicine-form-container">
        <h1>Loading Medicine...</h1>
      </div>
    );
  }

  return (
    <div className="medicine-form-container">

      <div className="medicine-form-card">

        <h1>✏️ Edit Medicine</h1>

        <p>
          Update medicine information.
        </p>

        <form onSubmit={handleSubmit}>

          <label>
            Medicine Name
          </label>

          <input
            type="text"
            name="name"
            value={medicine.name}
            onChange={handleChange}
            required
          />


          <label>
            Generic Name
          </label>

          <input
            type="text"
            name="genericName"
            value={medicine.genericName}
            onChange={handleChange}
            required
          />


          <label>
            Manufacturer
          </label>

          <input
            type="text"
            name="manufacturer"
            value={medicine.manufacturer}
            onChange={handleChange}
            required
          />


          <label>
            Category
          </label>

          <input
            type="text"
            name="category"
            value={medicine.category}
            onChange={handleChange}
            required
          />


          <label>
            Dosage
          </label>

          <input
            type="text"
            name="dosage"
            value={medicine.dosage}
            onChange={handleChange}
            required
          />


          <label>
            Price
          </label>

          <input
            type="number"
            name="price"
            min="0"
            value={medicine.price}
            onChange={handleChange}
            required
          />


          <label>
            Stock
          </label>

          <input
            type="number"
            name="stock"
            min="0"
            value={medicine.stock}
            onChange={handleChange}
            required
          />


          <label>
            Expiry Date
          </label>

          <input
            type="date"
            name="expiryDate"
            value={medicine.expiryDate}
            onChange={handleChange}
            required
          />


          <label>
            Medicine Image URL
          </label>

          <input
            type="url"
            name="image"
            value={medicine.image}
            onChange={handleChange}
          />


          <label className="checkbox-label">

            <input
              type="checkbox"
              name="prescription"
              checked={medicine.prescription}
              onChange={handleChange}
            />

            Prescription Required

          </label>


          <div className="form-buttons">

            <button
              type="submit"
              className="btn btn-primary"
            >
              💾 Update Medicine
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/medicines")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditMedicine;