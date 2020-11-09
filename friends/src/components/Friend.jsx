import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const Friend = props => {
	const location = useLocation();
	const [status, setStatus] = useState("idle");
	const [matchId, setMatchId] = useState(Number(props.match.params.id));
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
		<form onSubmit={handleSubmit}>
			<input type="text" name="name" value={data.name} onChange={handleChange} />
			<input type="email" name="email" value={data.email} onChange={handleChange} />
			<input type="age" name="age" value={data.age} onChange={handleChange} />
			<button>Update</button>
		</form>
	)
}

export default Friend;