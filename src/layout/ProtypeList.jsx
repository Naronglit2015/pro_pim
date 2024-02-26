// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const hdlChange = e => {
//   setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
// }

// const hdldelete = async e => {
//   try{
//     e.preventDefault()
//     const token = localStorage.getItem('token')
//     const rs = await axios.delete('http://localhost:8000/product/deleteProductType'())
   
//   }catch(err) {
//     alert(err.message)
//   }
// }

// export default function ProductTypeList() {
//   const [product_type, setProductTypes] = useState([]);


//   useEffect(() => {
//   const getProList  = async(req, res, next) => {
//       const rs = await axios.get('http://localhost:8000/product/getprolist')
//       setProductTypes(rs.data.product_type)
//   }
//   getProList()
//     }, [] )

    
//   return (
//  <div className="overflow-x-auto">
//           <table className="table table-zebra">
//             {/* head */}
//             <thead>
//               <tr>
//                 <th>No.</th>
//                 <th>name</th>
//                 <th>แก้ไข</th>
//                 <th>ลบ</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* row 1 */}
//               {product_type.map((product_type) => (
//                 <tr>
//                   <th>{product_type.id}</th>
//                   <th>{product_type.name}</th>
//                   <th> <input
//           type="text"
//           name="product_type"
//           value={product_type.name}
//           onChange={hdlChange}
//         /></th>
//                   <th>  
//       <button className="btn bg-orange-500" onClick={hdlChange} >Click me</button>
//     </th>
//                   <th><button className="btn bg-red-500" onClick={hdldelete}>Click me</button></th>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//   );
//               }

import axios from 'axios'
import {useEffect, useState} from 'react'
import ModalEdit from '../components/ModalEdit'
import TypeTable from '../components/TypeTable'

export default function UserHome() {
  const [product_type, setProduct_type] = useState([])
  const [editIdx, setEditIdx] = useState(-1)
  const [trigger, setTrigger] = useState(false)

  useEffect( ()=>{
    const run = async()=>{
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8000/admin/getProList', {
        headers : { Authorization : `Bearer ${token}`}
      })
      setProduct_type(rs.data.product_type)
    }
    run()
  }, [trigger] )


  const openModal = (el, id) =>{
    // console.log(id)
    // console.logr(todos)
    let idx = product_type.findIndex(el => el.id === id)
    setEditIdx(idx)
    // console.log(idx)
    document.getElementById('my_modal_3').showModal()
    
  }

  const closeModal = () => {
    document.getElementById('my_modal_3').close()
  }

  return (
    <>
   
<ModalEdit el={product_type[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/>
    {product_type.map((el) =>(
      <TypeTable key={el.id} el ={el} openModal={openModal} setTrigger={setTrigger}/>
    ))
  }
    
   
    </>
  )
}