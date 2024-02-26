import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {useEffect, useState} from "react";
import axios from 'axios';


const guestNav = [
    { to : '/' },
  ]
  
  const userNav = [
    { to : '/', text: 'Home' },
  
  ]



export default function Header() {
    const {user, logout} = useAuth()
    const finalNav = user?.id ? userNav : guestNav

    const [input, setInput] = useState({
      email : '',
      username:'',
      firstname:'',
      lastname:'',
      phone:'',
      address:''
    
    })
    useEffect ( ()=>{
      setInput({
          email: user?.email,
          username:user?.username,
      firstname:user?.firstname,
      lastname:user?.lastname,
      phone:user?.phone,
      address:user?.address
          
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
  
    const hdlLogout = () => {
      logout()
      navigate('/')
    }

    return (
        <div className="text-center pt-10">
          
          {/* <a className="text-xl text-center">แก้ไขโปรไฟล์</a> */}
       
        <a className="text-xl pt-24">บัญชีของ {user?.id ? user.username : 'Guest'}</a>
        
        <hr className="border-t border-gray-500 my-3  justify-center flex m-36 " />
        <form className='ml-48'>
        <div className="justify-start p-12 flex flex-wrap">
        <label className="form-control w-full max-w flex ">
          <div className="label">
            <span className="label">
              E-MAIL
            </span>
          </div>
          <input
            className="input input-bordered input-secondary w-full max-w-xs  rounded-full"
            type="email"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>

        <label className="form-control w-full max-w-xs  ">
          <div className="label">
            <span className="label">
            username
            </span>
          </div>
          <input
            className="input input-bordered input-secondary w-full max-w-xs  rounded-full"
            type="text"
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>

        <label className="form-control w-full max-w ">
          <div className="label">
            <span className="label">
            firstname
            </span>
          </div>
          <input
            className="input input-bordered input-secondary w-full max-w-xs  rounded-full"
            type="text"
            name="firstname"
            value={input.firstname}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w rounded-full">
          <div className="label">
            <span className="label">
            lastname
            </span>
          </div>
          <input
            className="input input-bordered input-secondary w-full max-w-xs flex rounded-full"
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w rounded-full">
          <div className="label">
            <span className="label">
            phone
            </span>
          </div>
          <input
            className="input input-bordered input-secondary w-full max-w-xs flex rounded-full"
            type="text"
            name="phone"
            value={input.phone}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w rounded-full">
          <div className="label">
            <span className="label">
            address
            </span>
          </div>
          <input
            className="input input-bordered input-secondary w-full max-w-lg flex rounded-full"
            type="text"
            name="address"
            value={input.address}
            onChange={hdlChange}
          />
        </label>

      <button type="submit" className="btn btn-primary mt-12 justify-center"onClick={hdlSubmit} >บันทึกการแก้ไข</button>

          {/* <Link to={`/update/${user.id}`}>แก้ไข</Link> */}
        </div>
        </form>
      </div>
    );
    }

