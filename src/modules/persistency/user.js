import { db } from '../config/database/database.js';

const findUserByEmail = async (Email) => {
  try {
    const user = await db('user').where('email', Email).first();
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};

const createUser = async (User) => {
  try {
    const userId = await db('user').insert(User);
    return userId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const updateUser = async (User) => {
  try {
    const { email, name, password, profile } = User;
    const updatedUser = await db('user')
      .where({ email })
      .update({ name, password, profile });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export { createUser, findUserByEmail, updateUser };
