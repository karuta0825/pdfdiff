import React, { Component } from 'react';
import styles from '../css/app.css';
import ThumbList from './ThumbList';
import ImageViewer from './ImageViewer';
import path from 'path';

const diffPath = path.resolve('') + '\\images\\';

export default class OverLook extends Component {
  constructor(props){
    super(props);
    this.state = {
      thumbnails : ['output_1.png','output_2.png']
    }
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {

  }

  onClick() {

  }

  render() {
    const {thumbnails} = this.state;
    const list = thumbnails.map( item => {
      return diffPath + item;
    })
    return (
      <div id="overlook">
        <ThumbList thumbnails={list} onClick={this.onClick}/>
        <ImageViewer />
      </div>
    );
  }
}

