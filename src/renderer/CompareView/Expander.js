import React from 'react';
import styles from '../../css/app.css';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

export default function Expander({isExpand, onClick, position}) {

  return (
    <div class='image-viewer-expander'>
      <IconButton aria-label="ExpandLess" onClick={() => {onClick(position)}}>
        { isExpand ? <ExpandLess /> : <ExpandMore /> }
      </IconButton>
    </div>
  );

}