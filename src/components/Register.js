import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import { Context } from "../context";
const Register = () => {

  const [uname, setUname] = useState('');
  const [pword, setPword] = useState('');
  const [uerror, setUError] = useState('');
  const [perror, setPError] = useState('');
  const setUser = useContext(Context)[1]
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
    try {
      if (uname.match('~')) {
        setUError('cant have ~');
        return
      }
    } catch (error) {
      console.log(error)
    }

    if (pword.length < 8) {
      setPError('password too short')
      return
    }
    setPError('')
    setUError('')
    API.registerUser(uname, pword)
      .then(res => {
        console.log(res)
        if (res.status === 'success') {
          console.log(res)
          setUser(res);
          localStorage.setItem('auth', res.secret);
          const redirect = localStorage.getItem('redirectTo');
          console.log(redirect)
          if (redirect) { localStorage.removeItem('redirectTo'); nav(redirect) }
          else { nav('/Profile'); }
        }
        else {
          setUError(res.message)
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