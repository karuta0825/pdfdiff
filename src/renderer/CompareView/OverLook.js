import React, { Component } from 'react';
import styles from '../../css/app.css';
import ThumbList from './ThumbList';
import ImageViewer from './ImageViewer';
import {ls} from '../../utils/FileOperation';
import {getDiffDir, getBeforeDir, getAfterDir, getRootHtmlPath} from '../../utils/Path';
import Header from './Header';

const closeStyles = {
  wrapper : {
    height : '100%'
  }
}

export default class OverLook extends Component {
  constructor(props){
    super(props);
    this.state = {
      thumbnails : [],
      targetSrc : ''
    }
    this.setImageSrc = this.setImageSrc.bind(this);
    this.backLoadView = this.backLoadView.bind(this);
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

  backLoadView() {
    const { history, clearPath } = this.props;
    clearPath();
    history.push(getRootHtmlPath());
  }

  render() {
    const {thumbnails, targetSrc} = this.state;
    const {leftPath, rightPath} = this.props;
    const list = thumbnails.map( item => {
      return getDiffDir() + '/' + item;
    });
    return (
      <div style={{height:'100%'}}>
        <Header backLoadView={this.backLoadView}/>
        <div id="overlook">
          <ThumbList thumbnails={list} onClick={this.setImageSrc}/>
          <ImageViewer
            diff={ targetSrc && getDiffDir() + '/' + targetSrc || ''}
            before={ targetSrc && getBeforeDir() + '/' + targetSrc || ''}
            after={ targetSrc && getAfterDir() + '/' + targetSrc || ''}
            leftPath={leftPath}
            rightPath={rightPath}
          />
        </div>
      </div>
    );
  }
}

