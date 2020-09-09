import './App.css';
import Home from './components/Home';
import store from './Store';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import initialState from './reducers/calendarReducer';
import combineReducers from './reducers/index';

class App extends PureComponent {
  render(){
    return (
      <Provider store={store} reducer={combineReducers} initialState={initialState}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;
