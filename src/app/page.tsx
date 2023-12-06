'use client'

import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, Slider, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'

export default function Home() {
  const [ open, setOpen ] = useState(false);
  const theme = useTheme();
  
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
          <Typography
            variant="h6"
            component="div"
            className='flex-grow hidden sm:block'
          >
            To do list v2
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={open ? 
        'flex-grow ml-60 transition-all ease-in-out duration-500' 
        : 'flex-grow transition-all ease-in-out duration-500'}>
        <Box component="main"  className='p-3'>
          <Toolbar />
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
            fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
            aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
            cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
            at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
            Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
            numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
            asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
            assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
            soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
            ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
            soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
            Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
            delectus quo eius exercitationem tempore. Delectus sapiente, provident
            corporis dolorum quibusdam aut beatae repellendus est labore quisquam
            praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
            deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
            fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
            recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
            debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
            praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
            voluptate iure labore, repellendus beatae quia unde est aliquid dolor
            molestias libero. Reiciendis similique exercitationem consequatur, nobis
            placeat illo laudantium! Enim perferendis nulla soluta magni error,
            provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
            iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
            Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
            reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
            cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
            consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
            Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
            dolores sunt inventore perferendis, aut sapiente modi nesciunt.
          </Typography>
        </Box>
      </Box>
      <nav>
        <Drawer variant="persistent" open={open} onClose={handleDrawerToggle}
          PaperProps={{ className: "w-60 box-border" }}
          SlideProps={{ timeout: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              MUI
            </Typography>
            <Divider />
            <List>
              <ListItem key='A' disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary="A" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </nav>
    </Box>
  )
}
