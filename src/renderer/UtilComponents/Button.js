import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes, color, isDisable, name} = props;
  if ( isDisable ) {
    return (
      <Button variant="raised" disable color={color} className={classes.button}>
        {name}
      </Button>
    );
  }
  return (
    <Button variant="raised" color={color} className={classes.button}>
      {name}
    </Button>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);