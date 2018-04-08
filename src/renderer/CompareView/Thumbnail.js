import React from 'react';
import styles from '../../css/app.css';
import Typography from 'material-ui/Typography';
import { ListItem, ListItemText } from 'material-ui/List';

export default function Thumbnail({imgSrc, index, onClick}) {
  const src = imgSrc ? imgSrc + '?' + new Date().getTime() : '';
  return (
    <ListItem className="thumbnail" button onClick={onClick}>
      <div className="thumbnail__index">
        {index}
      </div>
      <img className="thumbnail__img" src={src} />
    </ListItem>
  );
}
