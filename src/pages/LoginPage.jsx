import React, { useContext } from 'react';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import { UserContext } from '../userContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisibility] = useState(false);
    const[redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext)

    async function Login(ev){
      ev.preventDefault();
      const response = await fetch('https://blog-4jyg.onrender.com/login', {
        //replace url with backend url 
        method:'POST',
        body:JSON.stringify({username, password}),
        headers:{'Content-Type':'application/json'},
        credentials: 'include', //credentials of include means if there is a cookie, it gets included in the browser 
      });
      if(response.ok){
        response.json().then(userInfo => {
          setUserInfo(userInfo);
          setRedirect(true);
        })
        
      }
      else{
        alert('Wrong Credentials');
      }
  }
  if(redirect){
    return <Navigate to='/'/>
  }
  return (
    <div>
      <form action="" className='logIn' onSubmit={Login}>
        <h1>Log In</h1>
        <input type="text" name="" id="" placeholder='username' value={username} onChange={(e)=>{
          setUsername(e.target.value)}} />
        <div className='pw-wrapper'>
                    <input 
                    type={visible ? 'text' : 'password'} className='pw-input'
                    placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                    <button
                    type="button"
                    className="pw-toggle"
                    onClick={() => setVisibility(v => !v)}
                    aria-label={visible ? 'Hide password' : 'Show password'}>
                    {visible ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
                  </button>
                  </div>
        <button className='button' >Log In</button>
      </form>
    </div>
  )
}

export default LoginPage