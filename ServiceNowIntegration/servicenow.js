// routes/servicenow.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// These should be in your .env
const SNOW_INSTANCE = process.env.SNOW_INSTANCE;
const SNOW_USER = process.env.SNOW_USER;
const SNOW_PASS = process.env.SNOW_PASS;
const SNOW_TABLE = 'incident';

const axiosSNOW = axios.create({
  baseURL: `${SNOW_INSTANCE}/api/now/table/${SNOW_TABLE}`,
  auth: { username: SNOW_USER, password: SNOW_PASS },
  headers: { 'Content-Type': 'application/json' }
});

// Create Incident (e.g., when user portfolio fails to sync)
router.post('/', async (req, res) => {
  const { short_description, description, urgency = '3' } = req.body;
  try {
    const { data } = await axiosSNOW.post('', { short_description, description, urgency });
    res.json(data.result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all TradeTracker incidents from ServiceNow
router.get('/', async (_, res) => {
  try {
    const { data } = await axiosSNOW.get('');
    res.json(data.result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const { data } = await axiosSNOW.put(`/${req.params.id}`, req.body);
    res.json(data.result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Patch (partial update)
router.patch('/:id', async (req, res) => {
  try {
    const { data } = await axiosSNOW.patch(`/${req.params.id}`, req.body);
    res.json(data.result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const { data } = await axiosSNOW.delete(`/${req.params.id}`);
    res.json({ message: "Deleted", result: data.result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
