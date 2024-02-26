import axios from 'axios'
import {useState} from "react";
import useAuth from '../hooks/useAuth';


export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8000/auth/login', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8000/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)
      
    }catch(err) {
      console.log( err.message)
    }
  }

  return (
    <div className='card  bg-Rose-700'>
    <div className="card card-side bg-red-50 shadow-xl mt-10 m-48">
  <figure><img src="\book-and-person-summer-svgrepo-com.png" alt="login" className='ml-20'/></figure>
  <div className="card-body">
  <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
  <div className="text-3xl mb-5 ml-20 font-bold">Login</div>
           <label className="form-control w-full max-w-x ml-20 pt-5">
             <label className="input input-bordered flex items-center gap-2 max-w-xs">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" className="grow" placeholder="Username"   name="username"
              value={input.username}
              onChange={ hdlChange }/>
</label>
          </label>
          <label className="form-control w-full max-w-xs ml-20 pt-10">
            <label className="input input-bordered flex items-center gap-2 max-w-xs">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" className="grow" name="password" placeholder="Password"
              value={ input.password }
              onChange={ hdlChange }/>
</label>
          </label>
          <div className="flex gap-5  p-5 mb-10 ml-20">
            <button type="submit" className="btn w-64 rounded-full bg-pink-500 text-white">เข้าสู่ระบบ / Login</button>
          </div>
        </form>
        <div class="text-right">
         <a href="/register" class="text-red-400 hover:underline">Don't have an account? Create an account.</a>
       </div>
  </div>
</div>
</div>
  );
}