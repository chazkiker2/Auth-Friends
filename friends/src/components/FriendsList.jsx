import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListContainer = styled.div`
	display: flex;
	width: 90%;
	margin: 2rem auto;
	background-color: ${pr => pr.theme.powderBlue};
	border-radius: 50px;
	flex-flow: column nowrap;
	justify-content: space-evenly;
	text-align: center;
	border: 0;
	/* padding: 2rem; */
	/* border: 1px solid black; */
	h1 {
			font-size: 2rem;
			margin: 10px 0;
	}
`;

const Gallery = styled.div`
	margin: 10px 0;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;
	align-content: space-evenly;
`;

const SFriend = styled.div`
	display: flex;
	flex-flow: column nowrap;
	border-radius: 10px;
	width: 260px;
	height: 120px;
	margin: 15px;
	/* padding: 20px; */
	justify-content: space-evenly;
	align-items: center;
	color: ${pr => pr.theme.honeydew};
	background-color: ${pr => pr.theme.prussianBlue};
	div.friend-details {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-evenly;
		align-items: center;
		h3 {
			font-size: 1.3rem;
			font-weight: 500;
		}
	}
	div.friend-nav {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		justify-content: space-evenly;
		align-items: center;
		Link, a, button {
			display: inline-flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			width: 100px;
			height: 20px;
			border: 0;
			padding: 1px auto;
			font-size: 1rem;
			line-height: 1;
			text-decoration: none;
			text-transform: uppercase;
			font-weight: 600;
		}
		Link, a {
			background-color: ${pr => pr.theme.celadonBlue};
			color: ${pr => pr.theme.honeydew};
			&:hover {
				background-color: ${pr => pr.theme.honeydew};
				color: ${pr => pr.theme.celadonBlue};
				transition: all 0.4s ease;
			}
			transition: all 0.4s ease;
		}
		button {
			background-color: ${pr => pr.theme.honeydew};
			color: ${pr => pr.theme.prussianBlue};
			&:hover {
				cursor: pointer;
				background-color: ${pr => pr.theme.imperialRed};
				color: ${pr => pr.theme.honeydew};
				transition: all 0.4s ease;
			}
			transition: all 0.4s ease;
		}
	}
`;

const FriendCard = props => {
	const { friend, handleDelete } = props;
	const { name, age, email, id } = friend;
	return (
		<SFriend>
			<div className="friend-details">
				<h3>{name}</h3>
				<p>{age} years old</p>
				<p>{email}</p>
			</div>
			<div className="friend-nav">
				<Link to={`/friends/${id}`}>Edit</Link>
				<button onClick={() => handleDelete(id)}>Delete</button>
			</div>
		</SFriend>
	)
}

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
	const handleDelete = (fId) => {
		axiosWithAuth().delete(`http://localhost:5000/api/friends/${fId}`)
			.then(res => {
				setFriends(res.data);
			});
	}

	return (
		<ListContainer>
			{/* <div className="header">
			</div> */}
			<h1>Friends List</h1>
			<Gallery>
				{friends.length && friends.map(friend => {
					return (
						<FriendCard key={friend.id} friend={friend} handleDelete={handleDelete} />
					)
				})}
			</Gallery>
		</ListContainer>
	)
}

export default FriendsList;