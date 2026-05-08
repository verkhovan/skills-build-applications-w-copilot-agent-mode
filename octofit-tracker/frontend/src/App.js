import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function NavBar() {
  const location = useLocation();
  const navLinks = [
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/teams', label: 'Teams' },
    { to: '/users', label: 'Users' },
    { to: '/workouts', label: 'Workouts' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
            alt="OctoFit logo"
            width="38"
            height="38"
          />
          <strong>OctoFit Tracker</strong>
        </Link>
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
          <ul className="navbar-nav ms-auto">
            {navLinks.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <Link
                  className={`nav-link${location.pathname === to ? ' active fw-bold' : ''}`}
                  to={to}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Welcome() {
  return (
    <div className="octofit-hero">
      <h1 className="display-5 fw-bold mb-3">Welcome to OctoFit Tracker!</h1>
      <p className="lead mb-4">
        Track activities, manage teams, view the leaderboard, and discover personalised workouts.
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        <Link to="/activities" className="btn btn-light btn-lg px-4">Activities</Link>
        <Link to="/leaderboard" className="btn btn-outline-light btn-lg px-4">Leaderboard</Link>
        <Link to="/teams" className="btn btn-outline-light btn-lg px-4">Teams</Link>
        <Link to="/users" className="btn btn-outline-light btn-lg px-4">Users</Link>
        <Link to="/workouts" className="btn btn-outline-light btn-lg px-4">Workouts</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container pb-5">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
