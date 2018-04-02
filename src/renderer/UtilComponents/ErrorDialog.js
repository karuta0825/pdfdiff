import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class ErrorDialog extends React.Component {
  render() {
    const {isOpen, message, closeError} = this.props
    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={closeError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="alert-dialog-title">
            {"エラー"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeError} color="primary">
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ErrorDialog;