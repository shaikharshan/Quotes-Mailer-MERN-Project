import React, { useEffect } from 'react'
import { useState } from 'react'
import { dataQuotes } from '../utils/dataQuotes'
import '../components/dashboard.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  
  const [quote,setQuote] = useState('')
  const [author,setAuthor] = useState('')
  const [email,setEmail] = useState('')
  const [email2,setEmail2] = useState('')
  const [falert,setFalert] = useState(false)
  const [falert2,setFalert2] = useState(false)
  const [alert,setAlert] = useState(false)
  const [alert2,setAlert2] = useState(false)

  const handleSubmit=()=>{
    // console.log(email)
    const token = localStorage.getItem('token')
    axios.post('http://localhost:5000/api/v1/quotes/mail',{email:email},
      {headers:{Authorization:`Bearer ${token}`}}
    )
    .then((resp)=>{
      // console.log(resp)
      setAlert(true)
      setTimeout(()=>{
        setAlert(false)
      },3000)
      setEmail('')

    })
    .catch((err)=>{
      console.log(err)
      setFalert(true)
      setTimeout(()=>{
        setFalert(false)
      },3000)
      setEmail('')
    })
  }

  
  const handleQuote=()=>{
    var random_id =Math.floor(Math.random()*100);
    if(random_id===0)
    {
      random_id = random_id+1;
    }
    
    const lucky_quote = dataQuotes.find((data)=>{
      const {id} = data
      return random_id===id
    })
    const {quote,author} = lucky_quote
    setQuote(quote)
    setAuthor(author)
  }
  const handleUnsubscribe=()=>{
    // console.log(email2)
    const token = localStorage.getItem('token')
    axios.delete('http://localhost:5000/api/v1/quotes/mail', {
      headers: { Authorization: `Bearer ${token}` },
      data: { email: email2 }
    })
    .then(()=>{
      setAlert2(true)
      setTimeout(()=>{
        setAlert2(false)
      },3000)
      
    })
    .catch((err)=>{
      console.log(err)
      setFalert2(true)
      setTimeout(()=>{
        setFalert2(false)
      },3000)
    })
    setEmail2('')
  }



  useEffect(()=>{
    handleQuote()
  },[])
  
  return (
    <>
      <article>
        <section className='main-heading-container'>
              <div><Link to={'/'}>Home Page</Link></div>
              <div className="main-heading-dashboard">Quote Generator</div>
              <div className="sub-heading-dashboard">Dashboard</div>
        </section>
        <section  className='col-12 quote-container'>
        
          <div className="quote">
                  {quote}
          </div>
          <div className="author">
                  - {author}
          </div>
          <button onClick={handleQuote} className="btn-dashboard">Another Quote</button>

        </section>
          <hr/>
        <section className="subscribe-container">
          
          <div className="img-dashboard">
          
            <img src="./Quote_generator_img.jpg" alt="" className='img-dashboard'/>

  
          </div>
          <div className='input-container-dashboard'>
            <h3 className='subscribe-header'>Want to get 'Great Quotes' daily?</h3>
            <p className='subscribe-subheader'>Enter your email and subscribe to get regular Quotes !</p>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" value={email} name='email' placeholder='  Email for subscription' className='email-input-dashboard'/>
          
          <button onClick={handleSubmit} className='btn-dashboard'>Subscribe for Daily Quotes</button>

          <div>
            {alert&&(
              <p className='subscribe-subheader'>Registration was successful. Check your registered email inbox for confirmation</p>
              
            )}
          </div>
          <div>
            {falert&&(
              <p className='subscribe-subheader'>Incorrect Email OR Email already subscribed. Please provide different mail </p>
            )}
          </div>
            <div className='unsubscribe'>
             
                <input className='email-input-dashboard' onChange={(e)=>setEmail2(e.target.value)} type="email" value={email2} name='email2' placeholder='Unsubscribe Registered Email?' />
                
                <button onClick={handleUnsubscribe}>Submit</button>
            <div>
            {alert2&&(
              <p className='subscribe-subheader'>Unsubscribed Successfully</p>
            )}
          </div>
          <div>
            {falert2&&(
              <p className='subscribe-subheader'>Incorrect Email OR Email not subscribed. Please provide different mail </p>
            )}
          </div>
            </div>
          </div>

        </section>
      </article>
    </>
  )
}

export default Dashboard