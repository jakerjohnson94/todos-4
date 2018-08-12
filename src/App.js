import React, { Component } from 'react';

import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import todoList from './todos.json';
import TodoList from './ToDoList.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todoList,
    };
  }

  handleKeyPress = event => {
    let todos = this.state.todos;
    if (event.key === 'Enter') {
      const lastTodo = todos[todos.length - 1];
      console.log(lastTodo);
      const newTodo = {
        userId: 1,
        id: lastTodo ? lastTodo.id + 1 : 1,
        title: event.target.value,
        completed: false,
      };
      todos.push(newTodo);
      this.setState({ todos: todos });
    }
  };

  handleCheckClick = id => event => {
    let todos = this.state.todos;
    const listElement = event.target.parentElement.parentElement;

    const todo = todos.find(a => a.id === id);
    todo.completed === true ? (todo.completed = false) : (todo.completed = true);
    listElement.classList.toggle('completed');

    this.setState({ todo: todos });
  };

  handleDeleteClick = id => () => {
    let todos = this.state.todos;

    todos = todos.filter(a => a.id !== id);

    this.setState({ todos: todos });
  };
  handleClearClick = () => {
    let todos = this.state.todos;
    todos = todos.filter(a => !a.completed);
    this.setState({ todos: todos });
  };
  render() {
    const Home = () => (
      <TodoList
        todos={this.state.todos}
        handleCheckClick={this.handleCheckClick}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
    const Completed = () => (
      <TodoList
        todos={this.state.todos.filter(a => a.completed)}
        handleCheckClick={this.handleCheckClick}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
    const Active = () => (
      <TodoList
        todos={this.state.todos.filter(a => !a.completed)}
        handleCheckClick={this.handleCheckClick}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
    let todos = this.state.todos;
    return (
      <React.Fragment>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            onKeyPress={this.handleKeyPress}
            placeholder="What needs to be done?"
            autoFocus
          />
        </header>
        <section className="todoapp">
          <Switch>
            <Route exact path="/" component={Home} />;
            <Route exact path="/completed" component={Completed} />;
            <Route exact path="/active" component={Active} />;
          </Switch>
        </section>
        {todos.length ? (
          <footer className="footer">
            {/* This should be `0 items left` by default */}
            <span className="todo-count">
              <strong>{todos.length ? todos.length : 0}</strong> item(s) left
            </span>

            <Link className="link" to="./">
              All
            </Link>

            <Link className="link" to="./active">
              Active
            </Link>
            <Link className="link" to="./completed">
              Complete
            </Link>

            {/* Remove this if you don't implement routing */}
            {}
            {todos.filter(a => a.completed).length ? (
              <button onClick={this.handleClearClick} className="clear-completed">
                Clear completed
              </button>
            ) : null}
          </footer>
        ) : null}
      </React.Fragment>
    );
  }
}
// }

export default App;
