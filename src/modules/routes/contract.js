/* eslint-disable camelcase */
import {
  putContracts,
  getContracts,
  postContracts,
  getAllContractsByClientId,
  getContractsById
} from '../controller/contract.js';

export default (Router) => {
  Router.post('/contract', postContracts);
  Router.put('/contract', putContracts);
  Router.get('/contract/', getContracts);
  Router.get('/contract/contractById/:id', getContractsById);
  Router.get(
    '/contract/allContratosByClientId/:id',
    getAllContractsByClientId
  );
};
