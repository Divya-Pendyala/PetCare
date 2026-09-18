import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import { getPets } from "../services/petService";
import { getAppointments } from "../services/appointmentService";
import { getVaccinations } from "../services/vaccinationService";
import { getReminders } from "../services/reminderService";

function Dashboard() {

  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName") || "User";

  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [reminders, setReminders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =========================================
     LOAD DASHBOARD DATA
     ========================================= */

  useEffect(() => {

    const loadDashboardData = async () => {

      try {

        setLoading(true);
        setError("");

        /*
         * STEP 1:
         * Get all pets belonging to the
         * currently logged-in user.
         */

        const petResponse = await getPets();

        const petList = petResponse.data || [];

        setPets(petList);


        /*
         * These arrays will collect information
         * from every pet.
         */

        let allAppointments = [];
        let allVaccinations = [];
        let allReminders = [];


        /*
         * STEP 2:
         * For every pet, get appointments,
         * vaccinations and reminders.
         */

        for (const pet of petList) {

          try {

            const [
              appointmentResponse,
              vaccinationResponse,
              reminderResponse
            ] = await Promise.all([

              getAppointments(pet.id),

              getVaccinations(pet.id),

              getReminders(pet.id)

            ]);


            /*
             * Add pet information to each record.
             * This allows the dashboard to display
             * which pet the record belongs to.
             */

            const petAppointments =
              (appointmentResponse.data || []).map(
                appointment => ({
                  ...appointment,
                  petId: pet.id,
                  petName: pet.name
                })
              );


            const petVaccinations =
              (vaccinationResponse.data || []).map(
                vaccination => ({
                  ...vaccination,
                  petId: pet.id,
                  petName: pet.name
                })
              );


            const petReminders =
              (reminderResponse.data || []).map(
                reminder => ({
                  ...reminder,
                  petId: pet.id,
                  petName: pet.name
                })
              );


            allAppointments = [
              ...allAppointments,
              ...petAppointments
            ];


            allVaccinations = [
              ...allVaccinations,
              ...petVaccinations
            ];


            allReminders = [
              ...allReminders,
              ...petReminders
            ];

          } catch (petError) {

            console.error(
              `Unable to load data for pet ${pet.id}`,
              petError
            );

          }

        }


        /* =====================================
           ONLY KEEP UPCOMING APPOINTMENTS
           ===================================== */

        const today = new Date();

        today.setHours(0, 0, 0, 0);


        const upcomingAppointments =
          allAppointments
            .filter(appointment => {

              if (!appointment.appointmentDate) {
                return false;
              }

              const appointmentDate =
                new Date(
                  appointment.appointmentDate +
                  "T00:00:00"
                );

              return appointmentDate >= today;

            })
            .sort((a, b) => {

              const dateA = new Date(
                `${a.appointmentDate}T${
                  a.appointmentTime || "00:00:00"
                }`
              );

              const dateB = new Date(
                `${b.appointmentDate}T${
                  b.appointmentTime || "00:00:00"
                }`
              );

              return dateA - dateB;

            });


        setAppointments(upcomingAppointments);

        setVaccinations(allVaccinations);


        /*
         * Only reminders that have NOT
         * been completed are active.
         */

        const activeReminders =
          allReminders.filter(
            reminder => !reminder.completed
          );


        setReminders(activeReminders);

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load dashboard information."
        );

      } finally {

        setLoading(false);

      }

    };


    loadDashboardData();

  }, []);



  /* =========================================
     LOGOUT
     ========================================= */

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");

  };



  /* =========================================
     FORMAT DATE
     ========================================= */

  const formatDate = (date) => {

    if (!date) {
      return "No date";
    }

    return new Date(
      date + "T00:00:00"
    ).toLocaleDateString();

  };



  return (

    <div className="petcare-dashboard">


      {/* =====================================
          LEFT SIDEBAR
          ===================================== */}

      <aside className="petcare-sidebar">

        <div className="petcare-logo">
          🐾 PETCARE
        </div>


        <nav className="sidebar-menu">

          <Link
            to="/dashboard"
            className="sidebar-item active"
          >
            🏠 Dashboard
          </Link>


          <Link
            to="/pets"
            className="sidebar-item"
          >
            🐶 My Pets
          </Link>


          <Link
            to="/pets"
            className="sidebar-item"
          >
            💉 Vaccinations
          </Link>


          <Link
            to="/pets"
            className="sidebar-item"
          >
            📅 Appointments
          </Link>


          <Link
            to="/pets"
            className="sidebar-item"
          >
            ❤️ Health Records
          </Link>


          <Link
            to="/pets"
            className="sidebar-item"
          >
            🔔 Reminders
          </Link>

        </nav>


        <div className="sidebar-bottom">

          <Link
            to="/profile"
            className="sidebar-item"
          >
            👤 Profile
          </Link>


          <div className="sidebar-theme">
            <ThemeToggle />
          </div>


          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      </aside>



      {/* =====================================
          MAIN DASHBOARD
          ===================================== */}

      <main className="petcare-main">


        {/* WELCOME */}

        <div className="dashboard-welcome">

          <p className="welcome-small">
            PET CARE MANAGEMENT
          </p>

          <h1>
            GOOD MORNING, {userName.toUpperCase()}! 🐕
          </h1>

          <p>
            Here's today's overview of your pets.
          </p>

        </div>



        {/* ERROR */}

        {error && (

          <p className="dashboard-error">
            {error}
          </p>

        )}



        {/* LOADING */}

        {loading ? (

          <div className="dashboard-loading">
            Loading your pet care information...
          </div>

        ) : (

          <>


            {/* =================================
                SUMMARY CARDS
                ================================= */}

            <div className="summary-cards">


              {/* TOTAL PETS */}

              <div className="summary-card pets-summary">

                <div className="summary-icon">
                  🐾
                </div>

                <p>Total Pets</p>

                <h2>
                  {pets.length}
                </h2>

                <span>
                  Pets registered in PetCare
                </span>

              </div>



              {/* APPOINTMENTS */}

              <div className="summary-card appointment-summary">

                <div className="summary-icon">
                  📅
                </div>

                <p>Upcoming Appointments</p>

                <h2>
                  {appointments.length}
                </h2>

                <span>
                  Scheduled veterinary visits
                </span>

              </div>



              {/* VACCINATIONS */}

              <div className="summary-card vaccine-summary">

                <div className="summary-icon">
                  💉
                </div>

                <p>Vaccinations</p>

                <h2>
                  {vaccinations.length}
                </h2>

                <span>
                  Vaccination records
                </span>

              </div>



              {/* REMINDERS */}

              <div className="summary-card reminder-summary">

                <div className="summary-icon">
                  🔔
                </div>

                <p>Active Reminders</p>

                <h2>
                  {reminders.length}
                </h2>

                <span>
                  Pet care reminders
                </span>

              </div>

            </div>



            {/* =================================
                DASHBOARD CONTENT
                ================================= */}

            <div className="dashboard-content-grid">


              {/* =================================
                  MY PETS
                  ================================= */}

              <section className="dashboard-panel">

                <div className="panel-heading">

                  <h2>My Pets</h2>

                  <Link to="/pets">
                    View All
                  </Link>

                </div>


                {pets.length === 0 ? (

                  <div className="empty-dashboard-data">

                    🐶

                    <h3>No Pets Yet</h3>

                    <p>
                      Add your first pet to PetCare.
                    </p>

                    <Link
                      to="/pets"
                      className="dashboard-action-button"
                    >
                      Add Pet
                    </Link>

                  </div>

                ) : (

                  <div className="dashboard-pet-list">

                    {pets.slice(0, 4).map(
                      pet => (

                        <div
                          className="dashboard-pet-card"
                          key={pet.id}
                        >


                          {/* PET IMAGE */}

                          <div className="dashboard-pet-image">

                            {pet.imageUrl ? (

                              <img
                                src={pet.imageUrl}
                                alt={pet.name}
                              />

                            ) : (

                              <span>
                                🐾
                              </span>

                            )}

                          </div>



                          {/* PET INFORMATION */}

                          <div className="dashboard-pet-info">

                            <h3>
                              {pet.name}
                            </h3>

                            <p>
                              {pet.breed ||
                               pet.species}
                            </p>

                            <small>
                              {pet.gender || "Pet"}
                              {pet.weight
                                ? ` • ${pet.weight} lbs`
                                : ""}
                            </small>

                          </div>



                          {/* PET BUTTONS */}

                          <div className="pet-quick-buttons">

                            <Link
                              to={
                                `/pets/${pet.id}/appointments`
                              }
                            >
                              📅
                            </Link>

                            <Link
                              to={
                                `/pets/${pet.id}/vaccinations`
                              }
                            >
                              💉
                            </Link>

                            <Link
                              to={
                                `/pets/${pet.id}/health-records`
                              }
                            >
                              ❤️
                            </Link>

                            <Link
                              to={
                                `/pets/${pet.id}/reminders`
                              }
                            >
                              🔔
                            </Link>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                )}

              </section>



              {/* =================================
                  UPCOMING APPOINTMENTS
                  ================================= */}

              <section className="dashboard-panel">

                <div className="panel-heading">

                  <h2>
                    Upcoming Appointments
                  </h2>

                </div>


                {appointments.length === 0 ? (

                  <div className="small-empty-message">

                    <span>📅</span>

                    <p>
                      No upcoming appointments.
                    </p>

                  </div>

                ) : (

                  <div className="dashboard-appointment-list">

                    {appointments
                      .slice(0, 5)
                      .map(
                        appointment => (

                          <Link
                            to={
                              `/pets/${appointment.petId}/appointments`
                            }
                            className="dashboard-appointment"
                            key={
                              `${appointment.petId}-${appointment.id}`
                            }
                          >

                            <div className="appointment-date-box">

                              <strong>
                                {
                                  new Date(
                                    appointment.appointmentDate +
                                    "T00:00:00"
                                  ).getDate()
                                }
                              </strong>

                              <span>

                                {
                                  new Date(
                                    appointment.appointmentDate +
                                    "T00:00:00"
                                  )
                                    .toLocaleString(
                                      "default",
                                      {
                                        month: "short"
                                      }
                                    )
                                }

                              </span>

                            </div>


                            <div className="appointment-dashboard-info">

                              <strong>
                                {appointment.petName}
                              </strong>

                              <p>
                                {appointment.reason}
                              </p>

                              <small>
                                {formatDate(
                                  appointment.appointmentDate
                                )}

                                {appointment.appointmentTime &&
                                  ` • ${appointment.appointmentTime}`}
                              </small>

                            </div>

                          </Link>

                        )
                      )}

                  </div>

                )}

              </section>

            </div>



            {/* =================================
                REMINDERS SECTION
                ================================= */}

            <section className="dashboard-panel reminder-panel">

              <div className="panel-heading">

                <h2>
                  Care Reminders
                </h2>

              </div>


              {reminders.length === 0 ? (

                <div className="small-empty-message">

                  <span>🔔</span>

                  <p>
                    No active reminders.
                  </p>

                </div>

              ) : (

                <div className="dashboard-reminder-grid">

                  {reminders
                    .slice(0, 4)
                    .map(
                      reminder => (

                        <Link
                          to={
                            `/pets/${reminder.petId}/reminders`
                          }
                          className="dashboard-reminder"
                          key={
                            `${reminder.petId}-${reminder.id}`
                          }
                        >

                          <div className="reminder-icon">
                            🔔
                          </div>

                          <div>

                            <strong>
                              {reminder.title}
                            </strong>

                            <p>
                              {reminder.petName}
                            </p>

                            <small>
                              {formatDate(
                                reminder.reminderDate
                              )}
                            </small>

                          </div>

                        </Link>

                      )
                    )}

                </div>

              )}

            </section>

          </>

        )}

      </main>

    </div>

  );

}

export default Dashboard;