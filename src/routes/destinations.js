const express = require('express');
const db = require('../utils/db');

const router = express.Router();

// Tambahkan Destination
router.post('/destinations', async (req, res) => {
  const data = req.body;
  data.createdAt = new Date().toISOString();
  data.updatedAt = new Date().toISOString();
  try {
    const docRef = await db.collection('Destinations').add(data);
    res.status(201).json({ message: 'Destination added successfully', id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil Semua Destinations
router.get('/destinations', async (req, res) => {
  try {
    const snapshot = await db.collection('Destinations').get();
    const destinations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ destinations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil Destination Berdasarkan ID
router.get('/destinations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection('Destinations').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Perbarui Destination
router.put('/destinations/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  data.updatedAt = new Date().toISOString();
  try {
    await db.collection('Destinations').doc(id).update(data);
    res.status(200).json({ message: 'Destination updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hapus Destination
router.delete('/destinations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('Destinations').doc(id).delete();
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
