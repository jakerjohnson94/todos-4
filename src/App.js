import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import './App.css';

import todoList from './todos.json';
import Header from './Header.js';
import TodoList from './ToDoList.js';
import Footer from './Footer.js';
import {
  addTodo,
  removeTodo,
  markTodo,
  clearCompleted,
  ADD_TODO,
  DELETE_TODO,
  MARK_COMPLETE,
  CLEAR_COMPLETED,
} from './actions.js';
//Redux:

const todoReducer = (state = todoList, action) => {
  let newState;
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.todo];
    case DELETE_TODO:
      newState = state.slice();
      newState.splice(action.index, 1);
      return newState;
    case MARK_COMPLETE:
      newState = state.slice();
      let todo = newState.find(a => a.id === action.todo.id);
      todo.completed === true ? (todo.completed = false) : (todo.completed = true);
      return newState;
    case CLEAR_COMPLETED:
      newState = state.slice();
      newState = newState.filter(a => !a.completed);
      return newState;
    default:
      return state;
  }
};
const store = createStore(todoReducer);
//React:

class Presentational extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  submitTodo = event => {
    let todos = this.props.todos;
    if (event.key === 'Enter') {
      const lastTodo = todos[todos.length - 1];

      const newTodo = {
        userId: 1,
        id: lastTodo ? lastTodo.id + 1 : 1,
        title: this.state.input,
        completed: false,
      };

      this.props.submitNewTodo(newTodo);

      this.setState({
        input: '',
      });
    }
  };
  handleChange = event => {
    this.setState({
      input: event.target.value,
    });
  };

  handleCheckClick = id => event => {
    let todos = this.props.todos;

    const todo = todos.find(a => a.id === id);
    this.props.markComplete(todo);
  };

  handleDeleteClick = id => () => {
    let todos = this.props.todos;
    todos = todos.filter(a => a.id !== id)[0];
    this.props.removeOldTodo(todos);
  };
  handleClearClick = () => {
    let todos = this.props.todos;
    todos = todos.filter(a => !a.completed);
    this.props.clearCompletedTodos(todos);
  };
  render() {
    const Home = () => (
      <TodoList
        handleChange={this.handleChange}
        todos={this.props.todos}
        handleCheckClick={this.handleCheckClick}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
    const Completed = () => (
      <TodoList
        handleChange={this.handleChange}
        todos={this.props.todos.filter(a => a.completed)}
        handleCheckClick={this.handleCheckClick}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
    const Active = () => (
      <TodoList
        todos={this.props.todos.filter(a => !a.completed)}
        handleCheckClick={this.handleCheckClick}
        handleDeleteClick={this.handleDeleteClick}
      />
    );

    return (
      <React.Fragment>
        <Header submitTodo={this.submitTodo} handleChange={this.handleChange} />

        <section className="todoapp">
          <Switch>
            <Route exact path="/" component={Home} />;
            <Route exact path="/completed" component={Completed} />;
            <Route exact path="/active" component={Active} />;
          </Switch>
        </section>
        {this.props.todos.length ? (
          <Footer handleClearClick={this.handleClearClick} todos={this.props.todos} />
        ) : null}
      </React.Fragment>
    );
  }
}
// }

const mapStateToProps = state => {
  return { todos: state };
};

const mapDispatchToProps = dispatch => {
  return {
    removeOldTodo: todo => {
      dispatch(removeTodo(todo));
    },
    submitNewTodo: todo => {
      dispatch(addTodo(todo));
    },
    markComplete: todo => {
      dispatch(markTodo(todo));
    },
    clearCompletedTodos: todos => {
      dispatch(clearCompleted(todos));
    },
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default AppWrapper;
