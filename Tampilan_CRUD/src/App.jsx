import React, {Suspense} from "react"
import {BrowserRouter as Router, Routes, Route,NavLink} from "react-router-dom"

const Home = React.lazy(() => import("./components/Home"))
const DevicesList = React.lazy(() => import("./components/Devices/List"))
const RentalsList = React.lazy(() => import("./components/Rentals/List"))
// const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"))
// const FakultasEdit = React.lazy(() => import("./components/Fakultas/Edit"))
// const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"))
// const ProdiEdit = React.lazy(() => import("./components/Prodi/Edit"))

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
              < NavLink className={({isActive}) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
              < NavLink className={({isActive}) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/devices">Devices</NavLink>
              </li>
              <li className="nav-item">
              < NavLink className={({isActive}) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/rentals">Rental</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<DevicesList />} />
          <Route path="/rentals" element={<RentalsList />} />
          {/* <Route path="/fakultas/create" element={<FakultasCreate />} />
          <Route path="/fakultas/edit/:id" element={<FakultasEdit />} />
          <Route path="/prodi/create" element={<ProdiCreate />} />
          <Route path="/prodi/edit/:id" element={<ProdiEdit />} /> */}
        </Routes>
      </Suspense>
      <div className="mt-2">&copy; 2024 Mahasiswa</div>
    </Router>
  )
}

export default App