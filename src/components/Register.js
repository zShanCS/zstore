import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import { Context } from "../context";
const Register = () => {

  const [uname, setUname] = useState('');
  const [pword, setPword] = useState('');
  const [uerror, setUError] = useState('');
  const [perror, setPError] = useState('');
  const [user, setUser] = useContext(Context);
  const nav = useNavigate()


  useEffect(() => {
    document.title = 'Register';
  }, [])

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
  function handleRegister(e) {

    if (uname.length < 3) {
      setUError('username too short')
      return
    }
    if (pword.length < 8) {
      setPError('password too short')
      return
    }

    API.registerUser(uname, pword)
      .then(res => {
        console.log(res)
        if (res.status === 'authenticated') {
          console.log(res)
          setUser(res);
          localStorage.setItem('auth', JSON.stringify(res));
          nav('/Profile')
        }

      });

  }

  return (
    <div>
      <h1>Register</h1>
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
          <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  )
}
export default Register