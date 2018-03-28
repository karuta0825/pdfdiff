import React, { Component } from 'react';
import ReactDom from 'react-dom';
import fs from 'fs';
import path from 'path';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file : 'hhh'
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('clicked');
    path.resolve('');
    var file = fs.readFileSync('./dist/renderer/index.html','utf8');
    this.setState({file:file});
  }

  render(){
    return (
      <h1 onClick={this.onClick}>{this.state.file}</h1>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);