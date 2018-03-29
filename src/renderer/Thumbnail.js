import React from 'react';
import styles from '../css/app.css';

export default function Thumbnail({imgSrc, index, onClick}) {
  return (
    <li className="thumbnail" onClick={onClick}>
      <img className="thumbnail__img" src={imgSrc} />
      <div className="thumbnail__index">{index}</div>
    </li>
  );
}