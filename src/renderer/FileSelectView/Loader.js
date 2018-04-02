import React, { Component } from 'react';
import styles from '../../css/app.css';
import FileSelect from './FileSelect';
import makeDiff from '../../utils/MakeDiffImg';
import convert from '../../utils/Pdf2Img';
import {ls} from '../../utils/FileOperation';
import {getDiffDir, getBeforeDir, getAfterDir} from '../../utils/Path';
import MakingModal from './MakingModal';
import Header from './Header';
import ErrorDialog from '../UtilComponents/ErrorDialog';

const unselected = '未選択';

export default class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftPath : unselected,
      rightPath : unselected,
      isDisabled : true,
      err: null
    }
    this.setFilePath = this.setFilePath.bind(this);
    this.startDiff = this.startDiff.bind(this);
    this.closeError = this.closeError.bind(this);
  }

  setFilePath(path, place) {
    const {leftPath, rightPath, isDisabled} = this.state;

    if ( place === 'right') {
      if ( leftPath !== unselected ) {
        this.setState({leftPath:leftPath, rightPath:path, isDisabled:false, err:null})
      }
      else {
        this.setState({leftPath:leftPath, rightPath:path, isDisabled:true, err:null})
      }
    }

    if ( place === 'left') {
      if (rightPath !== unselected) {
        this.setState({leftPath:path, rightPath:rightPath, isDisabled:false, err:null})
      }
      else {
        this.setState({leftPath:path, rightPath:rightPath, isDisabled:true, err:null})
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
      throw new Error('pdfを選択してください')
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

      history.push('/memo');

    }catch(e) {
      this.setState({isDisabled:true, err:e})
    }

  }

  closeError() {
    this.setState({err:null})
  }

  render(){
    const {leftPath, rightPath, err } = this.state;
    return (
      <div id="load" onDragOver={e => e.preventDefault()} onDrop={e => e.preventDefault()}>
        <Header />
        <div id='file-selects'>
          <FileSelect path={leftPath} setFilePath={this.setFilePath} position='left'/>
          <FileSelect path={rightPath} setFilePath={this.setFilePath} position='right'/>
        </div>
        <div id='compare-action'>
          <MakingModal startDiff={this.startDiff} isDisabled={this.state.isDisabled}/>
        </div>
        <ErrorDialog isOpen={ (err) ? true : false } message={ err && err.message || '' } closeError={this.closeError}/>
      </div>
    );
  }
}