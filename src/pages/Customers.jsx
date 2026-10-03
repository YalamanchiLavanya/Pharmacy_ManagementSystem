import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const response = await api.get("/users");

      const users = response.data.filter(
        (user) => user.role === "USER"
      );

      setCustomers(users);
    } catch (error) {
      console.error(error);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="customers-container">
        <h1>Loading Customers...</h1>
      </div>
    );
  }

  return (
    <div className="customers-container">

      <div className="customers-header">
        <h1>👥 Customers</h1>
        <p>
          Manage registered pharmacy customers
        </p>
      </div>

      {customers.length === 0 ? (
        <div className="empty-customers">
          <h2>No Customers Found</h2>
          <p>
            Registered users will appear here.
          </p>
        </div>
      ) : (
        <div className="customers-table">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>

              {customers.map((customer) => (

                <tr key={customer.id}>

                  <td>
                    {customer.id}
                  </td>

                  <td>
                    {customer.name}
                  </td>

                  <td>
                    {customer.email}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Customers;