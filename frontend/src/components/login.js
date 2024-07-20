import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './register.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
    const Navigate = useNavigate();
    const [obj,setObj] = useState({
        email:'',
        password:''
    })
    const [alert,setAlert] = useState(false)
    const [error,setError] = useState('')


    const handleInput = (e)=>{

        const {name,value} = e.target

        setObj({
            ...obj,
            [name]:value
        })
        // console.log(obj.password)
    }
    const handleSubmit= (e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/api/v1/auth/login',{
            email:obj.email,password:obj.password
        }) 
        .then(function (response) {
            // console.log(response.data);
            const {user,token} = response.data
            if(!token)
            {
                console.log('No token returned error')
                response.status(401).json({msg:'No token returned error'})
            }
            localStorage.setItem('token',token)
                setAlert(true)
                setObj({
                    email:'',
                    password:''
                })

                setTimeout(()=>{
                    setAlert(false);
                    Navigate('/dashboard')
                    
                    
                },3000)

    
        })
        .catch(function (error) {
            console.log(error);
            setObj({
                email:'',
                password:''
            })
            setError(error.response.data.message || 'An error occurred,please provide registered email and password')
            setTimeout(()=>{
                setError('')
            },3000)
        });
        
    }
  return (
    <>
        <section className="page-header">
        <div><Link to={'/'}>Home Page</Link></div>
        <h1 className="main-heading">
            Quote Generator
        </h1>
        <h4 className="sub-heading">
            Login Page
        </h4>
    </section>
    <form onSubmit={handleSubmit} className="page-body">
        {/* <div className="input-block">
            <div>Name</div>
            <input type="text" id='name' name='name' value={obj.name} className="input-name" onChange={handleInput} placeholder="name"/>
        </div> */}
        <div className="input-block">
            <div>Email</div>
            <input type="email" id='email' name='email' value={obj.email} className="input-email" onChange={handleInput} placeholder="abc@example.com"/>
        </div>
        <div className="input-block">
            <div>Password</div>
            <input type="password" id='password' name='password' value={obj.password} placeholder="Enter Registered Password " onChange={handleInput}  className="input-password"/>
        </div>
        {alert?
      (  <div id="form-alert" className="input-block">
                Login Successful, Opening your Dashboard...
                <div className='spinner-container'>

                <img className='spinner' src="./sp.svg" alt="spinner" />
                </div>
        </div>):(
            <div></div>
        )}
        {error && (
                    <div id="form-alert" className="input-block">
                        {error}
                    </div>
                )}
        <div className="input-block">
            <button type="submit" className="btn">Submit</button>
        </div>
        <div id="page-link" className="input-block">
            <a href="/register">
                Not Registered? Go to Register Page...
            </a>
        </div>
    </form>
    </>
  )
}

export default Login