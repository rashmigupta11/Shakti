import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [incidentDetails, setIncidentDetails] = useState("");

  const handleContactSave = (e) => {
    e.preventDefault();
    if (contactName && contactNumber) {
      setContacts([...contacts, { name: contactName, number: contactNumber }]);
      setContactName("");
      setContactNumber("");
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert("Report submitted successfully!");
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <a className="navbar-brand" href="#">Women Safety App</a>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="#emergencyContacts">Emergency Contacts</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#report">Report Incident</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#safetyTips">Safety Tips</a>
          </li>
        </ul>
      </nav>

      {/* Main Section */}
      <div className="jumbotron">
        <h1>Stay Safe, Stay Empowered</h1>
        <p>Your safety is our priority. Be alert, stay connected, and get help in an instant!</p>
        <button className="btn-sos" onClick={() => alert("Sending SOS alert...")}>
          Send SOS Alert
        </button>
      </div>

      {/* Features Section */}
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">Emergency Contacts</div>
              <div className="card-body">
                <h5 className="card-title">Save Contacts</h5>
                <p className="card-text">Add your trusted contacts to get instant help when needed.</p>
                <a href="#emergencyContacts" className="btn-primary">View Contacts</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header">Live Location Sharing</div>
              <div className="card-body">
                <h5 className="card-title">Share Location</h5>
                <p className="card-text">Share your location with loved ones in real time.</p>
                <button className="btn-primary" onClick={() => alert("Location shared successfully!")}>Share Now</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header">Report Incident</div>
              <div className="card-body">
                <h5 className="card-title">Report Safely</h5>
                <p className="card-text">Report any incident anonymously to the authorities.</p>
                <a href="#report" className="btn-primary">Report Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Section */}
      <div className="container py-5" id="emergencyContacts">
        <h2 className="text-center">Emergency Contacts</h2>
        <div className="row justify-content-center">
          <div className="col">
            <div className="card shadow-sm">
              <div className="card-body">
                <form onSubmit={handleContactSave}>
                  <div className="mb-3">
                    <label htmlFor="contactName" className="form-label">Contact Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactName"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Enter contact name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactNumber"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="Enter contact number"
                    />
                  </div>
                  <button type="submit" className="btn-primary">Save Contact</button>
                </form>
                <hr />
                <h4>Saved Contacts</h4>
                <ul className="list-group">
                  {contacts.map((contact, index) => (
                    <li key={index} className="list-group-item">
                      {contact.name} - {contact.number}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Section */}
      <div className="container py-5" id="report">
        <h2 className="text-center">Report Incident</h2>
        <div className="row justify-content-center">
          <div className="col">
            <div className="card shadow-sm">
              <div className="card-body">
                <form onSubmit={handleReportSubmit}>
                  <div className="mb-3">
                    <label htmlFor="incidentLocation" className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="incidentLocation"
                      value={incidentLocation}
                      onChange={(e) => setIncidentLocation(e.target.value)}
                      placeholder="Enter location of incident"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="incidentDetails" className="form-label">Incident Details</label>
                    <textarea
                      className="form-control"
                      id="incidentDetails"
                      value={incidentDetails}
                      onChange={(e) => setIncidentDetails(e.target.value)}
                      rows="5"
                      placeholder="Describe the incident"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-danger">Submit Report</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2024 Women Safety Application
      </footer>
    </div>
  );
};

export default App;
