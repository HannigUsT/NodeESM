/* eslint-disable camelcase */
import { db } from '../config/database/database.js';

const findAllContracts = async () => {
  try {
    const contracts = await db('contract').select('*');
    return contracts;
  } catch (error) {
    console.error('Error finding contracts', error);
    throw error;
  }
};

const createContract = async (Contract) => {
  try {
    const [idContract] = await db('contract').returning('id').insert(Contract);
    return idContract;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

const findContractById = async (contractId) => {
  try {
    const contract = await db('contract').where('id', contractId).first();
    return contract;
  } catch (error) {
    console.error('Error finding contract:', error);
    throw error;
  }
};

const updateContract = async (contract) => {
  try {
    const contractUpdated = await db('contract')
      .where({
        client_id: contract.client_id
      })
      .update({
        ...contract
      });
    return contractUpdated;
  } catch (error) {
    console.error('Error updating contract:', error);
    throw error;
  }
};

const findAllContractsByClientId = async (clientId) => {
  try {
    const contracts = await db('contract').where('client_id', clientId);
    return contracts;
  } catch (error) {
    console.error('Error finding contracts:', error);
    throw error;
  }
};

export {
  findAllContracts,
  createContract,
  findContractById,
  updateContract,
  findAllContractsByClientId
};
