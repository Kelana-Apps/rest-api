const express = require('express');
const db = require('../utils/db');

const router = express.Router();

// Tambahkan User
router.post('/users', async (req, res) => {
  const { UserId, email, name, preferences, budget } = req.body;

  // Validasi input
  if (!UserId || !email || !name || !preferences || !budget) {
    return res.status(400).json({
      error: 'All fields (UserId, email, name, preferences, budget) are required',
    });
  }

  // Tambahkan waktu
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // Format data baru
  const newUser = {
    UserId,
    email,
    name,
    preferences,
    budget,
    createdAt,
    updatedAt,
  };

  try {
    const docRef = await db.collection('Users').add(newUser);
    res.status(201).json({
      message: 'User added successfully',
      id: docRef.id,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil Semua User
router.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection('Users').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
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
  const { UserId, email, name, preferences, budget } = req.body;

  if (!UserId || !email || !name || !preferences || !budget) {
    return res.status(400).json({
      error: 'All fields (UserId, email, name, preferences, budget) are required',
    });
  }

  const updatedAt = new Date().toISOString();

  const updatedUser = {
    UserId,
    email,
    name,
    preferences,
    budget,
    updatedAt,
  };

  try {
    await db.collection('Users').doc(id).update(updatedUser);
    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
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
