import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
		<form onSubmit={handleSubmit}>
			<input name="name" type="text" value={input.name} onChange={handleChange} />
			<input type="email" name="email" value={input.email} onChange={handleChange} />
			<input type="number" name="age" value={input.age} onChange={handleChange} />
			<button>Add</button>
		</form>
	);
}

export default AddFriendForm;