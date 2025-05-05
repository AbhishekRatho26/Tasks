import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendCandidate = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(`http://localhost:5000/api/candidate/${jobId}`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });

        if (response.data.success) {
          setApplicants(response.data.applicants);
        } else {
          setError("Failed to load applicants");
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError("Error fetching applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) return <p>Loading applicants...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Applicants for Job ID: {jobId}</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Fit Percentage</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.fitPercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendCandidate;
