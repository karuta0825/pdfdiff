import React, { Component } from 'react';
import styles from '../../css/app.css';
import path from 'path';
import ImgView from './ImgView';


export default class ImageViewer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const {diff,before,after, history} = this.props;
    return (
      <div id="image-viewer">
        <div class="image-viewer__diff">
          <ImgView title='diff' imgSrc={diff} history={history}/>
        </div>
        <div class="image-viewer__compare">
          <ImgView title='left' imgSrc={before}/>
          <ImgView title='right' imgSrc={after}/>
        </div>
      </div>
    );
  }
}

