import React from 'react';
import Container from '@material-ui/core/Container';
import UsersList from './UsersList/UsersList';

class App extends React.Component {
  render() {
    return (
      <Container>
        <UsersList />
      </Container>
    );
  }
}

export default App;
