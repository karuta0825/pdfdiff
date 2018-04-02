import React, { Component } from 'react';
import styles from '../../css/app.css';

export default function ({title, className, imgSrc}) {
  return (
    <div className={'imgView' + ' ' + className}>
      <div className='imgView__title'>{title}</div>
      <img className='imgView__img' src={imgSrc}/>
    </div>
  );
}