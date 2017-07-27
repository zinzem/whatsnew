import React, { Component } from 'react';
import './Release.css';

class Release extends Component {

  constructor(props) {
    super(props);
    this.title = props.data.title[0];
    this.changelog = props.data.content[0]._;
}

  render() {
    return (
      <div className="release">
        <h2>{this.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: this.changelog }}
        />
      </div>
    );
  }
}

export default Release;
