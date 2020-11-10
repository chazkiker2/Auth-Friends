import React, { useState } from "react";
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

const SLogin = styled.div`
	${formStyles};
	border: 0;
	width: 80%;
	height: 10rem;
	margin: 3rem auto;
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

const AddFriendForm = () => {
	const [input, setInput] = useState({ name: "", email: "", age: "" });

	const handleChange = (evt) => {
		setInput({
			...input,
			[evt.target.name]: evt.target.value
		})
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axiosWithAuth().post("http://localhost:5000/api/friends", input);
	}


	return (
		<SLogin>
			<h1>New Friend!</h1>
			<form onSubmit={handleSubmit}>
				<div className="input-container">
					<label htmlFor="name">Name:
					<input name="name" id="name" type="text" value={input.name} onChange={handleChange} />
					</label>
					<label htmlFor="email">Email:
					<input type="email" id="email" name="email" value={input.email} onChange={handleChange} />
					</label>
					<label htmlFor="age">Age:
					<input type="number" id="age" name="age" value={input.age} onChange={handleChange} />
					</label>
				</div>
				<button>Add</button>
			</form>
		</SLogin>
	);
}

export default AddFriendForm;