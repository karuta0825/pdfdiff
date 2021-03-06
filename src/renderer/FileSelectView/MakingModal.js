import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Circular from '../UtilComponents/Circular';
import FullWidthButton from '../UtilComponents/FullWidthButton';

const styles = {
  wrapper : {
    width:'100%',
    margin:'0 20px'
  }
}

class MakingModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open : false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  async handleClickOpen() {
    this.setState({ open: true });
    await this.props.startDiff();
    this.setState({open:false});
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <FullWidthButton onClick={this.handleClickOpen} name='比較' isDisabled={this.props.isDisabled}/>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="alert-dialog-title">
            差分イメージ作成中
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Circular />
              pdfのページ数が多いと処理に時間がかかります.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MakingModal;