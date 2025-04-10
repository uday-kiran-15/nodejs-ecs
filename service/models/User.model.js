// const { getDb } = require('../database/MongoDB');

// const collectionName = 'users';

// const createUser = async (user) => {
//   const db = getDb();
//   return await db.collection(collectionName).insertOne(user);
// };

// const getUsers = async () => {
//   const db = getDb();
//   return await db.collection(collectionName).find().toArray();
// };

// const getUserById = async (id) => {
//   const db = getDb();
//   return await db.collection(collectionName).findOne({ _id: id });
// };

// const updateUser = async (id, updates) => {
//   const db = getDb();
//   return await db.collection(collectionName).updateOne({ _id: id }, { $set: updates });
// };

// const deleteUser = async (id) => {
//   const db = getDb();
//   return await db.collection(collectionName).deleteOne({ _id: id });
// };

// module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
const { getDb } = require('../database/MongoDB');
const { ObjectId } = require('mongodb');

const collectionName = 'users';

const createUser = async (user) => {
  const db = getDb();
  const result = await db.collection(collectionName).insertOne({
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result.ops[0]; // Return the created user
};

const getUsers = async () => {
  const db = getDb();
  console.log('Fetching all users...',await db.collection(collectionName).find());
  
  return await db.collection(collectionName).find().toArray();
};

const getUserById = async (id) => {
  const db = getDb();
  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
};

const updateUser = async (id, updates) => {
  const db = getDb();
  const result = await db.collection(collectionName).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  return result;
};

const deleteUser = async (id) => {
  const db = getDb();
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
  return result;
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
