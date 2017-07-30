import React, { Component } from 'react';
import Markdown from'react-remarkable';

import './Release.css';

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wedesday", "Thurday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Release extends Component {

  constructor(props) {
    super(props);
    this.title = props.data.title[0];
    this.updatedDate = new Date(Date.parse(props.data.updated[0]));
    this.updatedDateString = daysOfTheWeek[this.updatedDate.getDay()]
      + " " + this.updatedDate.getDate()
      + " " + months[this.updatedDate.getMonth()]
      + " " + this.updatedDate.getFullYear();
    this.changelog = props.data.content[0]._;
}

  render() {
    return (
      <div className="release">
        <h2>{this.title}</h2>
        <p>{this.updatedDateString}</p>
        <div
        className="markdown"
          dangerouslySetInnerHTML={{ __html: this.changelog }}
        />
      </div>
    );
  }
}

export default Release;