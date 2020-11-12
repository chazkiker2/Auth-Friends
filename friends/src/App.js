import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import { useLogin } from "./contexts/LoginContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import Friend from "./components/Friend";
import AddFriendForm from "./components/AddFriendForm";
import styled from "styled-components";

const AppContainer = styled.div`
	min-height: 100vh;
	max-width: 100vw;
	background-color: ${pr => pr.theme.honeydew};
`;

const App = (props) => {
	const { logout, isTokenSet } = useLogin();

	return (
			<AppContainer className="App">
				<Header logout={logout} isTokenSet={isTokenSet} />
				<Switch>
					<Route exact path="/">
						<Redirect to="/login" />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<PrivateRoute path="/friends/:id" component={Friend} />
					<PrivateRoute path="/friends" component={FriendsList} />
					<PrivateRoute path="/add-friend" component={AddFriendForm} />
				</Switch>
			</AppContainer>

	);
}

export default App;
