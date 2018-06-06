import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import PostList from './PostList.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Readable</h1>
          <nav className="menu">
            <ul>
              <li>
                <Link to="/">All</Link>
              </li>
              <li>
                <Link to="/react">React</Link>
              </li>
              <li>
                <Link to="/redux">Redux</Link>
              </li>
              <li>
                <Link to="/udacity">Udacity</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="post-list">
          <p>It was such a charming home!—my new one; a fine great house, with pictures, and delicate decorations, and rich furniture, and no gloom anywhere, but all the wilderness of dainty colors lit up with flooding sunshine; and the spacious grounds around it, and the great garden—oh, greensward, and noble trees, and flowers, no end! And I was the same as a member of the family; and they loved me, and petted me, and did not give me a new name, but called me by my old one that was dear to me because my mother had given it me—Aileen Mavourneen. She got it out of a song; and the Grays knew that song, and said it was a beautiful name.</p>
          <Switch>
            <Route exact path="/" component={ PostList } />
            <Route exact path="/:category" render={ ({ location, match, history }) => (

                <PostList category={match.params.category} />
            )}  />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
