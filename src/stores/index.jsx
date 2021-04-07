import { createStore } from 'redux';
import Cookies from 'js-cookie';
import { COOKIE_TOKEN, COOKIE_ID } from '../config/config';
import { LOGIN, LOGOUT, GET_USER, UPDATE } from './actions'


const initialUserData = {
  id: Cookies.get(COOKIE_ID) || null,
  email: null,
  firstname: null,
  lastname: null,
  role: null,
  isLogged: Boolean(Cookies.get(COOKIE_TOKEN))
}

const userReducer = (state = initialUserData, payload) => {
  const { type, data, token } = payload;

  switch (type) {
    case GET_USER:
      if (!data.data || !data.data.id) {
        throw new Error('Data for login must not be empty.');
      }
      return {
        id: parseInt(data.data.id),
        role: data.data.attributes.role,
        firstname: data.data.attributes.firstname,
        lastname: data.data.attributes.lastname,
        email: data.data.attributes.email,
        isLogged: true
      }
    case LOGIN:
      if (!data || !data.id) {
        throw new Error('Data for login must not be empty.');
      }
      if (!token) {
        throw new Error('Missing token.');
      }
      Cookies.set(COOKIE_TOKEN, token);
      Cookies.set(COOKIE_ID, data.id);
      return {
        id: parseInt(data.id),
        role: data.attributes.role,
        firstname: data.attributes.firstname,
        lastname: data.attributes.lastname,
        email: data.attributes.email,
        isLogged: true
      };
      case UPDATE:
      if (!data || !data.id) {
        throw new Error('Data for login must not be empty.');
      }
      return {
        id: parseInt(data.id),
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        isLogged: true
      };
    case LOGOUT:
      Cookies.remove(COOKIE_TOKEN);
      Cookies.remove(COOKIE_ID);
      return {
        id: null,
        role: null,
        firstname: null,
        lastname: null,
        email: null,
        isLogged: false
      };
    default:
      return state;
  }
}

export default createStore(userReducer);