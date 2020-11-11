import React, { createContext, useContext } from "react";
import { useLocalToken } from "../hooks/useLocalToken";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

export const LoginContext = createContext();
export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
	const history = useHistory();
	const [token, setToken, removeToken, isTokenSet] = useLocalToken();

	const pushToFriends = () => {
		history.push("/friends");
	}

	const login = (credentials) => {
		axiosWithAuth().post("login", credentials)
			.then(res => {
				setToken(res.data.payload)
				pushToFriends();
			});
	}

	const logout = () => {
		axiosWithAuth().post("logout");
		removeToken();
	}

	return (
		<LoginContext.Provider value={{ token, setToken, removeToken, isTokenSet, login, logout, pushToFriends, }}>
			{children}
		</LoginContext.Provider>
	);
}