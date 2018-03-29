import React, { Component } from 'react';
import styles from '../../css/app.css';
import FileSelect from './FileSelect';

export default class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftPath : '',
      rightPath : ''
    }
    this.setFilePath = this.setFilePath.bind(this);
    this.startDiff = this.startDiff.bind(this);
  }

  setFilePath(path, place) {
    const {leftPath, rightPath} = this.state;

    if ( place === 'right') {
      this.setState({leftPath:leftPath, rightPath:path})
    }

    if ( place === 'left') {
      this.setState({leftPath:path, rightPath:rightPath})
    }
  }

  startDiff() {
    const {history} = this.props;
    history.push('/memo');
  }

  render(){
    const {leftPath, rightPath} = this.state;
    return (
      <div id="load">
        <div id='file-selects'>
          <FileSelect path={leftPath} setFilePath={this.setFilePath} position='left'/>
          <FileSelect path={rightPath} setFilePath={this.setFilePath} position='right'/>
        </div>
        <button className="compare-btn" onClick={this.startDiff}>比較</button>
      </div>
    );
  }
}