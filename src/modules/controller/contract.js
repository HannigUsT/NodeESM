/* eslint-disable camelcase */
import {
  findAllContracts,
  updateContract,
  findContractById,
  createContract,
  findAllContractsByClientId
} from '../persistency/contract.js';
import { findClientById } from '../persistency/client.js';
import { isFieldInvalidOrEmpty } from '../../utils/index.js';

const getContracts = async (req, res) => {
  try {
    const contracts = await findAllContracts();
    return res.status(200).json({ status: 'success', contracts });
  } catch (error) {
    return res.status(500).json({ error: 'A server error has occurred.' });
  }
};

const getContractsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Contract not found.'
      });
    }
    const contract = await findContractById(id);
    if (!contract) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Contract not found.' });
    }
    return res.status(200).json({ status: 'success', contract });
  } catch (error) {
    return res.status(500).json({ error: 'A server error has occurred.' });
  }
};

const postContracts = async (req, res) => {
  try {
    const contract = { ...req.body };
    const clientExists = await findClientById(contract.client_id);

    if (!clientExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Client does not exist.'
      });
    }
    if (
      isFieldInvalidOrEmpty(contract.description, 'string') ||
      isFieldInvalidOrEmpty(contract.start_date, 'string') ||
      isFieldInvalidOrEmpty(contract.payday, 'number') ||
      isFieldInvalidOrEmpty(contract.end_date, 'string') ||
      isFieldInvalidOrEmpty(contract.client_id, 'number') ||
      isFieldInvalidOrEmpty(contract.type_contract_id, 'number') ||
      isFieldInvalidOrEmpty(contract.value, 'number') ||
      isFieldInvalidOrEmpty(contract.payment_type, 'number')
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or unfilled fields.'
      });
    }
    const created = createContract(contract);
    if (!created) {
      return res.status(400).json({
        status: 'error',
        message: 'Error creating contract.'
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Contract created successfully!'
    });
  } catch (error) {
    return res.status(500).json({ error: 'A server error has occurred.' });
  }
};

const putContracts = async (req, res) => {
  try {
    const contract = { ...req.body };
    const clientExists = await findClientById(contract.id);
    if (!clientExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Contract does not exist or incorrect client.'
      });
    }
    if (
      isFieldInvalidOrEmpty(contract.description, 'string') ||
      isFieldInvalidOrEmpty(contract.start_date, 'string') ||
      isFieldInvalidOrEmpty(contract.payday, 'number') ||
      isFieldInvalidOrEmpty(contract.end_date, 'string') ||
      isFieldInvalidOrEmpty(contract.client_id, 'number') ||
      isFieldInvalidOrEmpty(contract.type_contract_id, 'number') ||
      isFieldInvalidOrEmpty(contract.value, 'number') ||
      isFieldInvalidOrEmpty(contract.payment_type, 'number')
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or unfilled fields.'
      });
    }
    const updated = updateContract(contract);
    if (!updated) {
      return res.status(400).json({
        status: 'error',
        message: 'Error updating contract.'
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Contract updated successfully!'
    });
  } catch (error) {
    return res.status(500).json({ error: 'A server error has occurred.' });
  }
};

const getAllContractsByClientId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isFieldInvalidOrEmpty(id, 'number')) {
      return res.status(400).json({ error: 'Invalid or unfilled fields.' });
    }
    const contracts = await findAllContractsByClientId(id);
    return res.status(200).json({ status: 'success', contracts });
  } catch (error) {
    return res.status(500).json({ error: 'A server error has occurred.' });
  }
};

export {
  getContracts,
  putContracts,
  postContracts,
  getAllContractsByClientId,
  getContractsById
};
