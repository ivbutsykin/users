import React from 'react';
import List from '@material-ui/core/List';
import UsersListItem from './UsersListItem/UsersListItem';
import Divider from '@material-ui/core/Divider';

function UsersList(props) {
  return (
    <List>
      {props.users.map(user => (
        <React.Fragment key={user.id}>
          <UsersListItem
            email={user.email}
            name={user.name}
            gender={user.gender}
          />
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default UsersList;
