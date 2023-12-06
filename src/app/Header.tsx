'use client'

import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemButton } from '@mui/material'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from 'react'

function Header({open, setOpen } : {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {    
    const handleDrawerToggle = () => {
        setOpen(!open);
    }
    
  return (
    <Box className='flex flex-row-reverse'>
      <AppBar component="nav" position='fixed' className={open ? 
        'w-[calc(100%-15rem)] transition-all ease-in-out duration-500' 
        : 'transition-all ease-in-out duration-500'
      }>
        <Toolbar>
          <IconButton
            aria-label='open drawer'
            edge="start"
            onClick={handleDrawerToggle}
            className='text-inherit mr-0.5 sm:block hidden'
          >
            <MenuIcon className='align-text-bottom'/>
          </IconButton>
          <Link href={"/"} className='text-white no-underline'>
            <Typography
                variant="h6"
                component="div"
                className='flex-grow hidden sm:block'
            >
                To do list v2
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer variant="persistent" open={open} onClose={handleDrawerToggle}
          PaperProps={{ className: "w-60 box-border" }}
          SlideProps={{ timeout: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Toolbar />
            <Divider />
            <List>
              <ListItem key='tasks' className='pb-1 p-0'>
                <Link href="/tasks" className='w-full text-black no-underline'>
                  <ListItemButton className='pb-3 pt-3'>Tasks</ListItemButton>
                </Link>
              </ListItem>
              <ListItem key='users' className='pb-1 p-0'>
                <Link href="/users" className='w-full text-black no-underline'>
                  <ListItemButton className='pb-3 pt-3'>Users</ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </nav>
    </Box>
  )
}

export default Header