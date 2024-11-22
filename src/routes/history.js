const express = require('express');
const db = require('../utils/db');

const router = express.Router();

// Tambahkan History
router.post('/history', async (req, res) => {
  const data = req.body;
  data.createdAt = new Date().toISOString();
  data.updatedAt = new Date().toISOString();
  try {
    const docRef = await db.collection('History').add(data);
    res.status(201).json({ message: 'History added successfully', id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil Semua History
router.get('/history', async (req, res) => {
  try {
    const snapshot = await db.collection('History').get();
    const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil History Berdasarkan ID
router.get('/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection('History').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'History not found' });
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Perbarui History
router.put('/history/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  data.updatedAt = new Date().toISOString();
  try {
    await db.collection('History').doc(id).update(data);
    res.status(200).json({ message: 'History updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hapus History
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('History').doc(id).delete();
    res.status(200).json({ message: 'History deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
