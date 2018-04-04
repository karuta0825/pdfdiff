import React, { Component } from 'react';
import styles from '../../css/app.css';
import path from 'path';
import ImgView from './ImgView';
import Expander from './Expander'

export default class ImageViewer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isExpandDiff : true,
      isExpandCompare : true
    }
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand(position) {

    const {isExpandDiff, isExpandCompare} = this.state;

    if (position === 'diff') {
      this.setState({isExpandDiff:!isExpandDiff})
    }
    else {
      this.setState({isExpandCompare:!isExpandCompare});
    }

  }

  getImageViewerDiffClass() {
    const {isExpandDiff, isExpandCompare} = this.state;

    if ( isExpandDiff === true && isExpandCompare === true ) {
      return 'image-viewer--diff';
    }

    if( isExpandDiff === false && isExpandCompare === true ) {
      return 'image-viewer--diff--FT';
    }

    if ( isExpandDiff === true && isExpandCompare === false ) {
      return 'image-viewer--diff--TF';
    }

    if( isExpandDiff === false && isExpandCompare === false ) {
      return 'image-viewer--diff--FF';
    }

  }

  getImgViewDiffClass() {
    const {isExpandDiff, isExpandCompare} = this.state;

    if ( isExpandDiff === true && isExpandCompare === true ) {
      return 'imageView diff'
    }

    if( isExpandDiff === false && isExpandCompare === true ) {
      return 'imageView diff--FT'
    }

    if ( isExpandDiff === true && isExpandCompare === false ) {
      return 'imageView diff--TF'
    }

    if( isExpandDiff === false && isExpandCompare === false ) {
      return 'imageView diff--FF'
    }

  }

  getImageViewerCompareClass() {
    const {isExpandDiff, isExpandCompare} = this.state;

    if ( isExpandDiff === true && isExpandCompare === true ) {
      return 'image-viewer--compare';
    }

    if( isExpandDiff === false && isExpandCompare === true ) {
      return 'image-viewer--compare--FT';
    }

    if ( isExpandDiff === true && isExpandCompare === false ) {
      return 'image-viewer--compare--TF';
    }

    if( isExpandDiff === false && isExpandCompare === false ) {
      return 'image-viewer--compare--FF';
    }

  }

  getImageViewerCompareImgsClass() {
    const {isExpandDiff, isExpandCompare} = this.state;

    if ( isExpandDiff === true && isExpandCompare === true ) {
      return 'image-viewer--compare-imgs';
    }

    if( isExpandDiff === false && isExpandCompare === true ) {
      return 'image-viewer--compare-imgs--FT';
    }

    if ( isExpandDiff === true && isExpandCompare === false ) {
      return 'image-viewer--compare-imgs--TF';
    }

    if( isExpandDiff === false && isExpandCompare === false ) {
      return 'image-viewer--compare-imgs--FF';
    }

  }

  render() {
    const {diff,before,after,leftPath,rightPath} = this.props;
    const {isExpandDiff, isExpandCompare} = this.state;
    return (
      <div id="image-viewer">
        <div class={this.getImageViewerDiffClass()}>
          <Expander isExpand={isExpandDiff} onClick={this.toggleExpand} position={'diff'} />
          <ImgView title='diff' imgSrc={diff} className={this.getImgViewDiffClass()} />
        </div>
        <div class={this.getImageViewerCompareClass()}>
          <Expander isExpand={isExpandCompare} onClick={this.toggleExpand} position={'compare'} />
          <div class={this.getImageViewerCompareImgsClass()}>
            <ImgView title={leftPath} imgSrc={before} className='left' />
            <ImgView title={rightPath} imgSrc={after} className='right' />
          </div>
        </div>
      </div>
    );
  }
}

