import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import * as EmailValidator from 'email-validator';

class UserCard extends React.Component {
  state = {
    user: {},
    anchorEl: null,
    isLoaded: false,
    edit: false,
    errors: {
      email: false,
      name: false,
      gender: false,
    },
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

  handlePatchUser = fields => {
    fetch(`http://localhost:8080/users/${this.props.match.params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    }).then(() => this.props.onGetUsersList());
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = (e, stateType) => {
    this.setState(prevState => ({
      user: { ...prevState.user, [stateType]: e.target.value },
    }));
  };

  handleClickDelete = () => {
    fetch(`http://localhost:8080/users/${this.props.match.params.id}`, {
      method: 'DELETE',
    }).then(() => this.props.onGetUsersList());
  };

  handleClickEdit = () => {
    this.setState({ edit: true });
    this.handleClose();
  };

  handleClickSave = () => {
    if (
      this.validate(
        this.state.user.email,
        this.state.user.name,
        this.state.user.gender
      )
    ) {
      this.handlePatchUser(this.state.user);
      this.setState({
        edit: false,
      });
    }
  };

  handleClickCancel = () => {
    this.handleGetUser();
    this.setState({
      errors: {
        email: false,
        name: false,
        gender: false,
      },
      edit: false,
    });
  };

  validate = (email, name, gender) => {
    this.setState({
      errors: {
        email: false,
        name: false,
        gender: false,
      },
    });

    const currentUser = this.props.users.find(
      user => user.id === this.props.match.params.id
    );

    email =
      EmailValidator.validate(email) &&
      (currentUser.email === email ||
        !this.props.users.some(user => user.email === email));

    name = this.validateName(name);
    gender = this.validateGender(gender);

    if (!email || !name || !gender) {
      if (!email) {
        this.setState(prevState => ({
          errors: { ...prevState.errors, email: true },
        }));
      }

      if (!name) {
        this.setState(prevState => ({
          errors: { ...prevState.errors, name: true },
        }));
      }

      if (!gender) {
        this.setState(prevState => ({
          errors: { ...prevState.errors, gender: true },
        }));
      }
      return false;
    }
    return true;
  };

  validateName(name) {
    const re = /^[A-Za-z\s]+$/;
    return re.test(name);
  }

  validateGender(gender) {
    return gender ? true : false;
  }

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
                  <MenuItem onClick={this.handleClickEdit}>Edit</MenuItem>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <MenuItem onClick={this.handleClickDelete}>Delete</MenuItem>
                  </Link>
                </Menu>
              </>
            }
            title={`ID: ${this.state.user.id}`}
          />
          <CardContent>
            <Box m={1}>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                disabled={!this.state.edit}
                InputLabelProps={{
                  shrink: true,
                }}
                error={this.state.errors.email}
                value={this.state.user.email}
                onChange={e => this.handleChange(e, 'email')}
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                disabled={!this.state.edit}
                InputLabelProps={{
                  shrink: true,
                }}
                error={this.state.errors.name}
                value={this.state.user.name}
                onChange={e => this.handleChange(e, 'name')}
              />
            </Box>
            <Box m={1}>
              <FormControl disabled={!this.state.edit}>
                <InputLabel shrink>Gender</InputLabel>
                <Select
                  error={this.state.errors.gender}
                  value={this.state.user.gender}
                  onChange={e => this.handleChange(e, 'gender')}
                >
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
            {this.state.edit && (
              <>
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  startIcon={<CancelIcon />}
                  onClick={this.handleClickCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  startIcon={<SaveIcon />}
                  onClick={this.handleClickSave}
                >
                  Save
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      );
    }
  }
}

export default UserCard;
