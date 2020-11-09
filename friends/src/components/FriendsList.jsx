import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";

const FriendsList = props => {
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		axiosWithAuth().get("http://localhost:5000/api/friends")
			.then(res => {
				console.log(res);
				setFriends(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);


	return (
		<div>
			<h1>Friends</h1>
			{friends.length && friends.map(friend => {
				return (
					<React.Fragment key={friend.id}>
						<h3>{friend.name}</h3>
						<p>{friend.age} years old</p>
						<p>{friend.email}</p>
						<Link to={`/friends/${friend.id}`}>Edit</Link>
					</React.Fragment>
				)
			})}
		</div>
	)
}

export default FriendsList;