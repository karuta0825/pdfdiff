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

    this.setState({isExpandCompare:!isExpandCompare});

  }

  render() {
    const {diff,before,after} = this.props;
    const {isExpandDiff, isExpandCompare} = this.state;
    return (
      <div id="image-viewer">
        <div class="image-viewer--diff">
          <div class='image-viewer-expander'>
            <IconButton aria-label="ExpandLess" onClick={() => {this.toggleExpand('diff')}}>
              { isExpandDiff ? <ExpandLess /> : <ExpandMore /> }
            </IconButton>
          </div>
          <ImgView title='diff' imgSrc={diff} />
        </div>
        <div class="image-viewer--compare">
          <div class='image-viewer-expander'>
            <IconButton aria-label="ExpandLess" onClick={() => {this.toggleExpand('compare')}}>
              { isExpandCompare ? <ExpandLess /> : <ExpandMore /> }
            </IconButton>
          </div>
          <div class='image-viewer--compare-imgs'>
            <ImgView title='left' imgSrc={before}/>
            <ImgView title='right' imgSrc={after}/>
          </div>
        </div>
      </div>
    );
  }
}

