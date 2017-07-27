import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Releases from './components/Releases';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Route path='/:username/:repo' component={Releases} />
  </BrowserRouter>,
  document.getElementById('root')
);