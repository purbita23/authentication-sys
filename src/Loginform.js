import React, { useState } from 'react'

export default function Loginform(){

    const [isLogin, setIsLogin]=useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const handleSignup = async () => {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Signup successful!');
        setIsLogin(true); 
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      alert('Server error. Please try again later.');
    }
  };
  const handleLogin = async () => {
  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successful!');
      
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    alert('Server error. Please try again later.');
  }
};

    return(
        <div className='container'>
                <div className='form-container'>
                    <div className='form-toggle'>
                        <button className={isLogin? 'active': ""}onClick={()=>setIsLogin(true)}>Login</button>
                        <button className={!isLogin? 'active':""}onClick={()=>setIsLogin(false)}>SignUp</button>
                    </div>
                    {isLogin?<>
                    <div className='form'>
                        <h2>Login Form</h2>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href='#'>Forgot Password?</a>
                        <button onClick={handleLogin}>Login</button>
                        <p>Not a member? <a href='#' onClick={()=>setIsLogin(false)}>Signup now</a></p>
                    </div>
                    </>: <>
                    <div className='form'>
                            <h2>Signup Form</h2>
                             <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                             />
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleSignup}>SignUp</button>
                    </div>
                    </>}
            </div>
            
        </div>
    )
}