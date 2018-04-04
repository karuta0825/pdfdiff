import React, { Component } from 'react';
import styles from '../../css/app.css';
import { ipcRenderer as ipc } from 'electron';
import fs from 'fs';
import FloatingButton from '../UtilComponents/FloatingButton';
import Typography from 'material-ui/Typography';

export default class FileSelect extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.onClick = this.onClick.bind(this);

    ipc.on('selected-file', (e,path,position) => {
      if ( position === this.props.position ) {
        this.props.setFilePath(path, this.props.position);
      }
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners('selected-file');
  }

  onDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    this.props.setFilePath(file.path, this.props.position);
  }

  onClick() {
    ipc.send('open-file-dialog', this.props.position);
  }

  render() {
    const {path} = this.props;
    return (
      <div className='file-select'>
        <div className='file-select__path'>
          <Typography variant="body2" color="inherit">
            {path}
          </Typography>
        </div>
        <div className="file-select__zone"
          onDragOver={ event => event.preventDefault() }
          onDrop={this.onDrop}
        >
          <Typography variant="body2" color="inherit">
            ドラッグ＆ドロップしてください
          </Typography>
        </div>
        <div className="file-select__btn">
          <FloatingButton onClick={this.onClick} size="mini" />
        </div>
      </div>
    )
  }
}