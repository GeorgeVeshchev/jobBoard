import React, { useState, useEffect } from 'react';
import JobFilter from './JobFilter';
import JobList from './JobList';

const JobBoard = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [authToken] = useState('63bfc583647f5952118036f9aa1b4f1cafeb2307f17b2839520bd48e4b5f485220cc13551b40b9687b8e7c42d700b7124f437a80594a92b75450dabf58c98c0ed9fdb89dd2637030228aa34a1c497452c7be30b596963c9a1777c385157e95750b7456e65f4ff12c1225062a5ecac29423f5e6b949819da0399d3f3306decc0b'); // Замените на ваш токен

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:1336/api/joblists", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 63bfc583647f5952118036f9aa1b4f1cafeb2307f17b2839520bd48e4b5f485220cc13551b40b9687b8e7c42d700b7124f437a80594a92b75450dabf58c98c0ed9fdb89dd2637030228aa34a1c497452c7be30b596963c9a1777c385157e95750b7456e65f4ff12c1225062a5ecac29423f5e6b949819da0399d3f3306decc0b`,
          }
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        setTodos(data.data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [authToken]);

  const handleJobApplied = (jobId) => {
    setTodos(todos.filter(job => job.id !== jobId));
  };

  return (
    <div className="jobboard-container">
      <JobFilter setSearch={setSearch} />
      <JobList todos={todos} search={search} onJobApplied={handleJobApplied} />
    </div>
  );
};

export default JobBoard;
