import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {

  return (
    <>
      <section className='home-container'>

        <h1  className='main-heading'>Welcome to the Quote Generator</h1>
        <div className='input-block'>
            <p>New here? Register for free!</p>
            <Link to={'/register'}>Register for Daily Quotes</Link>
        </div>
        <div className='input-block'>
            <p>Already Registered? Login for your quote..</p>
            <Link to={'/login'}>Login</Link>
        </div>
      </section>
    </>
  )
}

export default home