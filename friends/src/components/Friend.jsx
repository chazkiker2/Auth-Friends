import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";
import theme from "styled-theming";

import { createClickerStyles, createBackgroundStyles, colorSelection } from "../theme/theme";

const { honeydew, powderblue, celadonblue, prussianblue } = colorSelection;

const buttonStyles = theme("mode",
	{
		light: createClickerStyles(honeydew, prussianblue, celadonblue, honeydew),
		dark: createClickerStyles("#222", honeydew, celadonblue, honeydew),
	}
)

const formStyles = theme("mode", createBackgroundStyles(powderblue, prussianblue, "darkslategray", honeydew));

const SForm = styled.div`
	${formStyles};
	border: 0;
	width: 80%;
	margin: 3rem auto;
	height: 10rem;
	border-radius: 50px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-evenly;
	align-items: center;
	h1 {
		font-size: 1.5rem;
		font-weight: 600;
	}
	form {
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-evenly;
		align-items: center;
		div.input-container {
			width: 15%;
			min-width: 230px;
		label {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
		}
		}

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

const Friend = props => {
	// const location = useLocation();
	// const [status, setStatus] = useState("idle");
	const matchId = useState(Number(props.match.params.id));
	const [data, setData] = useState({});
	useEffect(() => {
		axiosWithAuth().get(`http://localhost:5000/api/friends/${matchId}`)
			.then(res => setData(res.data));
	}, [matchId])

	const handleChange = (evt) => {
		setData({
			...data,
			[evt.target.name]: evt.target.value
		})
	}

	const handleSubmit = (evt) => {
		axiosWithAuth().put(`http://localhost:5000/api/friends/${matchId}`, data)
			.then(res => setData(res));
	}

	return (
		<SForm>
			<h1>Edit Friend</h1>
			<form onSubmit={handleSubmit}>
				<div className="input-container">
					<label htmlFor="name">Name:
				<input type="text" name="name" value={data.name} onChange={handleChange} />
					</label>
					<label htmlFor="email"> Email:
				<input type="email" name="email" value={data.email} onChange={handleChange} />
					</label>
					<label htmlFor="age">Age:
				<input type="age" name="age" value={data.age} onChange={handleChange} />
					</label>
				</div>
				<button>Update</button>
			</form>
		</SForm>
	)
}

export default Friend;