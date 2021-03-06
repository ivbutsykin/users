import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import UsersListItem from './UsersListItem/UsersListItem';

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
