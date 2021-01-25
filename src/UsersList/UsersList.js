import React from 'react';
import List from '@material-ui/core/List';
import UsersListItem from './UsersListItem/UsersListItem';

function UsersList(props) {
  return (
    <List>
      {props.users.map(user => (
        <UsersListItem
          key={user.id}
          email={user.email}
          name={user.name}
          gender={user.gender}
        />
      ))}
    </List>
  );
}

export default UsersList;
