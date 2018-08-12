import React from 'react';
const TodoItem = props => (
  <li key={props.id} className={props.completed ? 'completed' : ''}>
    <div className="view">
      <input
        className="toggle"
        onClick={props.handleCheckClick}
        type="checkbox"
        defaultChecked={props.completed}
      />
      <label>{props.title}</label>
      <button onClick={props.handleDeleteClick} className="destroy" />
    </div>
  </li>
);
export default TodoItem;
