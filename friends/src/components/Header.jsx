import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import styled, { css } from "styled-components";
import theme from "styled-theming";
import PropTypes from 'prop-types';

const red = "#E63946";
const honeydew = "#F1FAEE";
const powderblue = "#A8DADC";
const celadonblue = "#458B9D";
const prussianblue = "#1D3557";

const headerStyles = theme("mode", {
	light: css`
		background-color: ${prussianblue};
		color: ${honeydew};
	`,
	dark: css``,
})

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

const SHeader = styled.header`
	${headerStyles};
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	h1 {
		margin: 1rem;
		font-size: 3rem;
		font-weight: 600;
	}
	nav {
		Link, a {
			${linkStyles};
			display: inline-block;
			width: 15rem;
			text-align: center;
			margin: 1rem;
			padding: 1rem;
			white-space: nowrap;
			text-decoration: none;
		}
	}
`;

const Button = styled.button`
	${buttonStyles};
	display: inline-block;
	width: 10rem;
	font-size: 1rem;
	text-transform: uppercase;
	text-align: center;
	margin: 1rem;
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

const Header = props => {
	const themeToggle = useTheme();

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
			</nav>
			<nav>
				<Button variant="warning" onClick={logout}>Logout</Button>
				<Button onClick={() => themeToggle.toggle()}>Toggle Mode!</Button>
			</nav>
		</SHeader>
	)
}

export default Header;