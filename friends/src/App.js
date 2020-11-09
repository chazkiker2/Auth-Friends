import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
import { axiosWithAuth } from "./utils/axiosWithAuth";
import PrivateRoute from "./components/PrivateRoute";

import './App.css';

import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import Friend from "./components/Friend";

function App() {
	const logout = () => {
		axiosWithAuth().post("http://localhost:5000/api/logout")
		window.localStorage.removeItem("token");
	}

	return (
		<Router>
			<div className="App">
				<header>
					<nav>
						<Link to="/login">Login</Link>
						<Link to="/friends">FriendsList Page</Link>
					</nav>
					<button onClick={logout}>Logout</button>
				</header>
				<Switch>
					<Route exact path="/">
						<Redirect to="/login" />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<PrivateRoute path="/friends/:id" component={Friend} />
					<PrivateRoute path="/friends" component={FriendsList} />
				</Switch>
			</div>

		</Router>
	);
}

export default App;
