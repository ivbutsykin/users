import React from 'react';
import List from '@material-ui/core/List';
import UsersListItem from './UsersListItem/UsersListItem';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

function UsersList(props) {
  return (
    <List>
      {props.users.map((user, index) => (
        <Link
          to={`/users/${user.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
          key={user.id}
        >
          <UsersListItem
            email={user.email}
            name={user.name}
            gender={user.gender}
          />
          {index !== props.users.length - 1 && <Divider />}
        </Link>
      ))}
    </List>
  );
}

export default UsersList;
