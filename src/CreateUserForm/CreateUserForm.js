import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CreateUserForm extends React.Component {
  state = {
    email: '',
    name: '',
    gender: '',
  };

  handleChange = (e, stateType) => {
    this.setState({ [stateType]: e.target.value });
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            label="Email"
            onChange={e => this.handleChange(e, 'email')}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Name"
            onChange={e => this.handleChange(e, 'name')}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Gender"
            onChange={e => this.handleChange(e, 'gender')}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => this.props.onUserCreate(this.state)}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default CreateUserForm;
