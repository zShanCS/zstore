import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import { Context } from "../context";
import Spinner from "./Spinner";
const Login = () => {

  const [uname, setUname] = useState('');
  const [pword, setPword] = useState('');
  const [uerror, setUError] = useState('');
  const [perror, setPError] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useContext(Context)[1]

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
      setLoading(true)
      const result = await API.userLogin(uname, pword);
      console.log(result);
      if (result.status === 'success') {
        setLoading(false)
        setUser(true);
        localStorage.setItem('auth', result.secret);
        const redirect = localStorage.getItem('redirectTo');
        console.log(redirect)
        if (redirect) { localStorage.removeItem('redirectTo'); nav(redirect) }
        else { nav('/Profile'); }
      }
      else {
        setLoading(false);
        setUError(result.message)
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
          <button type='submit'>{loading ? <Spinner /> : 'Login'}</button>
        </div>
      </form>
      <p>
        Or Sign up <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  )
}
export default Login