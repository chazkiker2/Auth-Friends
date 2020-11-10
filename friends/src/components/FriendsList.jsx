import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import theme from "styled-theming";
import PropTypes from 'prop-types';

const red = "#E63946";
const honeydew = "#F1FAEE";
const powderblue = "#A8DADC";
const celadonblue = "#458B9D";
const prussianblue = "#1D3557";

const addNewFriendStyles = theme("mode", {
	light: css`
					color: ${honeydew};
			background-color: ${celadonblue};
			&:hover {
				cursor: pointer;
				background-color: ${honeydew};
				color: ${celadonblue};
				transition: all 0.5s ease-in-out;
			}
			transition: all 0.5s ease-in-out;
	`,
	dark: css`
			color: ${honeydew};
			background-color: ${celadonblue};
			&:hover {
				cursor: pointer;
				background-color: #222;
				color: ${powderblue};
				transition: all 0.5s ease-in-out;
			}
			transition: all 0.5s ease-in-out;
	`,
});

const linkStyles = theme("mode", {
	light: css`
		color: ${honeydew};
		background-color: ${celadonblue};
		&:hover {
				background-color: ${honeydew};
				color: ${celadonblue};
				transition: all 0.5s ease-in-out;
			}
			transition: all 0.5s ease-in-out;
	`,
	dark: css`
		color: ${honeydew};
		background-color: ${celadonblue};
		&:hover {
				background-color: ${honeydew};
				color: ${celadonblue};
				transition: all 0.5s ease-in-out;
			}
			transition: all 0.5s ease-in-out;
	`,
});

const listStyles = theme("mode", {
	light: css`
	background-color: ${powderblue};
	`,
	dark: css`
		background-color: darkslategray;
	`,
})

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
	/* padding: 2rem; */
	/* border: 1px solid black; */
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

const friendStyles = theme("mode", {
	light: css`
		color: ${honeydew};
		background-color: ${prussianblue};	
	`,
	dark: css`
		background-color: black;
		color: ${honeydew};
	`,
})

const SFriend = styled.div`
	${friendStyles};
	display: flex;
	flex-flow: column nowrap;
	border-radius: 10px;
	width: 260px;
	height: 120px;
	margin: 15px;
	/* padding: 20px; */
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
			background-color: ${pr => pr.theme.celadonBlue};
			color: ${pr => pr.theme.honeydew};
			&:hover {
				background-color: ${pr => pr.theme.honeydew};
				color: ${pr => pr.theme.celadonBlue};
				transition: all 0.4s ease;
			}
			transition: all 0.4s ease;
		}
	}
`;
const buttonStyles = theme.variants("mode", "variant", {
	default: {
		light: css`
			background-color: ${honeydew};
			color: ${prussianblue};
			transition: all 0.4s ease;
			&:hover {
				cursor: pointer;
				background-color: ${prussianblue};
				color: ${honeydew};
				transition: all 0.4s ease;
			}
		`,
		dark: css`
			background-color: darkslategray;
			color: ${honeydew};
			transition: all 0.4s ease;
			&:hover {
				cursor: pointer;
				background-color: ${honeydew};
				color: darkslategray;
				transition: all 0.4s ease;
			}
		`,
	},
	warning: {
		light: css`
			background-color: ${honeydew};
			color: ${prussianblue};
			transition: all 0.4s ease;
			&:hover {
				cursor: pointer;
				background-color: ${red};
				color: ${honeydew};
				transition: all 0.4s ease;
			}
		`,
		dark: css`
			background-color: darkslategray;
			color: ${honeydew};
			transition: all 0.4s ease;
			&:hover {
				cursor: pointer;
				background-color: ${red};
				color: ${honeydew};
				transition: all 0.4s ease;
			}
		`,
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