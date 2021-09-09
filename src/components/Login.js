import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import { Context } from "../context";
const Login = () => {

  const [uname, setUname] = useState('');
  const [pword, setPword] = useState('');
  const [uerror, setUError] = useState('');
  const [perror, setPError] = useState('');
  const [user, setUser] = useContext(Context)

  useEffect(() => {
    document.title = 'Login';
  }, [])


  const nav = useNavigate()

  function handleInput(e) {
    let name = e.currentTarget.name
    let val = e.currentTarget.value
    if (name === 'username') {
      setUname(val)
    }
    else if (name === 'password') {
      setPword(val)
    }
  }
  async function handleRegister(e) {

    if (uname.length < 3) {
      setUError('username too short')
      return
    }
    if (pword.length < 4) {
      setPError('password too short')
      return
    }

    try {
      const result = await API.userLogin(uname, pword);
      console.log(result);
      if (result.status === 'authenticated') {
        setUser(result);
        localStorage.setItem('auth', JSON.stringify(result));
        nav('/Profile', { replace: true });
      }
      else {
        throw new Error('Login Failed')
      }
    } catch (error) {
      console.log('big fat error happened', error);
    }

  }

  return (
    <div>
      <h1>
        Login
      </h1>
      <form onSubmit={(e) => { handleRegister(e); e.preventDefault(); }}>
        <div>
          <label>
            Username
            <input autoComplete='current-username' type="text" name="username" placeholder='username e.g. Jane123' value={uname} onChange={(e) => handleInput(e)} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input autoComplete='current-password' type="password" name="password" value={pword} onChange={(e) => handleInput(e)} />
          </label>
        </div>
        <div>
          {uerror}
        </div>
        <div>
          {perror}
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}
export default Login