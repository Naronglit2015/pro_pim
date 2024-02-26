import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {useEffect, useState} from "react";
import axios from 'axios';


const guestNav = [
    { to : '/' },
  ]
  
  const userNav = [
    { to : '/', text: 'Home' },
    { to : '/', text: 'Home' },
  
  ]



export default function Header() {
    const {user, logout} = useAuth()
    const finalNav = user?.id ? userNav : guestNav

    const [input, setInput] = useState({
      email : '',
    
    })
    useEffect ( ()=>{
      setInput({
          email: user?.email,
          
      })
  },[user?.id])

  const hdlChange = e => {
    setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
  }

const hdlSubmit = async e => {
    try{
      e.preventDefault()
      const output = { ...input }
      const token = localStorage.getItem('token')
      const rs = await axios.put(`http://localhost:8000/auth/${user.id}`, output,{
        headers : { Authorization : `Bearer ${token}`}
      })
      alert('Update OK')
      location.reload();
    }catch(err) {
      alert(err.message)
    }
  }
  
    const navigate = useNavigate()
  
    const hdlUpdate = () => {
      navigate('/update')
    }

    return (
        <div className="text-center pt-10">
          {/* <form >
          <a className="text-xl text-center">แก้ไขโปรไฟล์</a>
        <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
        <a className="text-xl pt-24">บัญชีของ {user?.id ? user.username : 'Guest'}</a>
        <div className="justify-start p-12">
        <label className="form-control w-full max-w-[260px]">
          <div className="label">
            <span className="label">
              E-MAIL
            </span>
          </div>
          <input
            className="input"
            type="email"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label> */}

      {/* <label className="form-control w-full ">
        <div className="label">
          <span className="label-text"></span>
        </div>
        <a className="text-xl justify-start">E-mail</a>
        <input
          type="password"
          placeholder="Type here"
          className="input input-bordered w-50 "
          name="password"
          value={user.password}
          // onChange={hdlChange}
        />
      </label> */}
      {/* <img src="\user-svgrepo-com.png" className='h-14 w-14 ml-56 justify-center flex'/> */}
      <a  className="link link-hover mb-12" onClick={hdlUpdate}>แก้ไขบัญชี</a>
      <hr className="border-t border-gray-500 my-3  justify-center flex m-36 " />
      <img src='\history-svgrepo-com.png' className='h-14 w-14 ml-56 justify-center flex'/>
        {/* <Link to={`/update/${user.id}`}>แก้ไข</Link> */}
        </div>
      //   </form>
      // </div>
    );
    }

