import ReactOnRails from 'react-on-rails';
import React from 'react';
import Relay from 'react-relay';
import PostsClient from './PostsClient';

// This is how react_on_rails can see the HelloWorldApp in the browser.

const PostsRoute = {
  queries: {
    root: () => Relay.QL` query { root }`,
  },
  params: {},
  name: 'PostsRoute',
};

class Posts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Relay.RootContainer
        Component={PostsClient}
        route={PostsRoute}
      />
    );
  }
}
ReactOnRails.register({ Posts });
