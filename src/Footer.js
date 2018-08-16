import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        {/* This should be `0 items left` by default */}
        <span className="todo-count">
          <strong>{this.props.todos.length ? this.props.todos.length : 0}</strong> item(s) left
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

        {this.props.todos.filter(a => a.completed).length ? (
          <button onClick={this.props.handleClearClick} className="clear-completed">
            Clear completed
          </button>
        ) : null}
      </footer>
    );
  }
}
const mapStateToProps = state => {
  return { todos: state };
};
export default connect(mapStateToProps)(Footer);
