import { useState } from "react";

export const useLocalToken = () => {
	const checkIsTokenSet = () => {
		try {
			const tok = window.localStorage.getItem("token");
			return tok ? true : false;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	const [isTokenSet, setIsTokenSet] = useState(checkIsTokenSet());
	const [storedToken, setStoredToken] = useState(() => {
		try {
			const tok = window.localStorage.getItem("token");
			if (tok) {
				setIsTokenSet(true);
				return JSON.parse(tok);
			} else {
				setIsTokenSet(false);
				return -1;
			}
		} catch (err) {
			console.log(err);
			setIsTokenSet(false);
			return -1;
		}
	})

	const setToken = (tokenValue) => {
		try {
			const tokenToStore = tokenValue instanceof Function ? tokenValue(storedToken) : tokenValue;
			setStoredToken(tokenToStore);
			window.localStorage.setItem("token", JSON.stringify(tokenToStore));
			setIsTokenSet(true);
		} catch (err) {
			setIsTokenSet(false);
			console.log(err);
		}
	}

	const removeToken = () => {
		try {
			window.localStorage.removeItem("token");
			setIsTokenSet(false);
		} catch (err) {
			console.log(err);
		}
	}

	return [storedToken, setToken, removeToken, isTokenSet];
}