import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisibility] = useState(false);
  async function register(ev){
    ev.preventDefault();//Stops you from redirecting from page
    const response = await fetch('https://blog-4jyg.onrender.com/register', {
      //replace url with backend url 
      method:'POST',
      credentials:'include',
      body:JSON.stringify({username, password}),
      headers:{'Content-Type': 'application/json'},
    })
    if(response.status != 200){
      alert('Registration Failed.')
    }
    else{
      alert("Registration Successful")
    }

    setUsername('');
    setPassword('');
    setVisibility(false);
    
  }
  return (
    <div>
      <form action="" className='register' onSubmit={register}>
        <h1>Register</h1>
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
        
        <button className='button' >Register</button>
      </form>
    </div>
  )
}

export default RegisterPage