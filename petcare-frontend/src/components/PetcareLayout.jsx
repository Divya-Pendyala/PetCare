import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function PetCareLayout({ children }) {

  const location = useLocation();
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName") || "User";

  const userEmail =
    localStorage.getItem("userEmail") || "";

  /*
   * Nested pet pages use URLs such as:
   *
   * /pets/3/appointments
   * /pets/3/vaccinations
   * /pets/3/health-records
   * /pets/3/reminders
   *
   * We get the pet ID from the URL so the sidebar
   * can navigate between sections for the same pet.
   */
  const pathParts =
    location.pathname.split("/");

  const petId =
    pathParts[1] === "pets" &&
    pathParts[2]
      ? pathParts[2]
      : null;


  const isDashboard =
    location.pathname === "/dashboard";

  const isPets =
    location.pathname === "/pets";

  const isVaccinations =
    location.pathname.includes("/vaccinations");

  const isAppointments =
    location.pathname.includes("/appointments");

  const isHealthRecords =
    location.pathname.includes("/health-records");

  const isReminders =
    location.pathname.includes("/reminders");

  const isProfile =
    location.pathname === "/profile";


  /*
   * If we know which pet is being viewed,
   * navigate directly to that pet's page.
   *
   * Otherwise go to My Pets first.
   */

  const vaccinationsLink =
    petId
      ? `/pets/${petId}/vaccinations`
      : "/pets";

  const appointmentsLink =
    petId
      ? `/pets/${petId}/appointments`
      : "/pets";

  const healthRecordsLink =
    petId
      ? `/pets/${petId}/health-records`
      : "/pets";

  const remindersLink =
    petId
      ? `/pets/${petId}/reminders`
      : "/pets";


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };


  return (

    <div className="petcare-dashboard">

      <aside className="petcare-sidebar">


        {/* LOGO */}

        <Link
          to="/dashboard"
          className="petcare-logo layout-logo"
        >
          🐾 PETCARE
        </Link>


        {/* MAIN MENU */}

        <nav className="sidebar-menu">

          <Link
            to="/dashboard"
            className={
              `sidebar-item ${
                isDashboard ? "active" : ""
              }`
            }
          >
            <span className="sidebar-nav-icon">
              🏠
            </span>

            <span>
              Dashboard
            </span>
          </Link>


          <Link
            to="/pets"
            className={
              `sidebar-item ${
                isPets ? "active" : ""
              }`
            }
          >
            <span className="sidebar-nav-icon">
              🐶
            </span>

            <span>
              My Pets
            </span>
          </Link>

        </nav>


        {/* PET CARE SECTION */}

        <div className="sidebar-care-title">
          PET CARE
        </div>


        <nav className="sidebar-menu sidebar-care-menu">


          <Link
            to={vaccinationsLink}
            className={
              `sidebar-item ${
                isVaccinations
                  ? "active"
                  : ""
              }`
            }
          >
            <span className="sidebar-nav-icon">
              💉
            </span>

            <span>
              Vaccinations
            </span>
          </Link>


          <Link
            to={appointmentsLink}
            className={
              `sidebar-item ${
                isAppointments
                  ? "active"
                  : ""
              }`
            }
          >
            <span className="sidebar-nav-icon">
              📅
            </span>

            <span>
              Appointments
            </span>
          </Link>


          <Link
            to={healthRecordsLink}
            className={
              `sidebar-item ${
                isHealthRecords
                  ? "active"
                  : ""
              }`
            }
          >
            <span className="sidebar-nav-icon">
              ❤️
            </span>

            <span>
              Health Records
            </span>
          </Link>


          <Link
            to={remindersLink}
            className={
              `sidebar-item ${
                isReminders
                  ? "active"
                  : ""
              }`
            }
          >
            <span className="sidebar-nav-icon">
              🔔
            </span>

            <span>
              Reminders
            </span>
          </Link>

        </nav>


        {/* BOTTOM SECTION */}

        <div className="sidebar-bottom">


          <Link
            to="/profile"
            className={
              `sidebar-item ${
                isProfile
                  ? "active"
                  : ""
              }`
            }
          >
            <span className="sidebar-nav-icon">
              👤
            </span>

            <span>
              Profile
            </span>
          </Link>


          <div className="sidebar-theme">

            <ThemeToggle />

          </div>


          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >

            <span className="sidebar-nav-icon">
              🚪
            </span>

            <span>
              Logout
            </span>

          </button>


          <div className="sidebar-user">

            <div className="sidebar-user-avatar">

              {userName
                .charAt(0)
                .toUpperCase()}

            </div>


            <div className="sidebar-user-details">

              <strong>
                {userName}
              </strong>

              <small>
                {userEmail}
              </small>

            </div>

          </div>

        </div>

      </aside>


      {/* PAGE CONTENT */}

      <main className="petcare-main">

        {children}

      </main>

    </div>

  );
}

export default PetCareLayout;