import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-primary">
    <div className="container">
      <Link className="navbar-brand text-white" to="/">Job Board</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
