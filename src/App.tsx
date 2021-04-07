import { useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from './hooks/useFetch';
import { API_URL } from './config/config';
import { GET_USER, LOGOUT } from './stores/actions';

import Login from './pages/Login';
import NoMatch from './pages/NoMatch';


const App = (): JSX.Element => {
  const user:any = useSelector((state) => state);
  const { headers } = useFetch();
  const dispatch = useDispatch();

	const getUser = () => {
    fetch(`${API_URL}/api/users/${user.id}`,{ headers })
    .then((response) => response.json())
	  .then ((data) => {
      if (data.errors) {
        dispatch({ type: LOGOUT })
      } else {
        dispatch({ type: GET_USER, data });
      }
		})
    .catch((error) => dispatch({ type: LOGOUT }))
  }

  useEffect(() => {
    if (user.id) {
      getUser()
    } 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  return (
      <Router>
        <Switch>
          <Route path="/admin/login" exact>
            <Login/>
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </Router>      
  );
};

export default App;
