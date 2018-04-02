import React, { Component } from 'react';
import ReactDom from 'react-dom';
import styles from '../css/app.css';
import Loader from './FileSelectView/Loader';
import OverLook from './CompareView/OverLook'
import { BrowserRouter, Route } from 'react-router-dom'
import { getRootHtmlPath } from '../utils/Path';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
        <div id='router'>
          <Route exact path={getRootHtmlPath()} component={OverLook} />
          <Route exact path="/" component={Loader} />
          <Route path="/memo" component={OverLook} />
        </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);

