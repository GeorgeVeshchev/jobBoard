import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({
    jobPosition: '',
    location: '',
    description: '',
    experience: ''
  });
  const [error, setError] = useState('');

  // Заместите на ваш реальный токен
  const authToken = "95d162be3ab5fc31356ac38acabfd6f6869875d972dbd4a2c635f9fd1ffaec9a6b67c71e5784d791b7b338f7afe9a8ef4a05ddb199248bc33bc4d74eb884f4c4c9a4129140c07c7cc5e786a7a65374391cd2e37c988ff48e5d146c49d7034ddc7fa5eaecd0da564e1aee964c513a88ea74e44c205437aacbe0fb84351d44d291"; 
  const authTokenJob = "63bfc583647f5952118036f9aa1b4f1cafeb2307f17b2839520bd48e4b5f485220cc13551b40b9687b8e7c42d700b7124f437a80594a92b75450dabf58c98c0ed9fdb89dd2637030228aa34a1c497452c7be30b596963c9a1777c385157e95750b7456e65f4ff12c1225062a5ecac29423f5e6b949819da0399d3f3306decc0b"; 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:1336/api/joblists', {
          headers: { Authorization: `Bearer ${authTokenJob}` },
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setJobs(data.data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs.');
      }
    };

    fetchJobs();
  }, [authToken]);

  const fetchJobApplicants = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:1336/api/applicantlists`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) throw new Error(`Error fetching job applicants: ${response.statusText}`);
      const data = await response.json();
      setApplicants(data.data || []);
      setSelectedJob(jobs.find(job => job.id === jobId));
    } catch (error) {
      console.error('Error fetching job applicants:', error);
      setError('Failed to fetch applicants.');
    }
  };

  const handleUpdateApplicantStatus = async (applicantId, status) => {
    try {
      const response = await fetch(`http://localhost:1336/api/applicantlists/${applicantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          data: { Status: status }
        }),
      });

      if (!response.ok) throw new Error('Failed to update applicant status');
      const updatedApplicant = await response.json();
      setApplicants(prevApplicants =>
        prevApplicants.map(applicant =>
          applicant.id === applicantId ? updatedApplicant.data : applicant
        )
      );
      alert(`Applicant ${status}`);
    } catch (error) {
      console.error('Error updating applicant status:', error);
      alert('Failed to update applicant status.');
    }
  };

  const handleNewJobChange = (event) => {
    const { name, value } = event.target;
    setNewJob(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddJob = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:1336/api/joblists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          data: {
            JobPosition: newJob.jobPosition,
            Location: newJob.location,
            Description: newJob.description,
            Experience: newJob.experience
          }
        })
      });

      if (!response.ok) throw new Error('Failed to add new job');
      const addedJob = await response.json();
      setJobs([...jobs, addedJob.data]);
      setNewJob({
        jobPosition: '',
        location: '',
        description: '',
        experience: ''
      });
      alert('Job added successfully!');
    } catch (error) {
      console.error('Error adding new job:', error);
      alert('Failed to add new job.');
    }
  };
  console.log(applicants);
  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <Link to="/login">Logout</Link>
      </nav>

      <div className="dashboard-container">
        <div className="sidebar">
          <h3>Post New Job</h3>
          <form onSubmit={handleAddJob}>
            <label>
              Job Position:
              <input
                type="text"
                name="jobPosition"
                value={newJob.jobPosition}
                onChange={handleNewJobChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={newJob.location}
                onChange={handleNewJobChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newJob.description}
                onChange={handleNewJobChange}
                required
              />
            </label>
            <label>
              Experience:
              <input
                type="text"
                name="experience"
                value={newJob.experience}
                onChange={handleNewJobChange}
                required
              />
            </label>
            <button type="submit">Add Job</button>
          </form>
        </div>

        <div className="main-content">
          {error && <p className="error-message">{error}</p>}

          <div className="jobs">
            <h3>Open Jobs</h3>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.id} className="job-card">
                  <p>{job.attributes.JobPosition} - {job.attributes.Location}</p>
                  <button
                    className="btn-success"
                    onClick={() => fetchJobApplicants(job.id)}
                  >
                    View Applicants
                  </button>
                </div>
              ))
            ) : (
              <p>No open jobs available</p>
            )}
          </div>

          {selectedJob && (
            <div className="resume-viewer">
              <h3>Job Details: {selectedJob.attributes.JobPosition}</h3>
              <p>Location: {selectedJob.attributes.Location}</p>
              <textarea
                value={selectedJob.attributes.Description || ''}
                readOnly
                className="resume-textarea"
              />
              <p>Experience: {selectedJob.attributes.Experience}</p>
            </div>
          )}

{applicants.length > 0 && (
  <div className="job-applicants">
    <h3>Applicants for {selectedJob?.attributes?.JobPosition || 'Selected Job'}</h3>
    {applicants.map((applicant) => {
      console.log(applicant);
      
      return JSON.stringify(applicant)
      
        // return (
        //   <div key={applicant.id} className="applicant-card">
        //     <div className="details_">
        //       <div className="logo_"></div>
        //       <div className="description">
        //         <span className="span1_">{applicant.attributes.Name}</span>
        //         <span style={{ float: 'right' }}>{applicant.attributes.Status}</span>
        //         <br />
        //         <span className="span1_">{applicant.attributes.Email}</span>
        //         <textarea
        //           style={{ borderWidth: '0px' }}
        //           readOnly
        //           cols="70"
        //           rows="3"
        //         >
        //           {applicant.attributes.Message}
        //         </textarea>
        //         <center>
        //           <a
        //             target="_blank"
        //             rel="noopener noreferrer"
        //             href={applicant.attributes.Portfolio_Link}
        //           >
        //             View Portfolio
        //           </a>
        //           <br />
        //           <button
        //             className="btn-success"
        //             onClick={() => handleUpdateApplicantStatus(applicant.id, 'Accepted')}
        //           >
        //             Approve
        //           </button>
        //           <button
        //             className="btn-danger"
        //             onClick={() => handleUpdateApplicantStatus(applicant.id, 'Rejected')}
        //           >
        //             Decline
        //           </button>
        //           </center>
        //         </div>
        //         </div>
        //       <br />
        //       </div>
        //       );
              
          })}
        </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
