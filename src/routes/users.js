const express = require('express');
const db = require('../utils/db');

const router = express.Router();

// Tambahkan User
router.post('/users', async (req, res) => {
  const data = req.body;
  data.createdAt = new Date().toISOString();
  data.updatedAt = new Date().toISOString();
  try {
    const docRef = await db.collection('Users').add(data);
    res.status(201).json({ message: 'User added successfully', id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil Semua User
router.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection('Users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil User Berdasarkan ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection('Users').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Perbarui User
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  data.updatedAt = new Date().toISOString();
  try {
    await db.collection('Users').doc(id).update(data);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hapus User
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('Users').doc(id).delete();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
