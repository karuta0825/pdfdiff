import React, { Component } from 'react';
import styles from '../../css/app.css';
import FileSelect from './FileSelect';
import makeDiff from '../../utils/MakeDiffImg';
import convert from '../../utils/Pdf2Img';
import {ls} from '../../utils/FileOperation';
import {getDiffDir, getBeforeDir, getAfterDir} from '../../utils/Path';
import Modal from '../Modal';
import Bar from '../Bar';

export default class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftPath : 'ファイル名',
      rightPath : 'ファイル名',
      isDisabled : true
    }
    this.setFilePath = this.setFilePath.bind(this);
    this.startDiff = this.startDiff.bind(this);
  }

  setFilePath(path, place) {
    const {leftPath, rightPath, isDisabled} = this.state;

    if ( place === 'right') {
      if ( leftPath !== 'ファイル名' ) {
        this.setState({leftPath:leftPath, rightPath:path, isDisabled:false})
      }
      else {
        this.setState({leftPath:leftPath, rightPath:path, isDisabled:true})
      }
    }

    if ( place === 'left') {
      if (rightPath !== 'ファイル名') {
        this.setState({leftPath:path, rightPath:rightPath, isDisabled:false})
      }
      else {
        this.setState({leftPath:path, rightPath:rightPath, isDisabled:true})
      }
    }

  }

  getExtension(path) {
    const pathAndExt = path.split(/\.(?=[^.]+$)/)
    return pathAndExt.length > 1 ? pathAndExt[1] : '';
  }

  canConvertImg(filePath) {
    const ext = this.getExtension(filePath);
    if ( ext !== 'pdf' ) {
      return false
    }
    return true;
  }

  async makeImgs() {

    const {leftPath, rightPath} = this.state;

    if ( !this.canConvertImg(leftPath) || !this.canConvertImg(rightPath) )  {
      throw new Error('ファイルが指定されていないか、拡張子が正しくありません。')
    }

    await convert(leftPath, getBeforeDir());
    await convert(rightPath, getAfterDir());

  }

  async startDiff() {

    const {history} = this.props;

    try {

      await this.makeImgs();
      const before = await ls(getBeforeDir());
      const after = await ls(getAfterDir());
      const len = (before.length - after.length > 0) ? before.length : after.length

      for ( var i=0; i < len; i += 1) {
        await makeDiff(
          getBeforeDir() + '/' + before[i],
          getAfterDir() + '/' + after[i],
          getDiffDir() + '/' + before[i]
        )
      }

    }catch(e) {
      throw e;
    }

    history.push('/memo');

  }

  render(){
    const {leftPath, rightPath} = this.state;
    return (
      <div id="load" onDragOver={e => e.preventDefault()} onDrop={e => e.preventDefault()}>
        <Bar />
        <div id='file-selects'>
          <FileSelect path={leftPath} setFilePath={this.setFilePath} position='left'/>
          <FileSelect path={rightPath} setFilePath={this.setFilePath} position='right'/>
        </div>
        <div id='compare-action'>
          <Modal startDiff={this.startDiff} isDisabled={this.state.isDisabled}/>
        </div>
      </div>
    );
  }
}