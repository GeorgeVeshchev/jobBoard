import React, { useState, useEffect } from 'react';
import './JobList.css';

const JobList = ({ search, onJobApplied }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  const apiUrl = "http://localhost:1336/api/joblists";
  const applyUrl = "http://localhost:1336/api/applicantlists";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 63bfc583647f5952118036f9aa1b4f1cafeb2307f17b2839520bd48e4b5f485220cc13551b40b9687b8e7c42d700b7124f437a80594a92b75450dabf58c98c0ed9fdb89dd2637030228aa34a1c497452c7be30b596963c9a1777c385157e95750b7456e65f4ff12c1225062a5ecac29423f5e6b949819da0399d3f3306decc0b', // Замените на ваш токен
          },
        });

        const data = await response.json();
        setJobs(data.data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [apiUrl]);

  const filteredJobs = jobs.filter(job =>
    job.attributes.JobPosition.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(applyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 95d162be3ab5fc31356ac38acabfd6f6869875d972dbd4a2c635f9fd1ffaec9a6b67c71e5784d791b7b338f7afe9a8ef4a05ddb199248bc33bc4d74eb884f4c4c9a4129140c07c7cc5e786a7a65374391cd2e37c988ff48e5d146c49d7034ddc7fa5eaecd0da564e1aee964c513a88ea74e44c205437aacbe0fb84351d44d291', // Замените на ваш токен
        },
        body: JSON.stringify({
          data: {
            JobId: selectedJob.id,
            Name: formData.name,
            Email: formData.email,
            Portfolio_Link: formData.portfolio,
            Status: 'Pending'
          }
        })
      });

      if (!response.ok) throw new Error('Failed to submit application');

      setNotification('Application submitted successfully!');
      setTimeout(() => {
        setNotification('');
      }, 5000);

      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        portfolio: ''
      });

      
      setJobs(jobs.filter(job => job.id !== selectedJob.id));

      // Уведомление родительского компонента
      if (onJobApplied) onJobApplied(selectedJob.id);
    } catch (error) {
      console.error('Error submitting application:', error);
      setNotification('Failed to submit application.');
    }
  };

  return (
    <div className="job-list">
      {notification && <div className="notification">{notification}</div>}
      {filteredJobs.length > 0 ? (
        filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="card-body">
              <h5 className="card-title">{job.attributes.JobPosition}</h5>
              <p className="card-text">{job.attributes.Description}</p>
              <button
                className="apply-button"
                onClick={() => handleApply(job)}
              >
                Apply
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}

      {isModalOpen && selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Apply for Job</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Portfolio URL:
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;