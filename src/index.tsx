import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Reducer from './stores';
import App from './App';
import './index.scss';

ReactDOM.render(
  <Provider store={Reducer}>
    <App />
  </Provider> 
, document.getElementById('root'));

