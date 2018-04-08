import React, { Component } from 'react';
import styles from '../../css/app.css';

export default function ({title, className, imgSrc}) {
  // キャッシュ画像を使用させない
  const src = imgSrc ? imgSrc + '?' + new Date().getTime() : '';
  return (
    <div className={'imgView' + ' ' + className}>
      <div className='imgView__title'>{title}</div>
      <img className='imgView__img' src={src}/>
    </div>
  );
}