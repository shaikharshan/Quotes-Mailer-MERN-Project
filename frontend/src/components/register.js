import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './register.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Register = () => {
    const Navigate = useNavigate();
    const [obj,setObj] = useState({
        name:'',
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
        axios.post('http://localhost:5000/api/v1/auth/register',{name:obj.name,
            email:obj.email,password:obj.password
        }) 
        .then(function (response) {
            console.log(response);
                setAlert(true)
                setObj({
                    name:'',
                    email:'',
                    password:''
                })
                setTimeout(()=>{
                    setAlert(false);
                    Navigate('/login')
                    
                    
                },3000)

    
        })
        .catch(function (error) {
            console.log(error);
            setObj({
                name:'',
                email:'',
                password:''
            })
            setError(error.response.data.message || 'An error occurred, please provide unique name, email and password')
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
            Register Page
        </h4>
    </section>
    <form onSubmit={handleSubmit} className="page-body">
        <div className="input-block">
            <div>Name</div>
            <input type="text" id='name' name='name' value={obj.name} className="input-name" onChange={handleInput} placeholder="name"/>
        </div>
        <div className="input-block">
            <div>Email</div>
            <input type="email" id='email' name='email' value={obj.email} className="input-email" onChange={handleInput} placeholder="abc@example.com"/>
        </div>
        <div className="input-block">
            <div>Password</div>
            <input type="password" id='password' name='password' value={obj.password} placeholder="Give a strong password " onChange={handleInput}  className="input-password"/>
        </div>
        {alert?
      (  <div id="form-alert" className="input-block">
                Registered Successfully, Opening Login page...
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
            <a href="/login">
                Already Registered? Go to Login Page...
            </a>
        </div>
    </form>
    </>
  )
}

export default Register