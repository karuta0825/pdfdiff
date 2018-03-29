import React, { Component } from 'react';
import styles from '../css/app.css';

export default function ReadFile({file, number, onClick}) {
  return (
    <div>
      <textarea readonly id='content' value={file}></textarea>
      <button onClick={onClick}>{number}</button>
    </div>
  );
}
