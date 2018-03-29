import React, { Component } from 'react';
import styles from '../css/app.css';
import path from 'path';
import ImgView from './ImgView';


export default class ImageViewer extends Component {
  constructor(props){
    super(props);
    console.log( path.resolve('') );
  }

  render() {
    return (
      <div id="image-viewer">
        <div class="image-viewer__diff">
          <ImgView title='diff' imgSrc=''/>
        </div>
        <div class="image-viewer__compare">
          <ImgView title='left' imgSrc=''/>
          <ImgView title='right' imgSrc=''/>
        </div>
      </div>
    );
  }
}

