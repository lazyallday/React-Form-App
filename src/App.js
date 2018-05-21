import React, { Component } from 'react';
import './App.css';
import { UserForm } from './Components/UserForm';
import { UsersList } from './Components/UsersList';
import SourceList from './source.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: SourceList.Users };
  }

  addUser = (user) => {
    user.id = this.state.users.length + 1;
    this.setState((prevState) => {
      prevState.users.unshift(user)
      return {
        users: [...prevState.users, user]
      }
    })
  }

  removeUser = (user) => {
    this.setState((prevState) => {
      return {
        users: prevState.users.filter(x => x.id !== user.id)
      }
    })
  }

  updateUserInfo = (oldUser, newUser) => {
    oldUser.name = newUser.name;
    oldUser.phone = newUser.phone;
    oldUser.email = newUser.email;

    return oldUser;
  }

  updateUser = (user) => {
    this.setState((prevState) => {
      return {
        users: prevState.users.map(x => (x.id === user.id) ? this.updateUserInfo(x, user) : x)
      }
    })
  }

  /**Old sort which can toggle Asc and Desc
  
  sortUser(key){
    const collumnState = !this.state[`toggle-${key}`];

    this.setState({
      [`toggle-${key}`]: collumnState,
      users: orderBy(this.state.users, [key], collumnState ? "asc" : "desc")
    });
  }

  **/

  compareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  sortBy = (key) => {
    let arrayCopy = [...this.state.users];
    arrayCopy.sort(this.compareBy(key));
    this.setState({ users: arrayCopy });
  }

  render() {
    return (
      <div className="App">
        <h1>List of participants</h1>
        <div className="addUser">
          <UserForm add={this.addUser} />
        </div>
        <div className="userTable">
          <UsersList {...this.state}
            remove={this.removeUser}
            updateUser={this.updateUser}
            sortUser={this.sortBy}
          />
        </div>
      </div>
    );
  }
}

export default App;
