// import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHeartbeat, faStethoscope, faNotesMedical, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";


const NavigationBar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

 


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-custom" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to={role === "doctor" ? "/doctor-dashboard" : "/dashboard"} className="brand">
          <span className="brand-icon">
            <FontAwesomeIcon icon={faHeartbeat} />
          </span>
          Healing Hands
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            {role === "doctor" ? (
              <>
                <Nav.Link as={Link} to="/patient-reports" className="nav-item">
                  <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
                  <span>Patient Reports</span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/health-form" className="nav-item">
                  <FontAwesomeIcon icon={faStethoscope} className="nav-icon" />
                  <span>Health Check</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/submitted-reports" className="nav-item">
                  <FontAwesomeIcon icon={faNotesMedical} className="nav-icon" />
                  <span>Submitted Reports</span>
                </Nav.Link>
              </>
            )}
            <Button variant="danger" onClick={handleLogout} className="logout-btn">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;