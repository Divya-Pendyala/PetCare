import {Link, useNavigate} from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function Dashboard() {
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">

        <div>
          <h1>PetCare Dashboard</h1>

          <p>
            Welcome, {userName || "User"}!
          </p>
        </div>

		<div className="dashboard-header-actions">

		  <ThemeToggle />

		  <button
		    className="logout-button"
		    onClick={handleLogout}
		  >
		    Logout
		  </button>

		</div>

      </div>

      <div className="dashboard-grid">

        <Link
          to="/pets"
          className="dashboard-card dashboard-link"
        >
          <h3>My Pets</h3>

          <p>
            Add, edit and manage your pets.
          </p>
        </Link>


        <Link
          to="/pets"
          className="dashboard-card dashboard-link"
        >
          <h3>Vaccinations</h3>

          <p>
            Select a pet to manage vaccinations.
          </p>
        </Link>


        <Link
          to="/pets"
          className="dashboard-card dashboard-link"
        >
          <h3>Appointments</h3>

          <p>
            Select a pet to manage veterinary
            appointments.
          </p>
        </Link>


        <Link
          to="/pets"
          className="dashboard-card dashboard-link"
        >
          <h3>Health Records</h3>

          <p>
            Select a pet to view and manage
            health records.
          </p>
        </Link>


        <Link
          to="/pets"
          className="dashboard-card dashboard-link"
        >
          <h3>Reminders</h3>

          <p>
            Select a pet to manage care
            reminders.
          </p>
        </Link>


        <Link
          to="/profile"
          className="dashboard-card dashboard-link"
        >
          <h3>Profile</h3>

          <p>
            View and update your account.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;