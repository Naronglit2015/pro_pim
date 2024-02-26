import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { FaSearch } from 'react-icons/fa';

const guestNav = [
  { to : '/', text: 'Login' },
  { to : '/register', text: 'Register' },
]

const userNav = [
  { to : '/', text: 'Home' },
  // { to : '/profile', text: '' },
]

export default function HeaderLogin() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }
  const hdlProfile = () => {
    navigate('/profile')
  }
  const hdlHome = () => {
    navigate('/')
  }


  return (
    <div className="navbar bg-red-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl" onClick={hdlHome}>daisyUI</a>
  </div>
  <div className="flex-none gap-2">
  <label className="input input-bordered flex items-center gap-2">
  <input type="text" className="grow" placeholder="Search" />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
</label>
    <div className="dropdown dropdown-end flex justify-center items-center py-4">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="\person-svgrepo-com.png" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-red-100 rounded-box w-52">
        <li>
          <a className="justify-between" onClick={hdlProfile}>
            Profile
           
          </a>
        </li>
        { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
            <li>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          ) }
      </ul>
    </div>
  
  </div>
  <div className="fixed bottom-0 right-0 p-4">
  <Link to="/cart">
      <button className='bg-red-500 btn btn-circle'>
        <img src='\cart-shopping-svgrepo-com (1).png'  alt="cart"width="30"height="30"/>
      </button>
      </Link>
    </div>
   
</div>

  );
}