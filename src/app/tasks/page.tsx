'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectTodos, todoAdded, todoDelete, todoSort, todoToggled } from '@/redux/todosSlice';
import { Typography, Button, Grid, Tooltip, Input, Checkbox, Select, Box, MenuItem, SelectChangeEvent, Dialog, Alert, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { format, isAfter, parseISO } from 'date-fns'
import { selectUsers } from '@/redux/usersSlice';

interface ToDoState {
  id: number,
  text: string,
  completed: boolean,
  deadline: string,
  user: string,
}

function Task() {
  const [ newTask, setNewTask ] = React.useState<ToDoState>({
    id: -1,
    text: "",
    completed: false,
    deadline: new Date().toISOString().slice(0, -5),
    user: "",
  });
  const [ open, setOpen ] = React.useState(false);
  const [ sort, setSort ] = React.useState("");
  const todos = useAppSelector(selectTodos);
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    if (newTask)
      setNewTask({
        ...newTask,
        text: e.target.value,
      })
  }

  function handleAdd(): void {
    if (newTask) {
      if (newTask.text === "") {
        setOpen(true);
        return;
      }
      dispatch(todoAdded(newTask))
    }
  }

  function handleDelete(id: number): void {
    dispatch(todoDelete(id));
  }

  function handleToggle(id: number): void {
    dispatch(todoToggled(id));
  }

  function handleChangeUser(e: SelectChangeEvent): void {
    if (newTask)
      setNewTask({
        ...newTask,
        user: e.target.value,
      })
  }

  function handleChangeTime(e: React.ChangeEvent<HTMLInputElement>): void {
    if (newTask)
      setNewTask({
        ...newTask,
        deadline: e.target.value,
      })
  }

  function handleSort(e: SelectChangeEvent): void {
    setSort(e.target.value);
    dispatch(todoSort(e.target.value))
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Alert severity="error" action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
          Please enter task name
        </Alert>      
      </Dialog>
      <Typography variant='h4'>List of tasks</Typography>
      <Box className='flex items-center ml-5 mb-5'>
        <Input className='mr-5 text-base'
          value={newTask.text} onChange={(e) => handleChangeName(e)}/>
        <Typography className='mr-1 text-base'>Assigned to:</Typography>
        <Select className='mr-5 text-base min-w-[100px]'
          variant='standard' label='User' value={newTask.user} onChange={(e) => handleChangeUser(e)}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
          ))}
        </Select>
        <input className='mr-5 text-base'
          type="datetime-local" step='1' value={newTask.deadline} onChange={(e) => handleChangeTime(e)}/>
        <Button className='mr-5 rounded-md bg-blue-500 text-white hover:bg-blue-700'
          onClick={handleAdd}>
          Add
        </Button>
        <Typography className='text-base mr-1'>Sort:</Typography>
        <Select className='text-base min-w-[100px]'
          variant='standard' label='Sort' value={sort} onChange={(e) => handleSort(e)}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='user'>
            User
          </MenuItem>
          <MenuItem value='deadline'>
            Deadline
          </MenuItem>
        </Select>
      </Box>
      <Grid container spacing={1} rowSpacing={2} className='items-center ml-5'>
        {todos.map((todo) => (
          <React.Fragment key={todo.id}>
            <Grid item xs={4}>
              <Tooltip title={todo.text} arrow>
                <Typography className={isAfter(new Date(), parseISO(todo.deadline)) && !todo.completed ? 
                  'text-red-500 text-ellipsis overflow-hidden ...'
                  : 'text-ellipsis overflow-hidden ...'}>
                  {todo.text}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={3}>
              <Tooltip title={todo.user} arrow>
                <Typography className='text-ellipsis overflow-hidden ...'>{todo.user}</Typography>
              </Tooltip>            
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {format(parseISO(todo.deadline), 'hh:mm:ss a - dd/MM/yyyy')}
              </Typography>
            </Grid>
            <Grid item xs>
              <Checkbox checked={todo.completed} onChange={() => handleToggle(todo.id)}></Checkbox>
            </Grid>
            <Grid item xs>
              <Button onClick={() => handleDelete(todo.id)}>X</Button>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </>
  )
}

export default Task