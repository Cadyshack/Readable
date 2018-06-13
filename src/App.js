import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './pages/Navigation.js';
import PostList from './pages/PostList.js';
import PostDetail from './pages/PostDetail.js';
import ErrorPage from './pages/ErrorPage.js';

import './App.css';

class App extends Component {

  render() {
    const links = this.props.catList;
    return (
      <div className="app">
        <Navigation />
        <div className="app-main">
          <Switch>
            <Route exact path="/" component={ PostList } />
            {
              links.map( (cat) => (
                <Route exact key={cat.name} path={`/${cat.path}`} component={ PostList } />
              ))
            }
            {
              links.map( (cat) => (
                <Route exact key={cat.name+1} path={`/${cat.path}/:post_id`} component={ PostDetail } />
              ))
            }
            <Route component={ ErrorPage } />
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    catList: categories.catList
  }
}

export default withRouter(connect(mapStateToProps)(App));
