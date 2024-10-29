import React from 'react';

const JobFilter = ({ setSearch }) => (
  <div className="filter">
    <h3>Filter Jobs</h3>
    <form>
      <div className="form-check">
        <input
          type="radio"
          id="allJobs"
          name="jobType"
          value=""
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="form-check-input"
        />
        <label htmlFor="allJobs" className="form-check-label">All Jobs</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="backend"
          name="jobType"
          value="Backend"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="form-check-input"
        />
        <label htmlFor="backend" className="form-check-label">Backend</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="partTime"
          name="jobType"
          value="Part Time"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="form-check-input"
        />
        <label htmlFor="partTime" className="form-check-label">Part Time</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="internship"
          name="jobType"
          value="Internship"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="form-check-input"
        />
        <label htmlFor="internship" className="form-check-label">Internship</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="freelance"
          name="jobType"
          value="Freelance"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="form-check-input"
        />
        <label htmlFor="freelance" className="form-check-label">Freelance</label>
      </div>
    </form>
  </div>
);

export default JobFilter;
