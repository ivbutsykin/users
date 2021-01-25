import React from 'react';
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
        <Grid item xs={12} sm={4}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel>Email</InputLabel>
                <Input onChange={e => this.handleChange(e, 'email')}></Input>
              </FormControl>
              <FormHelperText>Required</FormHelperText>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel>Name</InputLabel>
                <Input onChange={e => this.handleChange(e, 'name')}></Input>
              </FormControl>
              <FormHelperText>Required</FormHelperText>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={this.state.gender}
                  onChange={e => this.handleChange(e, 'gender')}
                >
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText>Required</FormHelperText>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={() => this.props.onUserCreate(this.state)}
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
