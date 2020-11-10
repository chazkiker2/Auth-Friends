import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "styled-theming";
import { createClickerStyles, createBackgroundStyles, colorSelection } from "../theme/theme";

const { honeydew, powderblue, celadonblue, prussianblue } = colorSelection;

const loginStyles = theme("mode", createBackgroundStyles(powderblue, prussianblue, "darkslategray", honeydew));

const buttonStyles = theme("mode", {
	light: createClickerStyles(honeydew, prussianblue, celadonblue, honeydew),
	dark: createClickerStyles("black", honeydew, celadonblue, honeydew),
});

const SLogin = styled.div`
	${loginStyles};
	margin: 3rem auto;
	height: 120px;
	border: 0;
	border-radius: 50px;
	width: 80%;
	form {
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-evenly;
		align-items: center;
		button {
			${buttonStyles};
			display: inline-block;
			border: 0;
			width: 120px;
			height: 25px;
			border-radius: 5px;
			font-size: 1.02rem;
			text-transform: uppercase;
		}
	}
`;

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
		<SLogin>
			<form onSubmit={login}>
				<label htmlFor="username">Username:
					<input type="text" id="username" name="username" value={credentials.username} onChange={handleChange} />
				</label>
				<label htmlFor="password">Password:
					<input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} />
				</label>
				<button>Log In</button>
			</form>
		</SLogin>
	)
}

export default Login;