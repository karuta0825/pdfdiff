import React, { Component } from 'react';
import styles from '../../css/app.css';
import FileSelect from './FileSelect';
import makeDiff from '../../utils/MakeDiffImg';
import convert from '../../utils/Pdf2Img';
import { ls, mkdir, rmrf, rmdir } from '../../utils/FileOperation';
import {getDiffDir, getBeforeDir, getAfterDir, getImgDir} from '../../utils/Path';
import MakingModal from './MakingModal';
import Header from './Header';
import ErrorDialog from '../UtilComponents/ErrorDialog';
import { UNSELECTED } from '../constants';

export default class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled : true,
      err: null
    }
    this.setFilePath = this.setFilePath.bind(this);
    this.startDiff = this.startDiff.bind(this);
    this.closeError = this.closeError.bind(this);
  }

  setFilePath(path, place) {
    const {leftPath, rightPath, setPath} = this.props;
    const {isDisabled} = this.state;

    setPath(path,place);

    if (place === 'right' && leftPath !== UNSELECTED ) {
      this.setState({isDisabled:false});
    }

    if( place === 'left' && rightPath !== UNSELECTED ) {
      this.setState({isDisabled:false});
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

  async initDir() {
    await rmrf(getImgDir());
    await mkdir(getImgDir());
    await mkdir(getDiffDir());
  }

  async makeImgs() {

    const {leftPath, rightPath} = this.props;

    if ( !this.canConvertImg(leftPath) || !this.canConvertImg(rightPath) )  {
      throw new Error('選択ファイルの拡張子が正しくありません。pdfを選択してください')
    }

    await convert(leftPath, getBeforeDir());
    await convert(rightPath, getAfterDir());

  }

  async startDiff() {

    const {history} = this.props;

    try {

      await this.initDir();
      await this.makeImgs();
      const before = await ls(getBeforeDir());
      const after = await ls(getAfterDir());
      const len = (before.length - after.length > 0) ? after.length : before.length

      for ( let i=0; i < len; i += 1) {
        await makeDiff(
          getBeforeDir() + '/' + before[i],
          getAfterDir() + '/' + after[i],
          getDiffDir() + '/' + before[i]
        )
      }

      history.push('/result');

    } catch(e) {
      this.setState({isDisabled:true, err:e})
    }

  }

  closeError() {
    this.setState({err:null})
  }

  render(){
    const {leftPath, rightPath} = this.props;
    const {err, isDisabled} = this.state;
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