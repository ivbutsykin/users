import React from 'react';
import List from '@material-ui/core/List';
import UsersListItem from './UsersListItem/UsersListItem';

class UsersList extends React.Component {
  render() {
    return (
      <List>
        <UsersListItem />
      </List>
    );
  }
}

export default UsersList;
