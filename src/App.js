import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { auth, loginGoogle} from './api/firebase';
import { reload } from 'firebase/auth';

function App() {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(()=>{
    console.log(auth, auth.currentUser)
    setTimeout(()=>{
      loadInfo()
    }, 1000)
  },[auth])

  function loadInfo(){
    if(auth.currentUser){
      setUserInfo(auth.currentUser)
      console.log("setoy")
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className='login-section'>
          {userInfo ? <div className='user-info'>{userInfo.displayName} <img className="avatar" src={userInfo.photoURL} onClick={()=>{auth.signOut()
             window.location.reload()}}/></div>: <Button className="login-button" variant="contained" onClick={()=>{loginGoogle()
              loadInfo()}}>Login</Button>}
        </div>
      </header>
    </div>
  );
}

export default App;
