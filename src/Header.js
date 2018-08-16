import React, { Component } from 'react';
class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          onChange={this.props.handleChange}
          onKeyPress={this.props.submitTodo}
          placeholder="What needs to be done?"
          autoFocus
        />
      </header>
    );
  }
}

export default Header;
