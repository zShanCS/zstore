import React, { useState, createContext } from 'react'

export const Context = createContext()

//we gon wrap our App component with this provider 
//so everything in the App gets the user context
//so the children prop will actually be the whole App
const UserProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const storedSecret = localStorage.getItem('auth');
    if (storedSecret) return true;
  });

  return (
    //so now all children can access the context's provided
    //state and setState
    <Context.Provider value={[state, setState]}>
      {children}
    </Context.Provider>
  )
}
export default UserProvider;