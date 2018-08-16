import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoItem from './ToDoItem.js';
class TodoList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.todos.length ? (
          <section className="main">
            <ul className="todo-list">
              {this.props.todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  handleCheckClick={this.props.handleCheckClick(todo.id)}
                  handleDeleteClick={this.props.handleDeleteClick(todo.id)}
                />
              ))}
            </ul>
          </section>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { todos: state };
};
export default connect(mapStateToProps)(TodoList);
