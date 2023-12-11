'use client'

import './globals.css'
import Header from './Header'
import { Box, Toolbar } from '@mui/material'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

export default function RootLayout({ children, } : { children: React.ReactNode }) {
  const [ open, setOpen ] = useState(false);

  return (
    <html lang="en">
      <body>
        <Header open={open} setOpen={setOpen}/>
        <Box className={open ? 
          'flex-grow ml-60 transition-all ease-in-out duration-500' 
          : 'flex-grow transition-all ease-in-out duration-500'}>
          <Box component="main"  className='p-3'>
            <Toolbar />
            <Provider store={store}>
              <main>{children}</main>
            </Provider>
          </Box>
        </Box>
      </body>
    </html>
  )
}
