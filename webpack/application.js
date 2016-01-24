import 'babel-polyfill';

import Posts from './components/posts';
import PostsRoute from './components/posts_route';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

$(document).ready(function () {
  ReactDOM.render(
      <Relay.RootContainer
    Component={Posts}
    route={new PostsRoute()}
    renderLoading={function () {
      return <div className="loader">
        <span className="fa fa-spin fa-spinner"></span>
        </div>;
    }} />,
    document.getElementById('posts')
  );
});
