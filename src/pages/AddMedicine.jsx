import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMedicine } from "../services/api";

function AddMedicine() {
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
      await addMedicine({
        ...medicine,
        price: Number(medicine.price),
        stock: Number(medicine.stock)
      });

      alert("Medicine added successfully!");

      navigate("/medicines");
    } catch (error) {
      console.error(error);
      alert("Failed to add medicine");
    }
  }

  return (
    <div className="medicine-form-container">

      <div className="medicine-form-card">

        <h1>💊 Add Medicine</h1>

        <p>
          Add a new medicine to the pharmacy.
        </p>

        <form onSubmit={handleSubmit}>

          <label>
            Medicine Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter medicine name"
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
            placeholder="Enter generic name"
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
            placeholder="Enter manufacturer"
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
            placeholder="Example: Antibiotic"
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
            placeholder="Example: 500mg Tablet"
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
            placeholder="Enter price"
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
            placeholder="Enter stock quantity"
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
            placeholder="Enter image URL"
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
              ➕ Add Medicine
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

export default AddMedicine;