import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const SLogin = styled.div`
	border: 0;
	width: 80%;
	margin: 3rem auto;
	/* height: 120px; */
	height: 10rem;
	/* padding: 2rem; */
	border-radius: 50px;
	background-color: ${pr => pr.theme.powderBlue};
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-evenly;
	align-items: center;
	h1 {
		font-size: 1.5rem;
		font-weight: 600;
		/* padding: 1rem; */
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
			display: inline-block;
			border: 0;
			width: 120px;
			height: 25px;
			border-radius: 5px;
			font-size: 1.02rem;
			text-transform: uppercase;
			&:hover {
				cursor: pointer;
				background-color: ${pr => pr.theme.celadonBlue};
				color: ${pr => pr.theme.honeydew};
				transition: all 0.4s ease;
			}
			transition: all 0.4s ease;
		}
	}
`;

const AddFriendForm = props => {
	const [status, setStatus] = useState("idle");
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