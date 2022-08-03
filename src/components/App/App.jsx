import { Component } from 'react';
import s from './App.module.css';

class App extends Component {
  state = {};

  render() {
    return (
      <div className={s.container}>
        <Searchbar onSubmit={onSubmit} />
      </div>
    );
  }
}

export default App;
