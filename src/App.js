import React from 'react';
import Container from '@material-ui/core/Container';
import UsersList from './UsersList/UsersList';
import CreateUserForm from './CreateUserForm/CreateUserForm';
import UserCard from './UserCard/UserCard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.getUsersList();
  }

  getUsersList = async () => {
    const response = await fetch('http://localhost:8080/users');
    const responseJson = await response.json();
    const data = await responseJson;
    this.setState({ users: data });
  };

  handleUserCreate = fields => {
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    }).then(() => this.getUsersList());
  };

  render() {
    return (
      <Container maxWidth="sm">
        <Router>
          <Switch>
            <Route exact path={'/'}>
              <UsersList users={this.state.users} />
              <CreateUserForm onUserCreate={this.handleUserCreate} />
            </Route>

            {this.state.users.map(user => (
              <Route path={`/users/${user.id}`} key={user.id}>
                <UserCard
                  email={user.email}
                  name={user.name}
                  gender={user.gender}
                  id={user.id}
                />
              </Route>
            ))}
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
