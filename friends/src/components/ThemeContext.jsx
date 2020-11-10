import React, { useState, useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import mainTheme from "../theme/theme";
import { useDarkMode } from "../hooks/useDarkMode";
const { backgroundColor, textColor, buttonBackgroundColor, buttonTextColor } = mainTheme;

const ThemeToggleContext = React.createContext();
export const useTheme = () => useContext(ThemeToggleContext);

export const MyThemeProvider = ({ children }) => {
	const [themeState, setThemeState] = useDarkMode({
		mode: "light",
	});

	const Wrapper = styled.div`
		background-color: ${backgroundColor};
		color: ${textColor};
		/* buttonBackgroundColor: ${buttonBackgroundColor};
		buttonTextColor: ${buttonTextColor}; */
	`;

	const toggle = () => {
		const mode = (themeState.mode === "light" ? "dark" : "light");
		setThemeState({ mode: mode });
	};

	return (
		<ThemeToggleContext.Provider value={{ toggle: toggle }}>
			<ThemeProvider theme={{ mode: themeState.mode }}>
				<Wrapper>
					{children}
				</Wrapper>
			</ThemeProvider>
		</ThemeToggleContext.Provider>
	);

}

export default ThemeProvider;
