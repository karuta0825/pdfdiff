import React, { Component } from 'react';
import styles from '../../css/app.css';
import ThumbList from './ThumbList';
import ImageViewer from './ImageViewer';
import path from 'path';
import {ls} from '../../utils/FileOperation';
import {getDiffDir, getOS} from '../../utils/Path';

export default class OverLook extends Component {
  constructor(props){
    super(props);
    this.state = {
      thumbnails : [],
      targetSrc : ''
    }
    this.setImageSrc = this.setImageSrc.bind(this);
    console.log(getOS());
  }

  componentWillMount() {
    ls( getDiffDir() )
    .then( list => {
      debugger
      this.setState({thumbnails:list, targetSrc:list[0]});
     })
  }

  setImageSrc(i) {
    const {thumbnails,targetSrc} = this.state;
    this.setState({
      thumbnails:thumbnails, targetSrc: thumbnails[i]
    })
  }

  render() {
    const {thumbnails, targetSrc} = this.state;
    const list = thumbnails.map( item => {
      return getDiffDir() + '/' + item;
    })
    return (
      <div id="overlook">
        <ThumbList thumbnails={list} onClick={this.setImageSrc}/>
        <ImageViewer
          diff={ getDiffDir() + '/' + targetSrc}
          before={ getDiffDir() + '/' + targetSrc}
          after={ getDiffDir() + '/' + targetSrc} 
        />
      </div>
    );
  }
}

