import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import OAuthSuccess from "./pages/OAuthSuccess";
import OAuthProfile from "./pages/OAuthProfile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pets from "./pages/Pets";
import Vaccinations from "./pages/Vaccinations";
import Appointments from "./pages/Appointments";
import HealthRecords from "./pages/HealthRecords";
import Reminders from "./pages/Reminders";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
		
		<Route
		  path="/pets"
		  element={
		    <ProtectedRoute>
		      <Pets />
		    </ProtectedRoute>
		  }
		/>
		
		<Route
		  path="/pets/:petId/vaccinations"
		  element={
		    <ProtectedRoute>
		      <Vaccinations />
		    </ProtectedRoute>
		  }
		/>
		
		<Route
		  path="/pets/:petId/appointments"
		  element={
		    <ProtectedRoute>
		      <Appointments />
		    </ProtectedRoute>
		  }
		/>
		
		<Route
		  path="/pets/:petId/health-records"
		  element={
		    <ProtectedRoute>
		      <HealthRecords />
		    </ProtectedRoute>
		  }
		/>
		
		<Route
		  path="/pets/:petId/reminders"
		  element={
		    <ProtectedRoute>
		      <Reminders />
		    </ProtectedRoute>
		  }
		/>
		
		<Route
		  path="/profile"
		  element={
		    <ProtectedRoute>
		      <Profile />
		    </ProtectedRoute>
		  }
		/>
		
		<Route
		  path="/oauth-success"
		  element={<OAuthSuccess />}
		/>

		<Route
		  path="/oauth-profile"
		  element={
		    <ProtectedRoute>
		      <OAuthProfile />
		    </ProtectedRoute>
		  }
		/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;