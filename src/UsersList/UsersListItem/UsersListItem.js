import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function UsersListItem(props) {
  return (
    <ListItem>
      <ListItemText
        primary={props.email}
        secondary={
          <>
            {props.name}, {props.gender}
          </>
        }
      />
    </ListItem>
  );
}

export default UsersListItem;
