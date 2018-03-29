import React, { Component } from 'react';
import styles from '../../css/app.css';
import { ipcRenderer as ipc } from 'electron';
import fs from 'fs';

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
        <div className='file-select__path'>{path}</div>
        <div className="file-select__zone"
          onDragOver={ event => event.preventDefault() }
          onDrop={this.onDrop}
        >
          ドラッグ＆ドロップしてください
        </div>
        <button className="file-select__btn" onClick={this.onClick}>button</button>
      </div>
    )
  }
}