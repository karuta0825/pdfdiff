import React from 'react';
import styles from '../../css/app.css';
import Thumbnail from './Thumbnail';
import List from 'material-ui/List';


export default function ThumbList({thumbnails, onClick}) {

  const list = thumbnails.map((item, index) => {
    return <Thumbnail imgSrc={item} index={index+1} onClick={ () => { onClick(index)}} />
  });

  return (
    <div id='thumbnails'>
      <List component="nav">
        {list}
      </List>
    </div>
  );

}