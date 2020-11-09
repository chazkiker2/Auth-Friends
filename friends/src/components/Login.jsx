import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = props => {
	const [credentials, setCredentials] = useState({ username: "", password: "" });
	const history = useHistory();

	const login = (e) => {
		e.preventDefault();
		axiosWithAuth().post("http://localhost:5000/api/login", credentials)
			.then(res => {
				window.localStorage.setItem("token", res.data.payload);
				history.push("/friends");
			});
	}

	const handleChange = e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	}

	return (
		<div>
			<form onSubmit={login}>
				<input type="text" name="username" value={credentials.username} onChange={handleChange} />
				<input type="password" name="password" value={credentials.password} onChange={handleChange} />
				<button>Log In</button>
			</form>
		</div>
	)
}

export default Login;