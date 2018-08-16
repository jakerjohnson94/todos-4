export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const MARK_COMPLETE = 'MARK_COMPLETE';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETE';

export const addTodo = todo => {
  return {
    type: ADD_TODO,
    todo: todo,
  };
};

export const removeTodo = index => {
  return {
    type: DELETE_TODO,
    index,
  };
};

export const markTodo = todo => {
  return {
    type: MARK_COMPLETE,
    todo: todo,
  };
};

export const clearCompleted = todos => {
  return {
    type: CLEAR_COMPLETED,
    todos: todos,
  };
};
