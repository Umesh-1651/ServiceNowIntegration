import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceNowIssueForm = () => {
  const [form, setForm] = useState({ short_description: '', description: '', urgency: '3' });
  const [incidents, setIncidents] = useState([]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/servicenow', form);
    fetchIncidents();
  };

  const fetchIncidents = async () => {
    const { data } = await axios.get('/servicenow');
    setIncidents(data);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Log a TradeTracker Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="short_description" onChange={handleChange} placeholder="Short Description" className="border p-2 w-full" />
        <textarea name="description" onChange={handleChange} placeholder="Full Description" className="border p-2 w-full" />
        <select name="urgency" onChange={handleChange} className="border p-2 w-full">
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit Incident</button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-medium">All Logged Issues</h3>
        <ul className="mt-2 space-y-2">
          {incidents.map(i => (
            <li key={i.sys_id} className="border p-2">{i.short_description} - Urgency {i.urgency}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceNowIssueForm;
