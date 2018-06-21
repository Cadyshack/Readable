import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';


import Navigation from './pages/Navigation.js';
import PostList from './pages/PostList.js';
import PostDetail from './pages/PostDetail.js';
import ErrorPage from './pages/ErrorPage.js';

import './App.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


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
                <Route exact key={cat.name+1} path={`/${cat.path}/:post_id`} render={({match}) => (
                  <PostDetail
                    id={match.params.post_id}
                    />
                )} />
              ))
            }
            <Route component={ ErrorPage } />
          </Switch>
        </div>
        <Alert stack={{limit: 3}} />
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
