import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const Login = props => {
	const [credentials, setCredentials] = useState({ username: "", password: "" });

	const login = (e) => {
		e.preventDefault();
		axiosWithAuth().post("http://localhost:5000/api/login", credentials)
			.then(res => {
				window.localStorage.setItem("token", res.data.token);
				props.history.push("/protected");
			}).catch(err => console.log(err));
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