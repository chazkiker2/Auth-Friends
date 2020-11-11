import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";
import theme from "styled-theming";
import { useLogin } from "../contexts/LoginContext";
import { createClickerStyles, createBackgroundStyles, colorSelection } from "../theme/theme";
const { honeydew, powderblue, celadonblue, prussianblue } = colorSelection;

const buttonStyles = theme("mode",
	{
		light: createClickerStyles(honeydew, prussianblue, celadonblue, honeydew),
		dark: createClickerStyles("#222", honeydew, celadonblue, honeydew),
	}
)

const formStyles = theme("mode",
	createBackgroundStyles(powderblue, prussianblue, "darkslategray", honeydew)
);

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
			margin: 0 1rem;
			border-radius: 5px;
			font-size: 1.02rem;
			text-transform: uppercase;
	}
	}
`;

const Friend = props => {
	const mId = props.match.params.id;
	const { pushToFriends } = useLogin();
	const [data, setData] = useState({
		name: "",
		email: "",
		age: "",
	});
	useEffect(() => {
		let unmounted = false;
		axiosWithAuth().get(`friends/${mId}`)
			.then(res => {
				if (!unmounted) {
					setData(res.data)
				}
			});
		return () => {
			unmounted = true;
		}
	}, [mId])

	const handleChange = (evt) => {
		setData({
			...data,
			[evt.target.name]: evt.target.value
		})
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axiosWithAuth().put(`friends/${mId}`, data)
			.then(res => setData(res));
		pushToFriends();
	}

	const handleCancel = (evt) => {
		evt.preventDefault();
		pushToFriends();
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
				<div>
					<button>Update</button>
					<button onClick={handleCancel}>Cancel</button>
				</div>
			</form>
		</SForm>
	)
}

export default Friend;