import HeaderLogin from "./HeaderLogin";
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import useAuth from "../hooks/useAuth";

export default function UserHome() {
  const {user, logout} = useAuth()
  const [todos, setTodos] = useState([])


  useEffect( ()=>{
    const run = async()=>{
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8000/auth/getCartByUser', {
        headers : { Authorization : `Bearer ${token}`}
      })
      setTodos(rs.data.todos)
    }
    run()
  }, [] )
  const navigate = useNavigate()
  
    const hdlUpdate = () => {
      navigate('/update')
    }

  return (
    <>
      <div className="flex-1 pt-5 text-center">
    <a className="text-xl ">รถเข็น</a>
    {/* <div>
          <ul>
          {todos.map((todos) =>(
              <li key={todos.id}>
                <div>
                  <p> - ราคา: {todos.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div> */}
    <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
        {todos.name}
    <hr className="border-t border-gray-500 my-3 w-4/5 justify-center flex m-36" />
    <a className="text-xl">ที่อยู่สำหรับการจัดส่ง</a>
    <hr className="border-t  my-3 w-4/5 justify-center flex m-36" />
    <form className="flex flex-col gap-2" >
        <label className="form-control w-full max-w-xs flex text-left ml-52">
          <p>{user.firstname}   {user.lastname}</p>
          <p>{user.phone}</p>
          <p>{user.address} </p>
        </label>
        <label className="form-control w-full max-w-xs flex  text-right">
        <a  className="link link-hover mb-12 text-red-500" onClick={hdlUpdate}>แก้ไขที่อยู่จัดส่ง</a>
        </label>
        <hr className="border-t  my-3 w-4/5 justify-center flex m-36" />
      </form>

    <button className="btn btn-wide bg-red-500 pt-2">ชำระเงิน</button>
  </div>
    </>
  )
}
