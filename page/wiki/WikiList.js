import React, { Component } from 'react';
import { Link } from 'react-router';
import 'style/page/wiki/wiki-page.scss';

export default class WikiList extends Component {
  state = {};

  componentDidUpdate() {}

  render() {
    return (
      <div>
        {this.props.wikis.map(wiki => {
          <div>
            <Link to={`/wiki/${wiki.id}`}>
              {wiki.title}
            </Link>
          </div>;
        })}
      </div>
    );
  }
}
