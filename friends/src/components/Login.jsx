import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import theme from "styled-theming";

const red = "#E63946";
const honeydew = "#F1FAEE";
const powderblue = "#A8DADC";
const celadonblue = "#458B9D";
const prussianblue = "#1D3557";

const loginStyles = theme("mode", {
	light: css`
		background-color: ${powderblue};
	`,
	dark: css`
		background-color: darkslategray;
	`,
});

const buttonStyles = theme("mode", {
	light: css`
			cursor: pointer;
			background-color: ${honeydew};
			color: ${prussianblue};
			transition: all 0.4s ease;
			&:hover {
				cursor: pointer;
				background-color: ${celadonblue};
				color: ${honeydew};
				transition: all 0.4s ease;
			}
		`,
	dark: css`
			background-color: black;
			color: ${honeydew};
			transition: all 0.4s ease;
			&:hover {
				cursor: pointer;
				background-color: ${celadonblue};
				transition: all 0.4s ease;
			}
	`,
});

const SLogin = styled.div`
	${loginStyles};
	margin: 3rem auto;
	height: 120px;
	border: 0;
	border-radius: 50px;
	width: 80%;

	/* background-color: ${pr => pr.theme.powderBlue}; */
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