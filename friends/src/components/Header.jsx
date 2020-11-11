//dependencies
import React from "react";
import { Link } from "react-router-dom";
//context
import { useTheme } from "./ThemeContext";
//styling dependencies
import styled from "styled-components";
import theme from "styled-theming";
import PropTypes from 'prop-types';
import { createClickerStyles, createBackgroundStyles, colorSelection } from "../theme/theme";
//styling
const { red, honeydew, celadonblue, prussianblue } = colorSelection;
const headerStyles = theme("mode",
	createBackgroundStyles(prussianblue, honeydew, "black", honeydew)
);
const linkStyles = theme("mode", {
	light: createClickerStyles(celadonblue, honeydew, honeydew, celadonblue),
	dark: createClickerStyles(celadonblue, honeydew, honeydew, celadonblue),
});
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

const Header = (props) => {
	const themeToggle = useTheme();

	return (
		<SHeader>
			<h1>Friends</h1>
			<nav>
				{
					props.isTokenSet
						?
						<>
							<Button variant="warning" onClick={props.logout}>Log out</Button>
						</>
						: <Link to="/login">LOG IN</Link>
				}
				<Button className="toggle-mode" onClick={() => themeToggle.toggle()}>Toggle Mode!</Button>
			</nav>
		</SHeader>
	)
}

export default Header;