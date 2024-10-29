import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Apply = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const jobid = queryParams.get('jobid');
  const [job, setJob] = useState({});
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:1336/api/joblists`)
      .then(res => res.json())
      .then(job_info => {
        setJob(job_info.data.attributes);
      })
      .catch(error => console.error('Error fetching job details:', error));
  }, [jobid]);

  const submit = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "data": {
          "Name": fullname,
          "Email": email,
          "Message": message,
          "Portfolio_Link": link,
          "Status": "Pending",
          "JobID": jobid
        }
      })
    };

    fetch('http://localhost:1336/api/applicantlists', requestOptions)
      .then(response => response.json())
      .then(() => alert("Application Submitted Successfully..."))
      .catch(error => console.error('Error submitting application:', error));
  };

  return (
    <div className="apply-container">
      <header className="header">
        <Navbar />
      </header>
      <div className="apply-content">
        <div className="job-details card">
          <img src='' className="card-img-top" alt="Job Logo" />
          <div className="card-body">
            <h4 className="card-title">{job.JobPosition}</h4>
            <p className="card-text">
              <strong>Location:</strong> {job.Location}<br />
              <strong>Status:</strong> {job.JobStatus}<br />
              <strong>Agency:</strong> {job.Agency}
            </p>
          </div>
        </div>
        <div className="application-form card">
          <div className="card-body">
            <h5 className="card-title">Apply for this Job</h5>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname" className="form-control" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="link">Portfolio Link</label>
              <input type="url" id="link" className="form-control" value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={submit}>Submit Application</button>
            <Link to="/" className="btn btn-secondary ml-2">Back to Jobs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
