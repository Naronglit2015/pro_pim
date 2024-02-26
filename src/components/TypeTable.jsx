import axios from 'axios'
import React from 'react'

export default function TypeTable(props) {
  const {el, openModal, setTrigger} = props

    // const statusColor = el.status==='PENDING'?'bg-pink-300' : el.status === 'DOING' ? 'bg-green-300' : 'bg-lime-300'
    const hdlDelete = async e =>{
      try {
        e.stopPropagation()
        const token = localStorage.getItem('token')
          const rs = await axios.delete(`http://localhost:8000/admin/${el.id}`, {
            headers : { Authorization : `Bearer ${token}`}
          })
          alert('Delete Successful')
          setTrigger(prv=>!prv)
      } catch (err) {
        console.log(err)
      }
    
    }
  return (
    <div className="card w-96 bg-base-100 shadow-xl cursor-pointer active:shadow-lg active:translate-x-2 active:translate-y-2" onClick={()=>openModal(el.id)}>
  <div className="card-body items-center text-center">
    <div className="flex justify-between">
    <h2 className="card-title">{el.name}</h2>
    </div>
    <div className="badge badge-accent" type="button"onClick={hdlDelete}>DELETE </div>
  </div>
  
</div>
  )
}
