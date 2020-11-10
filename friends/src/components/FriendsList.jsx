import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "styled-theming";
import PropTypes from 'prop-types';
import { createClickerStyles, createBackgroundStyles, colorSelection } from "../theme/theme";
const { red, honeydew, powderblue, celadonblue, prussianblue } = colorSelection;

const addNewFriendStyles = theme("mode", {
	light: createClickerStyles(celadonblue, honeydew, honeydew, celadonblue),
	dark: createClickerStyles(celadonblue, honeydew, "#222", powderblue),
});

const linkStyles = theme("mode", {
	light: createClickerStyles(celadonblue, honeydew, honeydew, celadonblue),
	dark: createClickerStyles(celadonblue, honeydew, honeydew, celadonblue),
});

const listStyles = theme("mode", createBackgroundStyles(powderblue, prussianblue, "darkslategray", honeydew));

const ListContainer = styled.div`
	${listStyles};
	display: flex;
	width: 90%;
	margin: 2rem auto;
	border-radius: 50px;
	flex-flow: column nowrap;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	border: 0;
	h1 {
		font-size: 2rem;
		margin: 10px 0;
	}
	#add-friend {
		${addNewFriendStyles};
		display: inline-block;
		width: 15rem;
		text-align: center;
		margin: 1rem;
		padding: 1rem;
		white-space: nowrap;
		text-decoration: none;
		font-size: 1.2rem;
		font-weight: 600;
		}
`;

const Gallery = styled.div`
	margin: 10px 0;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;
	align-content: space-evenly;
`;

const friendStyles = theme("mode", createBackgroundStyles(prussianblue, honeydew, "black", honeydew));

const SFriend = styled.div`
	${friendStyles};
	display: flex;
	flex-flow: column nowrap;
	border-radius: 10px;
	width: 260px;
	height: 120px;
	margin: 15px;
	justify-content: space-evenly;
	align-items: center;
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
			${linkStyles};
			border: 0;
			height: 32px;
			&:hover {
				transition: all 0.4s ease;
			}
			transition: all 0.4s ease;
		}
	}
`;
const buttonStyles = theme.variants("mode", "variant", {
	default: {
		light: createClickerStyles(honeydew, prussianblue, prussianblue, honeydew),
		dark: createClickerStyles("darkslategray", honeydew, honeydew, "darkslategray"),
	},
	warning: {
		light: createClickerStyles(honeydew, prussianblue, red, honeydew),
		dark: createClickerStyles("darkslategray", honeydew, red, honeydew),
	}
})

const Button = styled.button`
	${buttonStyles};
	display: inline-block;
	width: 10rem;
	height: 20px;
	font-size: 1rem;
	text-transform: uppercase;
	text-align: center;
	/* margin: 1rem; */
	padding: 1rem;
	white-space: nowrap;
	border: 0;
`;

Button.propTypes = {
	variant: PropTypes.oneOf(["default", "warning"]),
}
Button.defaultProps = {
	variant: "default",
}

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
				<Button variant="warning" onClick={() => handleDelete(id)}>Delete</Button>
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
			<h1>Friends List</h1>
			<Link id="add-friend" to="/add-friend">Add New Friend</Link>
			<Gallery>
				{friends.length > 0
					? friends.map(friend => {
						return (
							<FriendCard key={friend.id} friend={friend} handleDelete={handleDelete} />
						)
					})
					: <h2>Loading...</h2>
				}
			</Gallery>
		</ListContainer>
	)
}

export default FriendsList;