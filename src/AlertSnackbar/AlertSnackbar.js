import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class AlertSnackbar extends React.Component {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.onServerStatusChange(this.props.serverStatus.loading, false, '');
  };

  render() {
    return (
      <Snackbar
        open={this.props.serverStatus.showNotifcation}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={this.handleClose}
          severity={this.props.serverStatus.loading ? 'success' : 'error'}
        >
          {this.props.serverStatus.notificationMessage}
        </MuiAlert>
      </Snackbar>
    );
  }
}

export default AlertSnackbar;
