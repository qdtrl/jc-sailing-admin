import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { LOGIN } from '../../stores/actions';


const Login = () => {
	const user:any = useSelector((state) => state);
	const history = useHistory();
	const dispatch = useDispatch();
	
	useEffect(() => {
		if (user.isLogged) {
			history.push(`/admin/jc`);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	const { responseData, token, post } = useFetch();
	
	const handleLogin = (e:any) => {
		e.preventDefault();
		const logginUser = {
			user: {
				email: e.target.email.value,
				password: e.target.password.value
			}
		};

		post('/api/login', logginUser);
	}

	useEffect(() => {
		if (responseData) {
			const { data }:any = responseData
			dispatch({ type: LOGIN, data, token });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [responseData]);

	return(
		<section className="signup_form">
				<h2>Connexion</h2>
				<form onSubmit={handleLogin}>
					<input type="email" name="email" id="email"/>
					<input type="password" name="password" id="password"/>
					<button type="submit">Se connecter</button>
				</form>
		</section>
	)
}

export default Login;
