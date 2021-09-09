import React, { useEffect } from "react";
import Spinner from "./Spinner";
const Home = () => {

  useEffect(() => {
    document.title = 'zStore Home';
  }, [])

  return (
    <div>
      Home
      <Spinner />
    </div>
  )
}
export default Home