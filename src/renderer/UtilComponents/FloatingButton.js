import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import FolderOpen from 'material-ui-icons/FolderOpen';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function FloatingActionButtons(props) {
  const { classes, onClick, size } = props;

  if (size === 'mini') {
    return (
      <Button variant="fab" mini color="primary" aria-label="folder_open" className={classes.button} onClick={onClick}>
        <FolderOpen />
      </Button>
    );
  }
  return (
    <Button variant="fab" color="primary" aria-label="folder_open" className={classes.button} onClick={onClick}>
      <FolderOpen />
    </Button>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);