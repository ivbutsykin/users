import ListItem from '@material-ui/core/ListItem';

function UsersListItem(props) {
  return (
    <ListItem>
      {props.email}, {props.name}, {props.gender}
    </ListItem>
  );
}

export default UsersListItem;
