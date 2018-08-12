import React, { Component } from 'react';
import TodoItem from './ToDoItem.js';
class TodoList extends Component {
  render() {
    const todos = this.props.todos;

    return (
      <React.Fragment>
        {todos.length ? (
          <section className="main">
            <ul className="todo-list">
              {todos.map(todo => (
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
export default TodoList;
