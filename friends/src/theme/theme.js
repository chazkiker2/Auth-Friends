import { css } from "styled-components";
import theme from "styled-theming";

export const backgroundColor = theme('mode', {
	light: '#fafafa',
	dark: '#222'
});

export const textColor = theme('mode', {
	light: '#000',
	dark: '#fff'
});

export const buttonBackgroundColor = theme('mode', {
	light: '#222',
	dark: '#eee'
});

export const buttonTextColor = theme('mode', {
	light: '#eee',
	dark: '#222'
});

export const createClickerStyles = (background, color, backgroundHover, colorHover) => {
	const colors = {
		background,
		color,
		backgroundHover,
		colorHover,
	};

	return css`
		background-color: ${colors.background};
		color: ${colors.color};
		transition: all 0.4s ease;
		&:hover {
			cursor: pointer;
			background-color: ${colors.backgroundHover};
			color: ${colors.colorHover};
			transition: all 0.4s ease;
		}
	`;
}

export const createBackgroundStyles = (lightBackground, lightColor, darkBackground, darkColor) => {
	return {
		light: css`
			background-color: ${lightBackground};
			color: ${lightColor};
		`,
		dark: css`
			background-color: ${darkBackground};
			color: ${darkColor};
		`,
	}
}

const red = "#E63946";
const honeydew = "#F1FAEE";
const powderblue = "#A8DADC";
const celadonblue = "#458B9D";
const prussianblue = "#1D3557";
export const colorSelection = {
	red, honeydew, powderblue, celadonblue, prussianblue,
}

const mainTheme = {
	backgroundColor,
	textColor,
	buttonBackgroundColor,
	buttonTextColor,
	createClickerStyles,
	createBackgroundStyles,
	colorSelection,
}

export default mainTheme;