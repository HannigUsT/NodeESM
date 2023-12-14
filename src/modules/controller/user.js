// Importa funções do módulo de persistência
import {
  createUser, findUserByEmail, updateUser
} from '../persistency/user.js';

import { isFieldInvalidOrEmpty } from '../../utils/index.js';

const postUser = async (req, res) => {
  try {
    const user = { ...req.body };
    const email = user.email;
    const emailExists = await findUserByEmail(email);
    if (emailExists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User already exists.' });
    }
    if (
      isFieldInvalidOrEmpty(user.name, 'string') ||
      isFieldInvalidOrEmpty(user.email, 'string') ||
      isFieldInvalidOrEmpty(user.password, 'string') ||
      isFieldInvalidOrEmpty(user.profile, 'number')
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or unfilled fields.'
      });
    }
    const created = await createUser(user);
    if (!created) {
      return res.status(400).json({
        status: 'error',
        message: 'Unable to create user.'
      });
    } else {
      return res
        .status(200)
        .json({ status: 'success', message: 'User created successfully.' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'A server error has occurred.' });
  }
};

const putUser = async (req, res) => {
  try {
    const user = { ...req.body };
    const emailExists = await findUserByEmail(user.email);
    if (!emailExists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User does not exist.' });
    }
    if (
      isFieldInvalidOrEmpty(user.name, 'string') ||
      isFieldInvalidOrEmpty(user.email, 'string') ||
      isFieldInvalidOrEmpty(user.password, 'string') ||
      isFieldInvalidOrEmpty(user.profile, 'number')
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or unfilled fields.'
      });
    }
    const updated = updateUser(user);
    if (!updated) {
      return res.status(400).json({
        status: 'error',
        message: 'Error updating user.'
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'User updated successfully!'
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'A server error has occurred.' });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (isFieldInvalidOrEmpty(email, 'string')) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid or unfilled fields.' });
    }
    const emailExists = await findUserByEmail(email);
    if (!emailExists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User not found.' });
    }
    return res.status(200).json({ status: 'success', usuario: emailExists });
  } catch (error) {
    return res.status(500).json({ error: 'A server error has occurred.' });
  }
};

export { postUser, putUser, getUserByEmail };
