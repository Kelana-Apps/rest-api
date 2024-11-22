const express = require('express');
const db = require('../utils/db');

const router = express.Router();

// Tambahkan Recommendation
router.post('/recommendations', async (req, res) => {
  const data = req.body;
  data.createdAt = new Date().toISOString();
  data.updatedAt = new Date().toISOString();
  try {
    const docRef = await db.collection('Recommendations').add(data);
    res.status(201).json({ message: 'Recommendation added successfully', id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil Semua Recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const snapshot = await db.collection('Recommendations').get();
    const recommendations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil Recommendation Berdasarkan ID
router.get('/recommendations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection('Recommendations').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Perbarui Recommendation
router.put('/recommendations/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  data.updatedAt = new Date().toISOString();
  try {
    await db.collection('Recommendations').doc(id).update(data);
    res.status(200).json({ message: 'Recommendation updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hapus Recommendation
router.delete('/recommendations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('Recommendations').doc(id).delete();
    res.status(200).json({ message: 'Recommendation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
