import React, { Component } from 'react';
import styles from '../../css/app.css';
import ThumbList from './ThumbList';
import ImageViewer from './ImageViewer';
import {ls} from '../../utils/FileOperation';
import {getDiffDir, getBeforeDir, getAfterDir} from '../../utils/Path';

export default class OverLook extends Component {
  constructor(props){
    super(props);
    this.state = {
      thumbnails : [],
      targetSrc : ''
    }
    this.setImageSrc = this.setImageSrc.bind(this);
  }

  componentWillMount() {
    ls( getDiffDir() )
    .then( list => {
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
          diff={ targetSrc && getDiffDir() + '/' + targetSrc || ''}
          before={ targetSrc && getBeforeDir() + '/' + targetSrc || ''}
          after={ targetSrc && getAfterDir() + '/' + targetSrc || ''}
          history={this.props.history}
        />
      </div>
    );
  }
}

