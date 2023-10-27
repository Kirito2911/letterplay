import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { auth, loginGoogle} from './api/firebase';
import { reload } from 'firebase/auth';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
import makeAutenticate from './api/api';
import getGame from './api/api';


function App() {
  const [userInfo, setUserInfo] = useState(null)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      if(user){
        setUserInfo(user)
      }
      else{
        setUserInfo(null)
      }
    })

    return ()=> unsubscribe();
  },[])


  const [opena, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;


  function searchGame(search){
    getGame(search).then((result)=>{
      console.log(result.data.results)
      setOptions(result.data.results)
    })

  }

  return (
    <div className="app">
      <header className="app-header">
        <div></div>
        <div> <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      onChange={(event, newValue) => {
        if(newValue){
          window.alert(newValue.name+" selected!")
        }
      }}
      open={opena}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Games"
          size='small'
          onChange={(e)=>searchGame(e.target.value)}
          sx={{
            input: {
              color: "white",
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    /></div>
        <div className='login-section'>
          {userInfo ? 
          <div className='user-info'>
            {userInfo.displayName} 
            <img className="avatar" src={userInfo.photoURL} onClick={handleClick}/>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
              <img className="avatar" src={userInfo.photoURL} style={{width:"32px",height:"32px",borderRadius:"50px", marginRight:"10px"}}/> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
              
                Add review
              </MenuItem>

              <MenuItem onClick={handleClose}>
                
                Settings
              </MenuItem>
              <MenuItem onClick={()=>{makeAutenticate()}}>
                
                Auth
              </MenuItem>
              <MenuItem onClick={()=>{
                auth.signOut() 
                window.location.reload()
              }}>
                
                Logout
              </MenuItem>
            </Menu>
          </div>: <Button className="login-button" variant="contained" onClick={loginGoogle}>Login</Button>}
        </div>
      </header>
    </div>
  );
}

export default App;
