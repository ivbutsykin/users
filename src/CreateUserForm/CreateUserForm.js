import React from 'react';
import * as EmailValidator from 'email-validator';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

class CreateUserForm extends React.Component {
  state = {
    fields: {
      email: '',
      name: '',
      gender: '',
    },
    errors: {
      email: false,
      name: false,
      gender: false,
    },
  };

  handleClick = () => {
    if (
      this.validate(
        this.state.fields.email,
        this.state.fields.name,
        this.state.fields.gender
      )
    ) {
      this.props.onServerStatusChange(true, true, 'Success!');
      this.props.onUserCreate(this.state.fields);
      this.setState({
        fields: {
          email: '',
          name: '',
          gender: '',
        },
      });
    } else {
      this.props.onServerStatusChange(false, true, 'Error!');
    }
  };

  handleChange = (e, stateType) => {
    this.setState(prevState => ({
      fields: { ...prevState.fields, [stateType]: e.target.value },
    }));
  };

  validate = (email, name, gender) => {
    this.setState({
      errors: {
        email: false,
        name: false,
        gender: false,
      },
    });

    email = this.validateEmail(email);
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

  validateEmail(email) {
    return (
      EmailValidator.validate(email) &&
      !this.props.users.some(user => user.email === email)
    );
  }

  validateName(name) {
    const re = /^[A-Za-z\s]+$/;
    return re.test(name);
  }

  validateGender(gender) {
    return gender ? true : false;
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel>Email</InputLabel>
                <Input
                  value={this.state.fields.email}
                  error={this.state.errors.email}
                  onChange={e => this.handleChange(e, 'email')}
                ></Input>
              </FormControl>
              <FormHelperText>user@example.com</FormHelperText>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel>Name</InputLabel>
                <Input
                  value={this.state.fields.name}
                  error={this.state.errors.name}
                  onChange={e => this.handleChange(e, 'name')}
                ></Input>
              </FormControl>
              <FormHelperText>Letters a-z, A-Z</FormHelperText>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  error={this.state.errors.gender}
                  value={this.state.fields.gender}
                  onChange={e => this.handleChange(e, 'gender')}
                >
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText>Male or Female</FormHelperText>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClick}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default CreateUserForm;
