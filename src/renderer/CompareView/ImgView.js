import React, { Component } from 'react';
import styles from '../../css/app.css';

export default function ({title, imgSrc, history}) {
  return (
    <div className={'imgView' + ' ' + title}>
      <div className='imgView__title'>{title}</div>
      <img className='imgView__img' src={imgSrc}/>
      <button className='imgView__btn' onClick={ () => {console.log(history); history.push('/') }}>Button</button>
    </div>
  );
}