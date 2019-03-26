import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignInForm from './components/SignInForm';
import CompanyLogoLink from './components/CompanyLogoLink';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CompanyLogoLink />
        <SignInForm />
      </div>
    );
  }
}

export default App;
