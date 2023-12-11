import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { isAfter, isBefore, parseISO } from 'date-fns';

export interface ToDoState {
    id: number,
    text: string,
    completed: boolean,
    deadline: string,
    user: string,
}

function nextId(todos: ToDoState[]) {
  const ids = todos.map(todo => { return todo.id });
  const maxId = Math.max(...ids);
  return maxId + 1;
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [{ id: 0, text: "Init", completed: false, deadline: new Date().toISOString().slice(0, -5), user: "Init"}],
  reducers: {
    todoAdded: (state: ToDoState[], action: PayloadAction<ToDoState>) => {
      state.push({
        id: nextId(state),
        text: action.payload.text,
        completed: false,
        deadline: action.payload.deadline,
        user: action.payload.user,
      })
    },
    todoToggled(state: ToDoState[], action) {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo)
        todo.completed = !todo.completed
    },
    todoDelete(state: ToDoState[], action) {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo) {
        const index = state.indexOf(todo)
        state.splice(index, 1);
      }
    },
    todoSort(state: ToDoState[], action) {
      state.sort((a, b) => {
        if (action.payload === "user") {
          let fa = a.user.toLowerCase(),
          fb = b.user.toLowerCase();
    
          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
          return 0;
        }
        if (action.payload === "deadline") {
          let da = parseISO(a.deadline),
              db = parseISO(b.deadline);
    
          if (isAfter(da, db)) {
              return 1;
          }
          if (isBefore(da, db)) {
              return -1;
          }
          return 0;
        }
        return 0;
      })
    }
  }
})

export const { todoAdded, todoToggled, todoDelete, todoSort } = todosSlice.actions
export const selectTodos = (state: RootState) => state.todos
export default todosSlice.reducer