'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectUsers, userAdded, userDelete } from '@/redux/usersSlice'
import { Button, Grid, Input, Tooltip, Typography } from '@mui/material'
import React from 'react'

function Users() {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const [ newUser, setNewUser ] = React.useState("");
  const handleAdd = () => {
    dispatch(userAdded(newUser))
  }
  const handleDelete = (id: number) => {
    dispatch(userDelete(id))
  }

  return (
    <>
      <Typography variant='h4'>List of users</Typography>
      <Input value={newUser} onChange={(e) => setNewUser(e.target.value)} />
      <Button onClick={handleAdd}>Add</Button>
      <Grid container spacing={1}>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              <Tooltip title={user.name} arrow>
                <Typography className='text-ellipsis overflow-hidden ...'>{user.name}</Typography>
              </Tooltip>
            </Grid>
            <Grid item xs>
              <Button onClick={() => handleDelete(user.id)}>X</Button>
            </Grid>
            <Grid item xs={5}></Grid>
          </React.Fragment>
        ))}
      </Grid>
    </>
  )
}

export default Users