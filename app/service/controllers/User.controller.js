const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../models/User.model');
// const { createLogger } = require('../utils/Logger.util');
const { createLogger } = require('../../shared/Logger.util');
// const logger = createLogger('UserController');

exports.createUser = async (req, res) => {
  const logger = createLogger('CreateUser');
  try {
    const user = req.body;
    const result = await createUser(user);
    logger.info('User created successfully', result);
    res.status(201).json(result);
  } catch (error) {
    logger.error('Error creating user', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getUsers = async (req, res) => {
    const logger = createLogger('GetUsers');
    try {
      const users = await getUsers();
      logger.info('Fetched users successfully', users);
      console.log(users,"users")
      return res.status(200).json(users);
    } catch (error) {
      logger.error('Error fetching users', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };
  

exports.getUserById = async (req, res) => {
    const logger = createLogger('GetUserById');
    try {
      console.log(req,"req");
      
      const userId = req.params.id;
      const user = await getUserById(userId);
      if (!user) {
        logger.warn(`No user found with ID: ${userId}`);
        return res.status(404).json({ error: 'User not found' });
      }
      logger.info(`Fetched user with ID: ${userId}`, user);
      res.status(200).json(user);
    } catch (error) {
      logger.error('Error fetching user by ID', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };
  

exports.updateUser = async (req, res) => {
  const logger = createLogger('UpdateUser');
  try {
    const userId = req.params.id;
    const updates = req.body;
    const result = await updateUser(userId, updates);
    if (result.modifiedCount === 0) {
      logger.warn(`No updates applied for user with ID: ${userId}`);
      return res.status(404).json({ error: 'User not found or no changes applied' });
    }
    logger.info(`Updated user with ID: ${userId}`, result);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error updating user', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
    const logger = createLogger('DeleteUser');
    try {
      const userId = req.params.id;
      const result = await deleteUser(userId);
      if (!result.deletedCount) {
        logger.warn(`No user found to delete with ID: ${userId}`);
        return res.status(404).json({ error: 'User not found' });
      }
      logger.info(`Deleted user with ID: ${userId}`, result);
      res.status(200).json(result);
    } catch (error) {
      logger.error('Error deleting user', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };
  
