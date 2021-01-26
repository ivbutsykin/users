import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function UserCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography component="h5" variant="h5">
          {props.email}
        </Typography>
        <Typography>Name: {props.name}</Typography>
        <Typography>Gender: {props.gender}</Typography>
        <Typography>ID: {props.id}</Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;
