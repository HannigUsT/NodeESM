import {
  postUser,
  putUser,
  getUserByEmail
} from '../controller/user.js';

export default (Router) => {
  Router.post('/user', postUser);
  Router.put('/user', putUser);
  Router.get('/user/:email', getUserByEmail);
};
