import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import PrivateRoute from "./components/PrivateRoute";

import './App.css';

import Login from "./components/Login";
import Public from "./components/Public";
import Protected from "./components/Protected";

function App() {
	// const history = useHistory();
	// const login = useState()

	return (
		<Router>
			<div className="App">
				<ul>
					<li>
						<Link to="/public">Public Page</Link>
					</li>
					<li>
						<Link to="/protected">Protected Page</Link>
					</li>
				</ul>
				<Switch>
					<Route path="/public">
						<Public />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<PrivateRoute path="/protected" component={Protected} />
				</Switch>
			</div>

		</Router>
	);
}

export default App;
