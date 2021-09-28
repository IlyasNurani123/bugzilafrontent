import React, { Component } from 'react';
import ThemeContext from './ThemeContext';
class ThemeProvider extends Component {
  state = {
    isLightTheme: true,
    lightBlue: { syntax: '#fff', bg: '#2684FF' },
    skyBlue: { syntax: '#FCF6F5FF', bg: '#89ABE3FF' },
    blue: { syntax: '#fff', ui: '#005DEB', bg: '#0063B2FF' },
    light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
    dark: { syntax: '#ddd', ui: '#333', bg: '#555' },
    model: { syntext: '#555', bg: '#555' },
  };
  render() {
    return (
      <ThemeContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;
