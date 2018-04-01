import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    width: '100%'
  }
});

function FullWidthButton(props) {
  const { classes, isDisabled } = props;
  if (isDisabled) {
    return (
      <Button variant="raised" disabled className={classes.button} onClick={props.onClick}>
        {props.name}
      </Button>
    );
  }
  return (
    <Button variant="raised"  className={classes.button} onClick={props.onClick}>
      {props.name}
    </Button>
  );
}

FullWidthButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthButton);