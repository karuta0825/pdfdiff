import React, { Component } from 'react';
import ReactDom from 'react-dom';
import styles from '../css/app.css';
import Loader from './FileSelectView/Loader';
import OverLook from './CompareView/OverLook'
import { BrowserRouter, Route } from 'react-router-dom'
import { getRootHtmlPath } from '../utils/Path';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Route exact path={getRootHtmlPath()} component={Loader} />
        <Route exact path="/" component={Loader} />
        <Route path="/memo" component={OverLook} />
      </div>
      </BrowserRouter>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);

