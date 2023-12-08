import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface UserState {
    id: number,
    name: string,
}

function nextId(todos: UserState[]) {
  const ids = todos.map(todo => { return todo.id });
  const maxId = Math.max(...ids);
  return maxId + 1;
}

const usersSlice = createSlice({
  name: 'users',
  initialState: [{ id: 0, name: "Init"}],
  reducers: {
    userAdded: (state: UserState[], action: PayloadAction<string>) => {
      const newUser = state.find((user) => user.name === action.payload)
      if (!newUser) {
        state.push({
          id: nextId(state),
          name: action.payload,
        })
      }
    },
    userDelete(state: UserState[], action) {
      const todo = state.find(it => it.id === action.payload)
      if (todo) {
        const index = state.indexOf(todo)
        state.splice(index, 1);
      }
    }
  }
})

export const { userAdded, userDelete } = usersSlice.actions
export const selectUsers = (state: RootState) => state.users
export default usersSlice.reducer