import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

class UserCard extends React.Component {
  state = {
    user: {},
    anchorEl: null,
    isLoaded: false,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    const response = await fetch(
      `http://localhost:8080/users/${this.props.match.params.id}`
    );
    const responseJson = await response.json();
    const data = await responseJson;
    this.setState({
      user: data,
      isLoaded: true,
    });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickDelete = () => {
    fetch(`http://localhost:8080/users/${this.props.match.params.id}`, {
      method: 'DELETE',
    }).then(() => this.props.onGetUsersList());
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Card>
          <CardHeader
            avatar={<Avatar>{this.state.user.email[0].toUpperCase()}</Avatar>}
            action={
              <>
                <IconButton onClick={this.handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={this.state.anchorEl}
                  open={open}
                  onClose={this.handleClose}
                >
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <MenuItem onClick={this.handleClickDelete}>Delete</MenuItem>
                  </Link>
                </Menu>
              </>
            }
            title={this.state.user.email}
          />
          <CardContent>
            <Typography>Name: {this.state.user.name}</Typography>
            <Typography>Gender: {this.state.user.gender}</Typography>
            <Typography>ID: {this.state.user.id}</Typography>
          </CardContent>
          <CardActions>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              <Button
                variant="contained"
                color="default"
                size="small"
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </Link>
          </CardActions>
        </Card>
      );
    }
  }
}

export default UserCard;
