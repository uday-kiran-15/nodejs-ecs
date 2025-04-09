const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/User.controller');

router.post('/users', createUser); // Create a new user
router.get('/users', getUsers); // Get all users
router.get('/users/:id', getUserById); // Get a single user by ID
router.put('/users/:id', updateUser); // Update a single user by ID
router.delete('/users/:id', deleteUser); // Delete a single user by ID

module.exports = router;
