import axios from 'axios'
import {useState} from "react";


export default function RegisterForm() {
  const [input, setInput] = useState({
    username : '', 
    password : '',
    confirmPassword : '',
    phone:'',
    email : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }
 
  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if(input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8000/auth/register', input)
      console.log(rs)
      if(rs.status === 200) {
        alert('Register Successful')
      }
    }catch(err) {
      console.log( err.message)
    }
    window.location.pathname = '/';
  }
  const handleClearButtonClick = () => {
    setInputValue('');
  };


  return (
<div className="card card-side bg-red-50 shadow-xl mt-10 m-48">
<div className="card-body">
<div className="text-3xl mb-5 font-bold">Register</div>
       <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
         <label className="form-control w-full max-w-xs pt-5">
         <label className="input input-bordered flex items-center gap-2 max-w-xs">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" className="grow" placeholder="Username"   name="username"
              value={input.username}
              onChange={ hdlChange }/>
</label>
        </label>


        <label className="form-control w-full max-w-xs pt-5">
          <label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
  <input type="email" className="grow" placeholder="Email" name="email"
            value={input.email}
            onChange={ hdlChange } />
</label>
        </label>


          <label className="form-control w-full max-w-xs pt-5">
            <label className="input input-bordered flex items-center gap-2 max-w-xs">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" className="grow" name="password" placeholder="Password"
              value={ input.password }
              onChange={ hdlChange }/>
</label>
          </label>


        <label className="form-control w-full max-w-xs pt-5">
        <label className="input input-bordered flex items-center gap-2 max-w-xs">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" className="grow" name="confirmPassword" placeholder="confirmPassword"
              value={ input.confirmPassword }
              onChange={ hdlChange }/>
</label>
         
        </label>
        <div className="flex gap-5  p-5 mb-10 ml-2">
          <button type="submit" className="btn w-64 rounded-full bg-pink-500 text-white">สมัครสมาชิก / Register</button>
        </div>
      </form>
      
</div>

<figure><img src="\autumn-reading-female-svgrepo-com.png"  alt="Movie" className='m-20' width="30"height="30"/></figure>

</div>
  );
}