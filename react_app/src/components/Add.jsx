import React, { useState ,useContext} from 'react';
import axios from 'axios';
// import './Add.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import {DomainContext } from '../App';


const Add= () => {
    const { authenticated } = useAuth(); 
    const [jobName, setJobName] = useState('');
    const [description, setDescription] = useState('');
    const [avgSal, setAvgSal] = useState(0);
    const [timing, setTiming] = useState('');
    const [workingDays, setWorkingDays] = useState('');
    const [loc, setLoc] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const url = useContext(DomainContext);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSuccess(false);
      setError('');
      try {
        const response = await axios.post(`${url}/api/job/`, {
          jobName,
          description,
          avgSal,
          timing,
          workingDays,
          loc
        });
        setLoading(false);
        setSuccess(true);
      } catch (error) {
        setLoading(false);
        setError('An error occurred while adding the job.');
        console.error(error);
      }
    };
  
    return (
      <div className="container">
        {authenticated ? (
          <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-header">Add Job</h2>
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">Job added successfully!</div>}
            <div className="form-group">
              <label htmlFor="jobName" className="form-label">Job Name:</label>
              <input
                type="text"
                id="jobName"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="avgSal" className="form-label">Average Salary:</label>
              <input
                type="number"
                id="avgSal"
                value={avgSal}
                onChange={(e) => setAvgSal(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="timing" className="form-label">Timing:</label>
              <input
                type="text"
                id="timing"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="workingDays" className="form-label">Working Days:</label>
              <input
                type="text"
                id="workingDays"
                value={workingDays}
                onChange={(e) => setWorkingDays(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="loc" className="form-label">Location:</label>
              <input
                type="text"
                id="loc"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                required
              />
            </div>
            <button type="submit" className="form-btn" disabled={loading}>
              {loading ? 'Adding...' : 'Add Job'}
            </button>
          </form>
        ) : (
          <div className="login-message">
            <p>Please login to add a job</p>
            <button className="profile-button" onClick={() => navigate('/login')}>Login</button>
          </div>
        )}
      </div>
    );
  };
  
  export default Add;