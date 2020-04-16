import './App.css';
import Home from './Components/Home';
import Edit from './Components/Edit';
import Timer from './Components/Timer';
import Books from './Components/Books';
import React, { PureComponent } from 'react';

class App extends PureComponent {

  state = {
    isEdit: false,
    isBooks: false,
    isTimer: false,
  };

  switchToTimer = () => {
    this.setState({ isTimer: true, isEdit: false, isBooks: false });
  };

  switchToEdit = () => {
    this.setState({ isTimer: false, isEdit: true, isBooks: false });
  };

  switchToBooks = () => {
    this.setState({ isTimer: false, isEdit: false, isBooks: true });
  };

  render(){
    return (
      <div className="App">
        <Home 
          switchToTimer={this.switchToTimer}
          switchToEdit={this.switchToEdit}
          switchToBooks={this.switchToBooks}
        />
        {(this.state.isEdit && (
          <Edit />
        ))}
        {(this.state.isBooks && (
          <Books />
        ))}
        {(this.state.isTimer && (
          <Timer />
        ))}
      </div>
    );
  }
    
}

export default App;
