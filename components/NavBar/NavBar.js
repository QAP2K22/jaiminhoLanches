import React, { Fragment, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';

const listOptions = [
  {
    title: "Pedidos",
    href: "/administrative/requests",
    icon: <PendingActionsIcon />
  },
  {
    title: "Cozinha",
    href: "/administrative/kitchen",
    icon: <MicrowaveIcon />
  },
  {
    title: "Ingredientes",
    href: "/administrative/ingredients",
    icon: <MenuBookIcon />
  },
  {
    title: "Lanches/Produtos",
    href: "/administrative/lanchs",
    icon: <LunchDiningIcon />

  },
  {
    title: "Combos",
    href: "/administrative/combination",
    icon: <FastfoodIcon />
  },

]


const NavBar = ({ children, title = "" }) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const { push } = useRouter()


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const activeNavBar = (value) => {
    setOpen(value)
  }


  const list = (anchor = "left") => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={() => activeNavBar(false)}
      onKeyDown={() => activeNavBar(false)}
    >
      <List>
        {listOptions.map((text, index) => (
          <ListItem key={text.title} disablePadding>
            <ListItemButton onClick={() => push(text.href)}>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>

          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => activeNavBar(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              JAIMINHO LANCHES
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=> push("/administrative")}>Desconectar</MenuItem>
           {/*      <MenuItem onClick={handleClose}>Perfis Administrativos</MenuItem> */}
              </Menu>
          </Toolbar>

        </AppBar>
      </Box>


      <Fragment key={"left"}>
        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => activeNavBar(false)}
        >
          {list()}
        </Drawer>
      </Fragment>


      <Container style={{ marginTop: "30px" }}>
        {children}
      </Container>
    </>
  )
}

export default NavBar