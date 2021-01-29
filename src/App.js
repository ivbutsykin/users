import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import UsersList from './UsersList/UsersList';
import CreateUserForm from './CreateUserForm/CreateUserForm';
import UserCard from './UserCard/UserCard';
import AlertSnackbar from './AlertSnackbar/AlertSnackbar';

class App extends React.Component {
  state = {
    users: [],
    serverStatus: {
      loading: false,
      showNotifcation: false,
      notificationMessage: '',
    },
  };

  componentDidMount() {
    this.handleGetUsersList();
  }

  handleGetUsersList = async () => {
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
    }).then(() => this.handleGetUsersList());
  };

  handleServerStatusChange = (
    loading,
    showNotifcation,
    notificationMessage
  ) => {
    this.setState({
      serverStatus: {
        loading: loading,
        showNotifcation: showNotifcation,
        notificationMessage: notificationMessage,
      },
    });
  };

  render() {
    return (
      <Container maxWidth="sm">
        <Router>
          <Switch>
            <Route exact path={'/'}>
              <UsersList users={this.state.users} />
              <CreateUserForm
                onUserCreate={this.handleUserCreate}
                onServerStatusChange={this.handleServerStatusChange}
                users={this.state.users}
              />
            </Route>

            <Route
              path={`/users/:id`}
              render={props => (
                <UserCard
                  users={this.state.users}
                  onGetUsersList={this.handleGetUsersList}
                  onServerStatusChange={this.handleServerStatusChange}
                  {...props}
                />
              )}
            />
          </Switch>
          <AlertSnackbar
            serverStatus={this.state.serverStatus}
            onServerStatusChange={this.handleServerStatusChange}
          />
        </Router>
      </Container>
    );
  }
}

export default App;
