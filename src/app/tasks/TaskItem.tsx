'use client'

import { useAppDispatch } from '@/redux/hooks';
import { ToDoState, dateFormat, todoDelete, todoToggled } from '@/redux/todosSlice';
import { Button, Checkbox, Grid, Tooltip, Typography } from '@mui/material';
import { differenceInMinutes, format, isAfter, parse, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import React from 'react'

function TaskItem({todo} : {todo: ToDoState}) {
  const [open, setOpen] = React.useState(false);
  const calculateTimeLeft = () => {
    let timeLeft = differenceInMinutes(parse(todo.deadline, dateFormat, new Date()), new Date())
    if (timeLeft === 30 && !open) {
      setOpen(true);
      toast.warn('Task ' + todo.text + ' will end in 30 minutes', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    return timeLeft;
  }
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return() => clearTimeout(timer);
  });

  const dispatch = useAppDispatch();
  function handleDelete(id: number): void {
    dispatch(todoDelete(id));
  }

  function handleToggle(id: number): void {
    dispatch(todoToggled(id));
  }

  return (
    <>
      <Grid item xs={3}>
        <Tooltip title={todo.text} arrow>
          <Typography className={isAfter(new Date(), parse(todo.deadline, dateFormat, new Date())) && !todo.completed ? 
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
          {todo.deadline}
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography>
          {timeLeft} minutes
        </Typography>
      </Grid>
      <Grid item xs>
        <Checkbox checked={todo.completed} onChange={() => handleToggle(todo.id)}></Checkbox>
      </Grid>
      <Grid item xs>
        <Button onClick={() => handleDelete(todo.id)}>X</Button>
      </Grid>
    </>
  )
}

export default TaskItem