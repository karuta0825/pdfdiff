import React, { Component } from 'react';
import ReactDom from 'react-dom';
import styles from '../css/app.css';
import Loader from './FileSelectView/Loader';
import OverLook from './CompareView/OverLook'
import { BrowserRouter, Route } from 'react-router-dom'
import { getRootHtmlPath } from '../utils/Path';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftPath : '',
      rightPath : ''
    }
    this.setPath = this.setPath.bind(this);
  }

  setPath(path, place) {
    const {leftPath, rightPath} = this.state;

    if (place === 'right') {
      this.setState({leftPath:leftPath, rightPath:path})
    }

    if (place === 'left') {
      this.setState({leftPath:path, rightPath:rightPath})
    }
  }

  render() {
    const {leftPath, rightPath} = this.state;
    return (
      <MuiThemeProvider>
        <BrowserRouter>
        <div id='router'>
          <Route exact path={getRootHtmlPath()} render={(props)=> <Loader setPath={this.setPath} rightPath={rightPath} leftPath={leftPath} history={props.history}/>} />
          <Route exact path="/" component={Loader} />
          <Route path="/memo" render={() => <OverLook leftPath={leftPath} rightPath={rightPath} />}/>
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

