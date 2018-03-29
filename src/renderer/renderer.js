import React, { Component } from 'react';
import ReactDom from 'react-dom';
import styles from '../css/app.css'
import Loader from './Loader';
import OverLook from './OverLook'
import { Redirect, BrowserRouter, Route, Link } from 'react-router-dom'
import {getImages, getRoot } from '../lib/Path';

console.log(getRoot())

const ROOT_PATH="/D:/mydev/electron/pdfdiff-master/dist/renderer/index.html"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Route exact path={ROOT_PATH} component={Loader} />
        <Route exact path="/" component={Loader} />
        <Route path="/memo" component={OverLook} />
      </div>
      </BrowserRouter>
    )
  }
}

class Memo extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {history} = this.props;
    history.push('/');
  }

  render() {
    return (
      <button onClick={this.onClick}>back</button>
    );
  }
}


ReactDom.render(
  <App />,
  document.getElementById('root')
);

