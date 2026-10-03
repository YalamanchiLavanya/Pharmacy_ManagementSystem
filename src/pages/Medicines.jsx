import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getMedicines,
  deleteMedicine
} from "../services/api";

import MedicineCard from "../components/MedicineCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Loading from "../components/Loading";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const response = await getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMedicine(id);

      setMedicines((current) =>
        current.filter(
          (medicine) => medicine.id !== id
        )
      );

      alert("Medicine deleted successfully");

    } catch (error) {
      console.error(error);
      alert("Failed to delete medicine");
    }
  };

  const categories = [
    ...new Set(
      medicines.map(
        (medicine) => medicine.category
      )
    )
  ];

  const filteredMedicines =
    medicines.filter((medicine) => {
      const searchText =
        `${medicine.name} ${medicine.genericName} ${medicine.category}`
          .toLowerCase();

      const matchesSearch =
        searchText.includes(
          search.toLowerCase()
        );

      const matchesCategory =
        category === "All" ||
        medicine.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>💊 Medicines</h1>

          <p>
            Browse all available medicines.
          </p>
        </div>

        {/* Not Logged In */}
        {!user && (
          <div className="medicine-auth-buttons">

            <Link
              to="/login"
              className="btn btn-primary"
            >
              🔐 Login
            </Link>

            <Link
              to="/register"
              className="btn btn-info"
            >
              📝 Register
            </Link>

          </div>
        )}

        {/* Admin Only */}
        {user && user.role === "ADMIN" && (
          <Link
            to="/add-medicine"
            className="btn btn-primary"
          >
            + Add Medicine
          </Link>
        )}

      </div>

      <div className="filter-area">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <Filter
          category={category}
          setCategory={setCategory}
          categories={categories}
        />

      </div>

      {filteredMedicines.length === 0 ? (

        <div className="no-results">

          <h2>No medicines found</h2>

          <p>
            Try another search or category.
          </p>

        </div>

      ) : (

        <div className="medicine-grid">

          {filteredMedicines.map(
            (medicine) => (

              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onDelete={handleDelete}
              />

            )
          )}

        </div>

      )}

    </div>
  );
}

export default Medicines;