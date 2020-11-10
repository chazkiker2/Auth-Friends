import React from "react";
import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
// import { axiosWithAuth } from "./utils/axiosWithAuth";
import PrivateRoute from "./components/PrivateRoute";

import Header from "./components/Header";
import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import Friend from "./components/Friend";
import AddFriendForm from "./components/AddFriendForm";
import { theme } from "./theme/index";
import styled, { ThemeProvider } from "styled-components";

const AppContainer = styled.div`
	min-height: 100vh;
	max-width: 100vw;
	background-color: ${pr => pr.theme.honeydew};
`;

// <ThemeProvider theme={theme}>
// </ThemeProvider>
const App = (props) => {
	return (
		<Router>
			<AppContainer className="App">
				<Header />
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
		</Router>
	);
}

export default App;
