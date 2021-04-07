import { createStore } from 'redux';
import Cookies from 'js-cookie';
import { COOKIE_TOKEN } from '../config/config';
import { LOGIN, LOGOUT, GET_USER } from './actions'


const initialUserData = {
  isLogged: Boolean(Cookies.get(COOKIE_TOKEN))
}

const userReducer = (state = initialUserData, payload) => {
  const { type, data, token } = payload;

  switch (type) {
    case GET_USER:
      if (!data.data) {
        throw new Error('Data for login must not be empty.');
      }
      return {
        isLogged: true
      }
    case LOGIN:
      if (!data) {
        throw new Error('Data for login must not be empty.');
      }
      if (!token) {
        throw new Error('Missing token.');
      }
      Cookies.set(COOKIE_TOKEN, token);
      return {
        isLogged: true
      };
    case LOGOUT:
      Cookies.remove(COOKIE_TOKEN);
      return {
        isLogged: false
      };
    default:
      return state;
  }
}

export default createStore(userReducer);