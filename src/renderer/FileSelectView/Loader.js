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
    const {leftPath, rightPath, setPath} = this.props;

    setPath(path,place);

    if (place === 'right' && leftPath !== '' ) {
      this.setState({isDisabled:false});
    }

    if( place === 'left' && rightPath !== '' ) {
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

      await this.makeImgs();
      const before = await ls(getBeforeDir());
      const after = await ls(getAfterDir());
      const len = (before.length - after.length > 0) ? after.length : before.length

      for ( var i=0; i < len; i += 1) {
        await makeDiff(
          getBeforeDir() + '/' + before[i],
          getAfterDir() + '/' + after[i],
          getDiffDir() + '/' + before[i]
        )
      }

      history.push('/memo');

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