import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SHeader = styled.header`
	background-color: ${pr => pr.theme.prussianBlue};
	color: ${pr => pr.theme.honeydew};
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: center;
	h1 {
		font-size: 3rem;
		font-weight: 600;
	}
	nav {
		Link, a {
			color: ${pr => pr.theme.honeydew};
			background-color: ${pr => pr.theme.celadonBlue};
			display: inline-block;
			width: 15rem;
			text-align: center;
			margin: 1rem;
			padding: 1rem;
			white-space: nowrap;
			text-decoration: none;
			&:hover {
				background-color: ${pr => pr.theme.honeydew};
				color: ${pr => pr.theme.celadonBlue};
				transition: all 0.5s ease-in-out;
			}
			transition: all 0.5s ease-in-out;
		}
	}
	button {
		display: inline-block;
		color: ${pr => pr.theme.honeydew};
		background-color: ${pr => pr.theme.celadonBlue};
		display: inline-block;
		width: 10rem;
		text-align: center;
		margin: 1rem;
		padding: 1rem;
		white-space: nowrap;
		border: 0;
		&:hover {
			background-color: ${pr => pr.theme.imperialRed};
			transition: all 0.5s ease-in-out;
		}
		transition: all 0.5s ease-in-out;
	}
`;

const Header = props => {
	const logout = () => {
		axiosWithAuth().post("http://localhost:5000/api/logout")
		window.localStorage.removeItem("token");
	}

	return (
		<SHeader>
			<h1>Friends</h1>
			<nav>
				<Link to="/login">Login</Link>
				<Link to="/friends">Friends List</Link>
				<Link to="/add-friend">Add New Friend</Link>
			</nav>
			<button onClick={logout}>Logout</button>
		</SHeader>
	)
}

export default Header;