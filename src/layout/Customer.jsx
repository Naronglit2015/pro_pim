import axios from "axios";
import { useEffect, useState } from "react";


export default function LoginForm() {
  const [user, setUser] = useState([])

    useEffect(()=>{
        const getUser = async(req, res, next) => {
            const rs = await axios.get("http://localhost:8000/admin/user")
            setUser(rs.data.user)
        }
        getUser()
    },[])

 
    function FormatDate(dateString) {
        const options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        };
        const date = new Date(dateString);
        return date.toLocaleDateString("th-TH", options);
      }
      return (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>username</th>
                <th>E-mail</th>
                <th>role</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>phone</th>
                <th>address</th>
                <th>de</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {user.map((user) => (
                <tr>
                  <th>{user.id}</th>
                  <th>{user.username}</th>
                  <th>{user.email}</th>
                  <th>{user.role}</th>
                  <th>{user.role}</th>
                  <th>{user.role}</th>
                  <th>{user.role}</th>
                  <th>{user.role}</th>
                  <th>{user.role}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }