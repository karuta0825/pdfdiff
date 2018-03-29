import React from 'react';
import styles from '../../css/app.css';

export default function ({title, imgSrc}) {
  return (
    <div className='imgView'>
      <div className='imgView__title'>{title}</div>
      <img className='imgView__img' src={imgSrc}/>
      <button className='imgView__btn'>Button</button>
    </div>
  );
}