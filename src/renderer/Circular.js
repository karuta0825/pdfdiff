import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const myStyles = {
  display:'flex',
  justifyContent:'center',
}

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div style={myStyles}>
      <CircularProgress className={classes.progress} size={70} />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);