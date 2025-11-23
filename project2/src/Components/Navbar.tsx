import React from 'react'
import { AppBar, Toolbar, Typography ,Box, Stack, Button,Menu,MenuItem,Drawer,List,ListItem,ListItemText,
  Divider,IconButton,Avatar} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch} from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from 'react';
import { logout } from "../Redux/auth/authActions";


function Navbar() {
  const navigate=useNavigate();
  const { user, isAuthenticated } = useSelector((s: RootState) => s.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  
  const handleAvatarClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const dispatch=useDispatch()
 
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
  };

  const drawer = (
    <Box sx={{ width: 260, p: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 1, textAlign: "center", color: "black" }}
      >
        Connectify
      </Typography>

      <Divider />

      <List>
        {[
          { label: "Home", to: "/" },
          { label: "Users", to: "/search" },
          { label: "Liked", to: "/liked" },
          { label: "Quotes", to: "/quotes" },


        ].map((item) => (
          <ListItem
      
            key={item.to}
            onClick={() => {
              navigate(item.to);
              setDrawerOpen(false);
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        <Divider sx={{ my: 2 }} />


        {!isAuthenticated ? (
          <ListItem
            onClick={() => {
              navigate("/login");
              setDrawerOpen(false);
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary="Login / Sign Up" />
          </ListItem>
        ) : (
          <ListItem
            onClick={() => {
              handleLogout();
              setDrawerOpen(false);
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
    <AppBar sx={{position:"fixed",bgcolor:"black"}}>
        <Toolbar>
          <Box onClick= {() => navigate('/')} sx={{cursor:"pointer"}}>
            <Typography variant='h5' fontWeight="bold">Connectify</Typography>
            </Box>
            <Box sx={{flexGrow:1}}/>
            <Box sx={{display:{xs: "none", md: "flex" }}}>
              <Stack direction={"row"}>
                 <Button variant='text' color='inherit' onClick={() => {navigate('/')}} sx={{fontWeight:"bold"}}>Home</Button>
                 <Button variant='text'  color='inherit' onClick={() => navigate('/liked')} sx={{fontWeight:"bold"}}>Liked</Button>
                 <Button variant='text' color='inherit'onClick={() => navigate('/search')} sx={{fontWeight:"bold"}}>User</Button>
                 <Button variant='text' color='inherit'onClick={() => navigate('/quotes')} sx={{fontWeight:"bold"}}>Quotes</Button>

</Stack>
             </Box>   
             <Box sx={{display:{xs: "none", md: "flex" }}}> 
                    {!isAuthenticated && (
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#ffffffff",
                  color: "#fcfcfcff",
                  fontWeight: "bold",
                  "&:hover": { borderColor: "#e4e4e4ff", color: "#ebebebff" },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}

            {isAuthenticated && (
              <>
                <IconButton onClick={handleAvatarClick}>
                  <Avatar src={user?.picture}>
                    {user?.username?.charAt(0)}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                  sx={{zIndex:2000}}
                >
                  <MenuItem disabled>{user?.username}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
                 
</Box> 
                  
           

              <IconButton
            sx={{ display: { xs: "flex", md: "none" },color:"white" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

    </AppBar>
<Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{zIndex: 2000}}>
        {drawer}
      </Drawer>

     <Box sx={{ height: "80px" }} />
     </>
  )
}

export default Navbar