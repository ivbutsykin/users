import React from 'react';
import Container from '@material-ui/core/Container';
import UsersList from './UsersList/UsersList';
import CreateUserForm from './CreateUserForm/CreateUserForm';

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
        <UsersList users={this.state.users} />
        <CreateUserForm onUserCreate={this.handleUserCreate} />
      </Container>
    );
  }
}

export default App;
