import React, { Component } from 'react';
import styles from '../../css/app.css';
import path from 'path';
import ImgView from './ImgView';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

export default class ImageViewer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isExpandDiff : true,
      isExpandCompare : true
    }
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
          <div class='image-viewer-expander'>
            <IconButton aria-label="ExpandLess" onClick={() => {this.toggleExpand('diff')}}>
              { isExpandDiff ? <ExpandLess /> : <ExpandMore /> }
            </IconButton>
          </div>
          <ImgView title='diff' imgSrc={diff} className={this.getImgViewDiffClass()} />
        </div>
        <div class={this.getImageViewerCompareClass()}>
          <div class='image-viewer-expander'>
            <IconButton aria-label="ExpandLess" onClick={() => {this.toggleExpand('compare')}}>
              { isExpandCompare ? <ExpandLess /> : <ExpandMore /> }
            </IconButton>
          </div>
          <div class={this.getImageViewerCompareImgsClass()}>
            <ImgView title={leftPath} imgSrc={before} className='left' />
            <ImgView title={rightPath} imgSrc={after} className='right' />
          </div>
        </div>
      </div>
    );
  }
}

