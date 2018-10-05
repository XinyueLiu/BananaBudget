import React, { Component } from 'react';
import Calendar from "./components/Calendar";
import './App.css';

class App extends Component {
  state = {
    data: []
  };

  // componentDidMount() {
  //   fetch('/api/bananabudget/10032018/10')
  //           .then(response => this.setState({ data: new Array(response.json())}));
  // }
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>banana<b>budget</b></span>
          </div>
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;
