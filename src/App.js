import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import uuid from 'uuid/v4';
import PostList from './pages/PostList.js';
import Navigation from './pages/Navigation.js';
import ErrorPage from './pages/ErrorPage.js';

import './App.css';

const uid = uuid();

class App extends Component {

  render() {

    return (
      <div className="app">
        <Navigation />



        <div className="post-list">
          <p>It was such a charming home!—my new one; a fine great house, with pictures, and delicate decorations, and rich furniture, and no gloom anywhere, but all the wilderness of dainty colors lit up with flooding sunshine; and the spacious grounds around it, and the great garden—oh, greensward, and noble trees, and flowers, no end! And I was the same as a member of the family; and they loved me, and petted me, and did not give me a new name, but called me by my old one that was dear to me because my mother had given it me—Aileen Mavourneen. She got it out of a song; and the Grays knew that song, and said it was a beautiful name.</p>
          <Switch>
            <Route exact path="/" component={ PostList } />
            <Route exact path="/react" component={ PostList } />
            <Route component={ ErrorPage } />

          </Switch>
          <hr />
          <p>{uid}</p>
        </div>
      </div>
    );
  }
}



export default App;
