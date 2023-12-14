import {
  getClientByCpfCnpj,
  postClient,
  putClient,
  getClientByEmail
} from '../controller/client.js';

export default (Router) => {
  Router.post('/client', postClient);
  Router.put('/client', putClient);
  Router.post('/client/getByEmail', getClientByEmail);
  Router.get('/client/:cpf_cnpj', getClientByCpfCnpj);
};
