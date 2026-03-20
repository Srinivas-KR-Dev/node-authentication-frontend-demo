import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/employees", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setEmployees(response.data);
        setError("");
      } catch (_fetchError) {
        setError("Unable to fetch employees with the current token");
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [auth.accessToken]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (_error) {
      // Keep the UI simple even if logout request fails.
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <section className="panel panel-wide">
      <div className="panel-header">
        <div>
          <span className="eyebrow">Protected Route</span>
          <h1>Employee List</h1>
        </div>
        <button className="secondary-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p className="intro-text">
        Logged in as {auth.username || "Guest"}. This page fetches data from the
        protected employee endpoint.
      </p>

      {loading ? <p className="status-text">Loading employees...</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      {!loading && !error ? (
        <div className="employee-grid">
          {employees.map((employee) => (
            <article className="employee-card" key={employee._id}>
              <h2>
                {employee.firstname} {employee.lastname}
              </h2>
              <p>
                <strong>Email:</strong> {employee.email}
              </p>
              <p>
                <strong>Phone:</strong> {employee.phone}
              </p>
              <p>
                <strong>Department:</strong> {employee.department}
              </p>
              <p>
                <strong>Job:</strong> {employee.job}
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default EmployeeListPage;
