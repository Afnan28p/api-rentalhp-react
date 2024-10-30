import React, {Suspense, useState} from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom"; // Mengimpor BrowserRouter, Route, dan NavLink dari react-router-dom
import Loader from "./components/Loader"; // Loader Component
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute Component
import Logout from "./components/Logout";

const Home = React.lazy(() => import("./components/Home"))
const DevicesList = React.lazy(() => import("./components/Devices/List"))
const RentalsList = React.lazy(() => import("./components/Rentals/List"))
const DevicesCreate = React.lazy(() => import("./components/Devices/Create"))
const DevicesEdit = React.lazy(() => import("./components/Devices/Edit"))
const RentalsCreate = React.lazy(() => import("./components/Rentals/Create"))
const RentalsEdit = React.lazy(() => import("./components/Rentals/Edit"))
const Login = React.lazy(() => import("./components/Login"));

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Ambil token dari localStorage

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Home
          </NavLink>
          {/* Toggler Button for mobile devices */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/devices"
                >
                  Device
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/rentals"
                >
                  Rental
                </NavLink>
              </li>
              <li>
                {token ? ( // Tampilkan Logout jika token ada
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Suspense fallback={<Loader />}>
          {/* Suspense untuk fallback saat loading */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Route ke halaman Home */}
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/logout" element={<Logout setToken={setToken} />} />
            {/* Route ke halaman Login */}
            {/* Protected routes */}
            <Route
              path="/devices"
              element={
                <ProtectedRoute>
                  <DevicesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/devices/create"
              element={
                <ProtectedRoute>
                  <DevicesCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/devices/edit/:id"
              element={
                <ProtectedRoute>
                  <DevicesEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rentals"
              element={
                <ProtectedRoute>
                  <RentalsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rentals/create"
              element={
                <ProtectedRoute>
                  <RentalsCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rentals/edit/:id"
              element={
                <ProtectedRoute>
                  <RentalsEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>

        <div>&copy; 2024 Mahasiswa</div>
      </div>
    </Router>
  );
};

export default App
