import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    width: '100%'
  }
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <Button variant="raised" className={classes.button} onClick={props.onClick}>
      {props.name}
    </Button>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);