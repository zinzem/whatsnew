import React, { Component } from 'react';
import Release from './Release';
import Rx from 'rxjs';
import superagent from 'superagent';

import './Releases.css';

let api = {
  getFeed(username, repo, token) {
    return Rx.Observable.create(observer => {
      superagent.get('https://whats-new.herokuapp.com/feed/'+ username + '/' + repo + (token ? ('?token=' + token) : ''))
      .accept('json')
      .end(function (error, response) {
        if (error) {
          observer.error(error);
        } else {
          observer.next(response.body.feed);
          observer.complete();
        }
      });
    })
  }
};

class Releases extends Component {

  constructor(props) {
    super(props);
    this.state = {releases: []};
    this.username = props.match.params.username;
    this.repo = props.match.params.repo;
    let query = new URLSearchParams(props.location.search)
    let token = query.get('token');
    
    api.getFeed(this.username, this.repo, token).subscribe((feed) => {
      let releases = feed.entry.map((entry) => <li key={entry.id}><Release data={entry}/></li>);
      this.setState({releases: releases});
    }, (error) => {
      console.log("error: " + error);
    });
  }

  render() {
    return (
      <div>
        <h1>Changelog of {this.username}'s {this.repo}</h1>
        <ul>{this.state.releases}</ul>
      </div>
    );
  }
}

export default Releases;
