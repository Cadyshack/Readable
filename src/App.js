import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import Navigation from './components/Navigation.js';
import PostList from './pages/PostList.js';
import PostDetail from './pages/PostDetail.js';
import ErrorPage from './components/ErrorPage.js';
import { navigationOperations } from './modules/navigation';
import Loading from 'react-loading';

import './App.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


class App extends Component {

  componentDidMount() {
    this.props.fetchCat();
  }

  render() {
    const {isLoading, hasErrored, catList } = this.props;

    if (hasErrored){
      return (
        <ErrorPage />
      )
    } else if ( isLoading ) {
      return (
        <div className="isLoading">
          <Loading type="spin" className="loader" color='#263238'  />
        </div>
      )
    } else {

      return (
        <div className="app">
          <Navigation />
          <div className="app-main">
            <Switch>
              <Route exact path="/" component={ PostList } />
              {
                catList.map( (cat) => (
                  <Route exact key={cat.name} path={`/${cat.path}`} component={ PostList } />
                ))
              }
              {
                catList.map( (cat) => (
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
}

function mapStateToProps ({ categories: {isLoading, hasErrored, catList} }) {
  return {
    isLoading,
    hasErrored,
    catList
  }
}
function mapDispatchToProps (dispatch) {
  return {
    fetchCat: (data) => dispatch(navigationOperations.fetchCategories(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
