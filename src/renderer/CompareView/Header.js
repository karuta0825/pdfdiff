import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {
  const { classes, backLoadView } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.backButton} color="inherit" aria-label="back" onClick={backLoadView}>
            <ArrowBack />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            比較結果
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
