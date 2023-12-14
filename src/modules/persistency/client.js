/* eslint-disable camelcase */
import { db } from '../config/database/database.js';

const findClientById = async (clientId) => {
  try {
    const client = await db('client').where('id', clientId).first();
    return client;
  } catch (error) {
    console.error('Error finding client:', error);
    throw error;
  }
};

const findClientByEmail = async (Email) => {
  try {
    const client = await db('client').where('email', Email).first();
    return client;
  } catch (error) {
    console.error('Error finding client:', error);
    throw error;
  }
};

const findClientByCpfCnpj = async (cpfCnpj) => {
  try {
    const client = await db('client').where('cpf_cnpj', cpfCnpj).first();
    return client;
  } catch (error) {
    console.error('Error finding client:', error);
    throw error;
  }
};

const createClient = async (Client) => {
  try {
    const [idCliente] = await db('client').returning('id').insert(Client);
    return idCliente;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

const updateClient = async (Client) => {
  try {
    const { cpf_cnpj, email, name, address, client_type_id } = Client;
    const clientUpdated = await db('client')
      .where({ cpf_cnpj, email })
      .update({ name, address, client_type_id });
    return clientUpdated;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

export {
  findClientById,
  findClientByEmail,
  findClientByCpfCnpj,
  createClient,
  updateClient
};
