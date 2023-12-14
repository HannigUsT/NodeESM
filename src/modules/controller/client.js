/* eslint-disable camelcase */
import {
  createClient,
  findClientByEmail,
  findClientByCpfCnpj,
  updateClient
} from '../persistency/client.js';

import { isFieldInvalidOrEmpty } from '../../utils/index.js';

const getClientByCpfCnpj = async (req, res) => {
  try {
    const { cpf_cnpj } = req.params;
    if (isFieldInvalidOrEmpty(cpf_cnpj, 'string')) {
      return res.status(400).json({ error: 'Invalid or unfilled fields.' });
    }
    const cpfCnpjExists = await findClientByCpfCnpj(cpf_cnpj);
    if (!cpfCnpjExists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Client not found.' });
    }
    return res.status(200).json({ status: 'success', cliente: cpfCnpjExists });
  } catch (error) {
    return res.status(500).json({ error: 'A server error has occurred.' });
  }
};

const getClientByEmail = async (req, res) => {
  try {
    const email = req.body.email;
    if (isFieldInvalidOrEmpty(email, 'string')) {
      return res.status(400).json({ error: 'Invalid or unfilled fields.' });
    }
    const emailExists = await findClientByEmail(email);
    if (!emailExists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Client not found.' });
    }
    return res.status(200).json({ status: 'success', cliente: emailExists });
  } catch (error) {
    return res.status(500).json({ error: 'A server error has occurred.' });
  }
};

const postClient = async (req, res) => {
  try {
    const client = { ...req.body };
    const emailExists = await findClientByEmail(client.email);
    const cpfcnpjExists = await findClientByCpfCnpj(client.cpf_cnpj);
    if (emailExists || cpfcnpjExists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Client is already registered.' });
    }
    if (
      isFieldInvalidOrEmpty(client.name, 'string') ||
      isFieldInvalidOrEmpty(client.email, 'string') ||
      isFieldInvalidOrEmpty(client.cpf_cnpj, 'number') ||
      isFieldInvalidOrEmpty(client.address, 'number') ||
      isFieldInvalidOrEmpty(client.client_type_id, 'number') ||
      isFieldInvalidOrEmpty(client.status, 'string')
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or unfilled fields.'
      });
    }
    const created = await createClient(client);
    if (!created) {
      return res.status(400).json({
        status: 'error',
        message: 'Unable to create client.'
      });
    } else {
      return res
        .status(200)
        .json({ status: 'success', message: 'Client created successfully.' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'A server error has occurred.' });
  }
};

const putClient = async (req, res) => {
  try {
    const client = { ...req.body };
    const emailExists = await findClientByEmail(client.email);
    const cpfcnpjExists = await findClientByCpfCnpj(client.cpf_cnpj);
    if (!emailExists || !cpfcnpjExists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Client not found.' });
    }
    if (
      isFieldInvalidOrEmpty(client.name, 'string') ||
      isFieldInvalidOrEmpty(client.email, 'string') ||
      isFieldInvalidOrEmpty(client.cpf_cnpj, 'number') ||
      isFieldInvalidOrEmpty(client.address, 'number') ||
      isFieldInvalidOrEmpty(client.client_type_id, 'number') ||
      isFieldInvalidOrEmpty(client.status, 'string')
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or unfilled fields.'
      });
    }
    const updated = updateClient(client);
    if (!updated) {
      return res.status(400).json({
        status: 'error',
        message: 'Error updating client.'
      });
    }
    return res.status(200).json({
      status: 'sucess',
      message: 'Client updated successfully!'
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'A server error has occurred.' });
  }
};

export { getClientByCpfCnpj, postClient, putClient, getClientByEmail };
