import React from 'react';
import styles from '../css/app.css';
import Thumbnail from './Thumbnail';

export default function ThumbList({thumbnails, onClick}) {

  const list = thumbnails.map((item, index) => {
    return <Thumbnail imgSrc={item} index={index+1} onClick={onClick} />
  });

  return (
    <ul id='thumbnails'>
      {list}
    </ul>
  );

}