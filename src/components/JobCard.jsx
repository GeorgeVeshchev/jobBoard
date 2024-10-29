import React from 'react';


const JobCard = ({ job }) => {
  const link = `/apply?jobid=${job.id}`;

  return (
    <div className="job-card card mb-3">
      <div className="card-body">
        <h5 className="card-title">{job.attributes.JobPosition}</h5>
        <p className="card-text">
          <strong>Location:</strong> {job.attributes.Location}<br />
          <strong>Status:</strong> {job.attributes.JobStatus}<br />
          <strong>Agency:</strong> {job.attributes.Agency}
        </p>
        <a href={link} className="btn btn-primary">Apply Now</a>
      </div>
    </div>
  );
};

export default JobCard;
