import React, { Fragment } from 'react';
import NavigationBar from './components/layout/NavigationBar';
import Landing from './components/layout/Landing';
import './App.scss';

const App = () => {
  return (
    <Fragment>
      <NavigationBar />
      <Landing />
    </Fragment>
  );
};

export default App;
